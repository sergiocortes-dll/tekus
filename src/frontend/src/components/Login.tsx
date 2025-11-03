import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import axios from 'axios';
import * as React from 'react';
import { useNavigate } from 'react-router';

const Login = () => {
  const [username, setUsername] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [error, setError] = React.useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5290/api/account/login', { username, password });
      localStorage.setItem('token', response.data.token);
      navigate("/app/providers");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError('Credenciales inválidas');
    }
  }

  return (
    <Box
      sx={{
        width: '100dvw',
        height: '100dvh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Paper 
        sx={{
          display: 'flex',
          flexFlow: 'column',
          gap: 2,
          p: 4,
          maxWidth: 450,
          width: '100%',
        }}
        component="form" 
        onSubmit={handleSubmit}
      >
        <Typography variant='h3' component='div' align='center'>Tekus</Typography>
        <Typography variant='h6' component='h1'>Iniciar sesión</Typography>
        <TextField
          label="Username"
          size='small'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          />
        <TextField
          label="Password"
          type="password"
          size='small'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button disableElevation variant='contained' type="submit">Login</Button>
        {error && <Typography color="error">{error}</Typography>}
      </Paper>
    </Box>
  );
}

export default Login;
