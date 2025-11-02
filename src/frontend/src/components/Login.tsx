import { Button, TextField } from '@mui/material';
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
    <form onSubmit={handleSubmit}>
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit">Login</Button>
      {error && <p>{error}</p>}
    </form>
  );
}

export default Login;
