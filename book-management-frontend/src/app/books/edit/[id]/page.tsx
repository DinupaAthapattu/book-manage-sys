// 'use client';

// import { useState, useEffect } from 'react';
// import { useMutation, useQuery, gql } from '@apollo/client';
// import { TextField, Button, Typography, Container, Box } from '@mui/material';
// import { useRouter, useParams } from 'next/navigation';
// import toast from 'react-hot-toast'; // Add this import

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

//   if (loading) return <Typography>Loading...</Typography>;
//   if (error) {
//     toast.error('Failed to load book data.');
//     return <Typography color="error">{error.message}</Typography>;
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
//     <Container maxWidth="sm">
//       <Box sx={{ mt: 8 }}>
//         <Typography variant="h4" gutterBottom>Edit Book</Typography>
//         <form onSubmit={handleSubmit}>
//           <TextField
//             label="Title"
//             fullWidth
//             margin="normal"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//           <TextField
//             label="Author"
//             fullWidth
//             margin="normal"
//             value={author}
//             onChange={(e) => setAuthor(e.target.value)}
//           />
//           <TextField
//             label="Published Year"
//             type="number"
//             fullWidth
//             margin="normal"
//             value={publishedYear}
//             onChange={(e) => setPublishedYear(e.target.value)}
//           />
//           <TextField
//             label="Genre"
//             fullWidth
//             margin="normal"
//             value={genre}
//             onChange={(e) => setGenre(e.target.value)}
//           />
//           <Button type="submit" variant="contained" sx={{ mt: 2 }}>
//             Update Book
//           </Button>
//           {updateError && <Typography color="error">{updateError.message}</Typography>}
//         </form>
//       </Box>
//     </Container>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';
import { useRouter, useParams } from 'next/navigation';
import toast from 'react-hot-toast';

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

export default function EditBook() {
  const router = useRouter();
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishedYear, setPublishedYear] = useState('');
  const [genre, setGenre] = useState('');

  const { data, loading, error } = useQuery(GET_BOOK, { variables: { id } });
  const [updateBook, { error: updateError }] = useMutation(UPDATE_BOOK);

  useEffect(() => {
    if (data && data.book) {
      setTitle(data.book.title);
      setAuthor(data.book.author);
      setPublishedYear(data.book.publishedYear.toString());
      setGenre(data.book.genre);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) {
    toast.error('Failed to load book data.');
    return <p className="error-text">{error.message}</p>;
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
    try {
      await updateBook({
        variables: { id, title, author, publishedYear: publishedYearNum, genre },
      });
      toast.success('Book updated successfully!');
      router.push('/books');
    } catch (err) {
      toast.error('Failed to update book.');
    }
  };

  return (
    <div className="container">
      <div className="form-box">
        <h1>Edit Book</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <input
            type="number"
            placeholder="Published Year"
            value={publishedYear}
            onChange={(e) => setPublishedYear(e.target.value)}
          />
          <input
            type="text"
            placeholder="Genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
          <button type="submit" className="btn">Update Book</button>
          {updateError && <p className="error-text">{updateError.message}</p>}
        </form>
      </div>
    </div>
  );
}