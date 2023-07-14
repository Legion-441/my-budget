import * as React from 'react';
//* MUI & Icons
import { Box, Button, TextField } from "@mui/material"
//* Styled Components
import PaperCard from "../../styled/paper-card/paper-card.styled"

const SignUpView: React.FC  = () => {
  const [email, setEmail] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')
  const [confirmPassword, setConfirmPassword] = React.useState<string>('')

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }
  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value)
  }
  
  const logInForm = (
    <PaperCard>
      <form onSubmit={(event) => event.preventDefault}>
        <TextField
          type="email"
          label="Email"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <br />
        <TextField
          type="password"
          label="Password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <br />
        <TextField
          type="password"
          label="Confirm password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          required
        />
        <br />
        <Button variant="contained" type="submit">
          Zarejestruj
        </Button>
      </form>
    </PaperCard>
  );

  return (
    <Box
      display={'flex'}
      minHeight={'100vh'}
      bgcolor={'background.default'}
    >
      {logInForm}
    </Box>
  )
}

export default SignUpView