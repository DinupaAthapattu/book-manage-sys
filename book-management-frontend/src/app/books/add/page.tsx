

// 'use client';

// import { useState } from 'react';
// import { useMutation, gql } from '@apollo/client';
// import { useRouter } from 'next/navigation';
// import toast from 'react-hot-toast';

// const CREATE_BOOK = gql`
//   mutation CreateBook($title: String!, $author: String!, $publishedYear: Int!, $genre: String!) {
//     createBook(title: $title, author: $author, publishedYear: $publishedYear, genre: $genre) {
//       id
//     }
//   }
// `;

// export default function AddBook() {
//   const [title, setTitle] = useState('');
//   const [author, setAuthor] = useState('');
//   const [publishedYear, setPublishedYear] = useState('');
//   const [genre, setGenre] = useState('');
//   const [createBook, { error }] = useMutation(CREATE_BOOK);
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!title || !author || !publishedYear || !genre) {
//       toast.error('All fields are required.');
//       return;
//     }
//     const publishedYearNum = parseInt(publishedYear);
//     if (isNaN(publishedYearNum)) {
//       toast.error('Published Year must be a valid number.');
//       return;
//     }
//     try {
//       await createBook({
//         variables: { title, author, publishedYear: publishedYearNum, genre },
//       });
//       toast.success('Book added successfully!');
//       router.push('/books');
//     } catch (err) {
//       toast.error('Failed to add book.');
//     }
//   };

//   return (
//     <div className="container">
//       <div className="form-box">
//         <h1>Add Book</h1>
//         <form className="form" onSubmit={handleSubmit}>
//           <input
//             type="text"
//             placeholder="Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//           <input
//             type="text"
//             placeholder="Author"
//             value={author}
//             onChange={(e) => setAuthor(e.target.value)}
//           />
//           <input
//             type="number"
//             placeholder="Published Year"
//             value={publishedYear}
//             onChange={(e) => setPublishedYear(e.target.value)}
//           />
//           <input
//             type="text"
//             placeholder="Genre"
//             value={genre}
//             onChange={(e) => setGenre(e.target.value)}
//           />
//           <button type="submit" className="btn">Add Book</button>
//           {error && <p className="error-text">{error.message}</p>}
//         </form>
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

const CREATE_BOOK = gql`
  mutation CreateBook($title: String!, $author: String!, $publishedYear: Int!, $genre: String!) {
    createBook(title: $title, author: $author, publishedYear: $publishedYear, genre: $genre) {
      id
    }
  }
`;

const StyledContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
}));

const FormBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[4],
  width: '100%',
  maxWidth: 500,
}));

const Form = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  marginTop: theme.spacing(2),
}));

export default function AddBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishedYear, setPublishedYear] = useState('');
  const [genre, setGenre] = useState('');
  const router = useRouter();

  const [createBook, { error, loading }] = useMutation(CREATE_BOOK, {
    onCompleted: () => {
      toast.success('Book added successfully!');
      router.push('/books');
    },
    onError: () => toast.error('Failed to add book.'),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !author || !publishedYear || !genre) {
      toast.error('All fields are required.');
      return;
    }
    const publishedYearNum = parseInt(publishedYear);
    if (isNaN(publishedYearNum)) {
      toast.error('Published Year must be a valid number.');
      return;
    }
    await createBook({
      variables: { title, author, publishedYear: publishedYearNum, genre },
    });
  };

  return (
    <StyledContainer>
      <FormBox>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Add Book
        </Typography>

        <Form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Author"
            variant="outlined"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Published Year"
            type="number"
            variant="outlined"
            value={publishedYear}
            onChange={(e) => setPublishedYear(e.target.value)}
            fullWidth
            required
            inputProps={{ min: 0 }}
          />
          <TextField
            label="Genre"
            variant="outlined"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            fullWidth
            required
          />
          <ButtonContainer>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add Book'}
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              size="large"
              fullWidth
              onClick={() => router.push('/books')}
              disabled={loading}
            >
              Cancel
            </Button>
          </ButtonContainer>
        </Form>

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error.message}
          </Alert>
        )}
      </FormBox>
    </StyledContainer>
  );
}