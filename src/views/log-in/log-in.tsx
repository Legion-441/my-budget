import * as React from 'react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
//* Firebase
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { FirebaseError } from 'firebase/app';
//* MUI & Icons
import { Button, Checkbox, Divider, FormControlLabel, Stack, TextField, Typography } from "@mui/material"
//* Utils
import { AuthErrorObject, handleAuthError } from '../../utils/errorHandling';
//* Styled Components
import PaperCard from "../../styled/paper-card/paper-card.styled"
import { configureFirebaseUI } from '../../utils/firebaseUIAuthConfig';


const LogInView: React.FC  = () => {
  const [email, setEmail] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')
  const [loginInputErrors, setLoginInputErrors] = React.useState<AuthErrorObject>({})
  const [sending, setSending] = React.useState<boolean>(false);
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from || "/";
  
  useEffect(() => {
    configureFirebaseUI(from)
  },[from])

  const handleLoginEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)    
  }
  const handleLoginPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const handleLoginFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoginInputErrors({})
    setSending(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSending(false)
      navigate(from)
    } catch (error) {
      if (error instanceof FirebaseError || error instanceof Error) {        
        handleAuthError(error, setLoginInputErrors)
      } else {
        console.error(error);
        setLoginInputErrors({
          generalError: "Nieznany błąd",
        })
      };
      setSending(false)
    };
  }

  const {emailError, passwordError, generalError} = loginInputErrors
  
  return (
    <PaperCard>
      <form onSubmit={handleLoginFormSubmit}>
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
        >
          <h1>Logowanie</h1>
          {generalError}
          <TextField
            error={Boolean(emailError)}
            type="email"
            label="E-mail"
            value={email}
            onChange={handleLoginEmailChange}
            autoComplete='email'
            required
            helperText={emailError}
          />
          {/* //TODO: add hide button */}
          <TextField
            error={Boolean(passwordError)}
            type="password"
            label="Hasło"
            value={password}
            onChange={handleLoginPasswordChange}
            autoComplete='current-password'
            required
            helperText={passwordError}
          />
          <Stack 
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={1}
          >
            {/* //TODO: add "remember me" feature" */}
            <FormControlLabel control={<Checkbox defaultChecked />} label="Zapamiętaj" />
            <Button
              disabled={sending}
              variant="text"
              type="button"
              onClick={() => {}}
            >
              {/* //TODO: add form dialog for email */}
              Odzyskaj hasło.
            </Button>
          </Stack>
          <Stack spacing={1} paddingTop={2}>
            <Button
              disabled={sending}
              variant="contained"
              type="submit"
              sx={{minWidth: 'min-content'}}
            >
              {sending ? "Wysyłam..." : "Zaloguj"}
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
                Nie masz jeszcze konta?
              </Typography>
              <Button
                disabled={sending}
                variant="text"
                type="button"
                onClick={() => {navigate('/signup')}}
                size='small'
              >
                Dołącz teraz.
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </form>
    </PaperCard>
  );
}

export default LogInView