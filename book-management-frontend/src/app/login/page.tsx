// // // 'use client';

// // // import { useState } from 'react';
// // // import { useMutation, gql } from '@apollo/client';
// // // import { TextField, Button, Typography, Container, Box } from '@mui/material';
// // // import { useRouter } from 'next/navigation';

// // // const LOGIN_MUTATION = gql`
// // //   mutation Login($username: String!, $password: String!) {
// // //     login(username: $username, password: $password)
// // //   }
// // // `;

// // // export default function Login() {
// // //   const [username, setUsername] = useState('');
// // //   const [password, setPassword] = useState('');
// // //   console.log('Login: Before useMutation');
// // //   const [login, { error }] = useMutation(LOGIN_MUTATION);
// // //   console.log('Login: After useMutation, login:', login);
// // //   const router = useRouter();

// // //   const handleSubmit = async (e: React.FormEvent) => {
// // //     e.preventDefault();
// // //     try {
// // //       const { data } = await login({ variables: { username, password } });
// // //       localStorage.setItem('token', data.login);
// // //       router.push('/books');
// // //     } catch (err) {
// // //       console.error('Login error:', err);
// // //     }
// // //   };

// // //   return (
// // //     <Container maxWidth="sm">
// // //       <Box sx={{ mt: 8, textAlign: 'center' }}>
// // //         <Typography variant="h4" gutterBottom>Login</Typography>
// // //         <form onSubmit={handleSubmit}>
// // //           <TextField
// // //             label="Username"
// // //             fullWidth
// // //             margin="normal"
// // //             value={username}
// // //             onChange={(e) => setUsername(e.target.value)}
// // //           />
// // //           <TextField
// // //             label="Password"
// // //             type="password"
// // //             fullWidth
// // //             margin="normal"
// // //             value={password}
// // //             onChange={(e) => setPassword(e.target.value)}
// // //           />
// // //           <Button type="submit" variant="contained" sx={{ mt: 2 }}>
// // //             Login
// // //           </Button>
// // //           {error && <Typography color="error">{error.message}</Typography>}
// // //         </form>
// // //         <Button onClick={() => router.push('/register')} sx={{ mt: 2 }}>
// // //           Register
// // //         </Button>
// // //       </Box>
// // //     </Container>
// // //   );
// // // }

// // 'use client';

// // import { useState } from 'react';
// // import { useMutation, gql } from '@apollo/client';
// // import { TextField, Button, Typography, Container, Box } from '@mui/material';
// // import { useRouter } from 'next/navigation';
// // import toast from 'react-hot-toast'; // Add this import

// // const LOGIN_MUTATION = gql`
// //   mutation Login($username: String!, $password: String!) {
// //     login(username: $username, password: $password)
// //   }
// // `;

// // export default function Login() {
// //   const [username, setUsername] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [login, { error }] = useMutation(LOGIN_MUTATION);
// //   const router = useRouter();

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     try {
// //       const { data } = await login({ variables: { username, password } });
// //       localStorage.setItem('token', data.login);
// //       toast.success('Logged in successfully!');
// //       router.push('/books');
// //     } catch (err) {
// //       toast.error('Login failed. Please check your credentials.');
// //     }
// //   };

// //   return (
// //     <Container maxWidth="sm">
// //       <Box sx={{ mt: 8, textAlign: 'center' }}>
// //         <Typography variant="h4" gutterBottom>Login</Typography>
// //         <form onSubmit={handleSubmit}>
// //           <TextField
// //             label="Username"
// //             fullWidth
// //             margin="normal"
// //             value={username}
// //             onChange={(e) => setUsername(e.target.value)}
// //           />
// //           <TextField
// //             label="Password"
// //             type="password"
// //             fullWidth
// //             margin="normal"
// //             value={password}
// //             onChange={(e) => setPassword(e.target.value)}
// //           />
// //           <Button type="submit" variant="contained" sx={{ mt: 2 }}>
// //             Login
// //           </Button>
// //           {error && <Typography color="error">{error.message}</Typography>}
// //         </form>
// //         <Button onClick={() => router.push('/register')} sx={{ mt: 2 }}>
// //           Register
// //         </Button>
// //       </Box>
// //     </Container>
// //   );
// // }

// 'use client';

// import { useState } from 'react';
// import { useMutation, gql } from '@apollo/client';
// import { TextField, Button, Typography } from '@mui/material';
// import { useRouter } from 'next/navigation';
// import toast from 'react-hot-toast';

// const LOGIN_MUTATION = gql`
//   mutation Login($username: String!, $password: String!) {
//     login(username: $username, password: $password)
//   }
// `;

// export default function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [login, { error }] = useMutation(LOGIN_MUTATION);
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const { data } = await login({ variables: { username, password } });
//       localStorage.setItem('token', data.login);
//       toast.success('Logged in successfully!');
//       router.push('/books');
//     } catch (err) {
//       toast.error('Login failed. Please check your credentials.');
//     }
//   };

//   return (
//     <div className="container">
//       <div className="auth-box">
//         <Typography className="auth-title">Login</Typography>
//         <form className="auth-form" onSubmit={handleSubmit}>
//           <TextField
//             label="Username"
//             fullWidth
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//           <TextField
//             label="Password"
//             type="password"
//             fullWidth
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <Button type="submit">Login</Button>
//           {error && <Typography className="error-text">{error.message}</Typography>}
//         </form>
//         <Button className="outlined" onClick={() => router.push('/register')}>
//           Register
//         </Button>
//       </div>
//     </div>
//   );
// }

'use client';

import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`;

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
    <div className="container">
      <div className="auth-box">
        <h1>Login</h1>
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
          <button type="submit" className="btn">Login</button>
          {error && <p className="error-text">{error.message}</p>}
        </form>
        {/* <button className="login-register-btn-outlined" onClick={() => router.push('/register')}>
          Register
        </button> */}
      </div>
    </div>
  );
}