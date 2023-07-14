import * as React from 'react';
//* MUI & Icons
import { Box, Button, TextField } from "@mui/material"
//* Styled Components
import PaperCard from "../../styled/paper-card/paper-card.styled"

const LogInView: React.FC  = () => {
  const [email, setEmail] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
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
        <Button variant="contained" type="submit">
          Zaloguj
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

export default LogInView