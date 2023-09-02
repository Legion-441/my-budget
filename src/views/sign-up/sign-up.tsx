import * as React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//* Firebase
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase';
import { FirebaseError } from 'firebase/app';
//* MUI & Icons
import { Button, Divider, Stack, TextField, Typography } from "@mui/material"
//* Utils
import { AuthErrorObject, handleAuthError } from '../../utils/errorHandling';
//* Styled Components
import PaperCard from "../../styled/paper-card/paper-card.styled"
import { configureFirebaseUI } from '../../utils/firebaseUIAuthConfig';


const SignUpView: React.FC  = () => {
  const [email, setEmail] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')
  const [confirmPassword, setConfirmPassword] = React.useState<string>('')
  const [signupInputErrors, setSignupInputErrors] = React.useState<AuthErrorObject>({})
  const [sending, setSending] = React.useState<boolean>(false);
  const navigate = useNavigate()
  
  
  useEffect(() => {
    configureFirebaseUI()
  },[])

  const handleSignUpEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  };

  const handleSignUpPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)

    if (event.target.value.length<6) {
      setSignupInputErrors({
        passwordError: 'Hasło musi mieć conajmniej 6 znaków.',
      })
    } else {
      setSignupInputErrors({})
    }
  };

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value)
  };

  const handleSignUpFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSignupInputErrors({})
    setSending(true);

    try {
      if (password !== confirmPassword) {
        throw new Error('passwords-is-not-identical')
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const emailPart = email.split('@')[0];
      const username = emailPart.charAt(0).toUpperCase() + emailPart.slice(1);

      await updateProfile(userCredential.user, {
        displayName: username,
      });
      setSending(false)
      navigate('/')
    } catch (error) {
      if (error instanceof FirebaseError || error instanceof Error) {
        handleAuthError(error, setSignupInputErrors)
      } else {
        console.log(error);
        setSignupInputErrors({
          generalError: "Nieznany błąd"
        })
      };
      setSending(false)
    };
  }

  const {emailError, passwordError, confirmPasswordError, generalError} = signupInputErrors

  return (
    <PaperCard>
      <form onSubmit={handleSignUpFormSubmit}>
        <Stack 
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
        >
          <h1>Stwórz konto</h1>
          {generalError}
          <TextField
            error={Boolean(emailError)}
            type="email"
            label="E-mail"
            value={email}
            onChange={handleSignUpEmailChange}
            autoComplete="email"
            required
            helperText={emailError}
          />
          {/* //TODO: add hide button */}
          <TextField
            error={Boolean(passwordError)}
            type="password"
            label="Hasło"
            value={password}
            onChange={handleSignUpPasswordChange}
            autoComplete='new-password'
            required
            helperText={!Boolean(confirmPasswordError) && passwordError}
          />
          <TextField
            error={Boolean(confirmPasswordError)}
            type="password"
            label="Potwierdź hasło"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            autoComplete='new-password'
            required
            helperText={confirmPasswordError}
          />
          <Stack spacing={1} paddingTop={2}>
            <Button
              disabled={sending}
              variant="contained"
              type="submit"
              sx={{minWidth: 'min-content'}}
            >
              {sending ? "Wysyłam..." : "Zarejestruj się"}
            </Button>
            <div id='firebaseui-auth-container'></div>
            <Divider/>
            <Stack 
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={1}
            >
              <Typography variant="body2">
                Masz już konto?
              </Typography>
              <Button
                disabled={sending}
                variant="text"
                type="button"
                onClick={() => {navigate('/login')}}
                size='small'
              >
                Zaloguj się teraz.
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </form>
    </PaperCard>
  );
}

export default SignUpView