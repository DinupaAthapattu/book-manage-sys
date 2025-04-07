
// 'use client';

// import { useState, useEffect } from 'react';
// import { useMutation, useQuery, gql } from '@apollo/client';
// import { useRouter, useParams } from 'next/navigation';
// import toast from 'react-hot-toast';

// const GET_BOOK = gql`
//   query Book($id: String!) {
//     book(id: $id) {
//       id
//       title
//       author
//       publishedYear
//       genre
//     }
//   }
// `;

// const UPDATE_BOOK = gql`
//   mutation UpdateBook($id: String!, $title: String!, $author: String!, $publishedYear: Int!, $genre: String!) {
//     updateBook(id: $id, title: $title, author: $author, publishedYear: $publishedYear, genre: $genre) {
//       id
//       title
//       author
//       publishedYear
//       genre
//     }
//   }
// `;

// export default function EditBook() {
//   const router = useRouter();
//   const { id } = useParams();
//   const [title, setTitle] = useState('');
//   const [author, setAuthor] = useState('');
//   const [publishedYear, setPublishedYear] = useState('');
//   const [genre, setGenre] = useState('');

//   const { data, loading, error } = useQuery(GET_BOOK, { variables: { id } });
//   const [updateBook, { error: updateError }] = useMutation(UPDATE_BOOK);

//   useEffect(() => {
//     if (data && data.book) {
//       setTitle(data.book.title);
//       setAuthor(data.book.author);
//       setPublishedYear(data.book.publishedYear.toString());
//       setGenre(data.book.genre);
//     }
//   }, [data]);

//   if (loading) return <p>Loading...</p>;
//   if (error) {
//     toast.error('Failed to load book data.');
//     return <p className="error-text">{error.message}</p>;
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!id || !title || !author || !publishedYear || !genre) {
//       toast.error('All fields are required.');
//       return;
//     }
//     const publishedYearNum = parseInt(publishedYear);
//     if (isNaN(publishedYearNum)) {
//       toast.error('Published Year must be a valid number.');
//       return;
//     }
//     try {
//       await updateBook({
//         variables: { id, title, author, publishedYear: publishedYearNum, genre },
//       });
//       toast.success('Book updated successfully!');
//       router.push('/books');
//     } catch (err) {
//       toast.error('Failed to update book.');
//     }
//   };

//   return (
//     <div className="container">
//       <div className="form-box">
//         <h1>Edit Book</h1>
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
//           <button type="submit" className="btn">Update Book</button>
//           {updateError && <p className="error-text">{updateError.message}</p>}
//         </form>
//       </div>
//     </div>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';
import { useRouter, useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
  styled,
} from '@mui/material';

const GET_BOOK = gql`
  query Book($id: String!) {
    book(id: $id) {
      id
      title
      author
      publishedYear
      genre
    }
  }
`;

const UPDATE_BOOK = gql`
  mutation UpdateBook($id: String!, $title: String!, $author: String!, $publishedYear: Int!, $genre: String!) {
    updateBook(id: $id, title: $title, author: $author, publishedYear: $publishedYear, genre: $genre) {
      id
      title
      author
      publishedYear
      genre
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

export default function EditBook() {
  const router = useRouter();
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishedYear, setPublishedYear] = useState('');
  const [genre, setGenre] = useState('');

  const { data, loading, error } = useQuery(GET_BOOK, { variables: { id } });
  const [updateBook, { error: updateError, loading: updateLoading }] = useMutation(UPDATE_BOOK, {
    onCompleted: () => {
      toast.success('Book updated successfully!');
      router.push('/books');
    },
    onError: () => toast.error('Failed to update book.'),
  });

  useEffect(() => {
    if (data && data.book) {
      setTitle(data.book.title);
      setAuthor(data.book.author);
      setPublishedYear(data.book.publishedYear.toString());
      setGenre(data.book.genre);
    }
  }, [data]);

  if (loading) {
    return (
      <StyledContainer>
        <CircularProgress />
      </StyledContainer>
    );
  }

  if (error) {
    toast.error('Failed to load book data.');
    return (
      <StyledContainer>
        <Alert severity="error">{error.message}</Alert>
      </StyledContainer>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !title || !author || !publishedYear || !genre) {
      toast.error('All fields are required.');
      return;
    }
    const publishedYearNum = parseInt(publishedYear);
    if (isNaN(publishedYearNum)) {
      toast.error('Published Year must be a valid number.');
      return;
    }
    await updateBook({
      variables: { id, title, author, publishedYear: publishedYearNum, genre },
    });
  };

  return (
    <StyledContainer>
      <FormBox>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Edit Book
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
              disabled={updateLoading}
            >
              {updateLoading ? 'Updating...' : 'Update Book'}
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              size="large"
              fullWidth
              onClick={() => router.push('/books')}
              disabled={updateLoading}
            >
              Cancel
            </Button>
          </ButtonContainer>
        </Form>

        {updateError && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {updateError.message}
          </Alert>
        )}
      </FormBox>
    </StyledContainer>
  );
}