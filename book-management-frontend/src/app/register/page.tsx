// 'use client';

// import { useState } from 'react';
// import { useMutation, gql } from '@apollo/client';
// import { TextField, Button, Typography, Container, Box } from '@mui/material';
// import { useRouter } from 'next/navigation';
// import toast from 'react-hot-toast'; // Add this import

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
//     <Container maxWidth="sm">
//       <Box sx={{ mt: 8, textAlign: 'center' }}>
//         <Typography variant="h4" gutterBottom>Register</Typography>
//         <form onSubmit={handleSubmit}>
//           <TextField
//             label="Username"
//             fullWidth
//             margin="normal"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//           <TextField
//             label="Password"
//             type="password"
//             fullWidth
//             margin="normal"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <Button type="submit" variant="contained" sx={{ mt: 2 }}>
//             Register
//           </Button>
//           {error && <Typography color="error">{error.message}</Typography>}
//         </form>
//         <Button onClick={() => router.push('/login')} sx={{ mt: 2 }}>
//           Back to Login
//         </Button>
//       </Box>
//     </Container>
//   );
// }

'use client';

import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const REGISTER_MUTATION = gql`
  mutation Register($username: String!, $password: String!) {
    register(username: $username, password: $password)
  }
`;

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
    <div className="container">
      <div className="auth-box">
        <h1>Register</h1>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="btn">Register</button>
          {error && <p className="error-text">{error.message}</p>}
        </form>
        
        {/* <button className="login-register-btn.outlined" onClick={() => router.push('/login')}>
          Back to Login
        </button> */}
      </div>
    </div>
  );
}