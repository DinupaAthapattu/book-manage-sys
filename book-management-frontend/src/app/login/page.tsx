
'use client';

import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  styled,
} from '@mui/material';

const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`;

const StyledContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
}));

const AuthBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[4],
  width: '100%',
  maxWidth: 400,
}));

const Form = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, { error }] = useMutation(LOGIN_MUTATION);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await login({ variables: { username, password } });
      localStorage.setItem('token', data.login);
      toast.success('Logged in successfully!');
      router.push('/books');
    } catch (err) {
      toast.error('Login failed. Please check your credentials.');
    }
  };

  return (
    <StyledContainer>
      <AuthBox>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Login
        </Typography>

        <Form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
          >
            Login
          </Button>
        </Form>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error.message}
          </Alert>
        )}

        {/* Uncomment if you want to keep the Register button */}
        {/* <Button
          variant="outlined"
          color="primary"
          size="large"
          fullWidth
          onClick={() => router.push('/register')}
        >
          Register
        </Button> */}
      </AuthBox>
    </StyledContainer>
  );
}