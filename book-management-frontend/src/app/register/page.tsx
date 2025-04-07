

// 'use client';

// import { useState } from 'react';
// import { useMutation, gql } from '@apollo/client';
// import { useRouter } from 'next/navigation';
// import toast from 'react-hot-toast';

// const REGISTER_MUTATION = gql`
//   mutation Register($username: String!, $password: String!) {
//     register(username: $username, password: $password)
//   }
// `;

// export default function Register() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [register, { error }] = useMutation(REGISTER_MUTATION);
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await register({ variables: { username, password } });
//       toast.success('Registered successfully! Please log in.');
//       router.push('/login');
//     } catch (err) {
//       toast.error('Registration failed. Username might already exist.');
//     }
//   };

//   return (
//     <div className="container">
//       <div className="auth-box">
//         <h1>Register</h1>
//         <form className="auth-form" onSubmit={handleSubmit}>
//           <input
//             type="text"
//             placeholder="Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <button type="submit" className="btn">Register</button>
//           {error && <p className="error-text">{error.message}</p>}
//         </form>
        
//         {/* <button className="login-register-btn.outlined" onClick={() => router.push('/login')}>
//           Back to Login
//         </button> */}
//       </div>
//     </div>
//   );
// }

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

const REGISTER_MUTATION = gql`
  mutation Register($username: String!, $password: String!) {
    register(username: $username, password: $password)
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

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [register, { error }] = useMutation(REGISTER_MUTATION);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register({ variables: { username, password } });
      toast.success('Registered successfully! Please log in.');
      router.push('/login');
    } catch (err) {
      toast.error('Registration failed. Username might already exist.');
    }
  };

  return (
    <StyledContainer>
      <AuthBox>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Register
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
            Register
          </Button>
        </Form>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error.message}
          </Alert>
        )}

        {/* Uncomment if you want to keep the Back to Login button */}
        {/* <Button
          variant="outlined"
          color="primary"
          size="large"
          fullWidth
          onClick={() => router.push('/login')}
        >
          Back to Login
        </Button> */}
      </AuthBox>
    </StyledContainer>
  );
}