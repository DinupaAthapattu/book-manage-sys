// 'use client';

// import { useState } from 'react';
// import { useMutation, gql } from '@apollo/client';
// import { TextField, Button, Typography, Container, Box } from '@mui/material';
// import { useRouter } from 'next/navigation';
// import toast from 'react-hot-toast'; // Add this import

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
//     <Container maxWidth="sm">
//       <Box sx={{ mt: 8 }}>
//         <Typography variant="h4" gutterBottom>Add Book</Typography>
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
//             Add Book
//           </Button>
//           {error && <Typography color="error">{error.message}</Typography>}
//         </form>
//       </Box>
//     </Container>
//   );
// }

'use client';

import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const CREATE_BOOK = gql`
  mutation CreateBook($title: String!, $author: String!, $publishedYear: Int!, $genre: String!) {
    createBook(title: $title, author: $author, publishedYear: $publishedYear, genre: $genre) {
      id
    }
  }
`;

export default function AddBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishedYear, setPublishedYear] = useState('');
  const [genre, setGenre] = useState('');
  const [createBook, { error }] = useMutation(CREATE_BOOK);
  const router = useRouter();

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
    try {
      await createBook({
        variables: { title, author, publishedYear: publishedYearNum, genre },
      });
      toast.success('Book added successfully!');
      router.push('/books');
    } catch (err) {
      toast.error('Failed to add book.');
    }
  };

  return (
    <div className="container">
      <div className="form-box">
        <h1>Add Book</h1>
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
          <button type="submit" className="btn">Add Book</button>
          {error && <p className="error-text">{error.message}</p>}
        </form>
      </div>
    </div>
  );
}   