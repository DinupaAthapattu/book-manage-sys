// 'use client';

// import { useQuery, gql } from '@apollo/client';
// import { Typography, Container, Box, Button } from '@mui/material';
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

// export default function BookDetail() {
//   const router = useRouter();
//   const { id } = useParams();

//   const { data, loading, error } = useQuery(GET_BOOK, {
//     variables: { id },
//   });

//   if (loading) return <Typography>Loading...</Typography>;
//   if (error) {
//     toast.error('Failed to load book details.');
//     return <Typography color="error">{error.message}</Typography>;
//   }

//   const book = data?.book;

//   if (!book) {
//     toast.error('Book not found.');
//     return <Typography color="error">Book not found.</Typography>;
//   }

//   return (
//     <Container maxWidth="md">
//       <Box sx={{ mt: 8 }}>
//         <Typography variant="h4" gutterBottom>
//           Book Details
//         </Typography>
//         <Box sx={{ mb: 4 }}>
//           <Typography variant="h6">
//             <strong>Title:</strong> {book.title}
//           </Typography>
//           <Typography variant="h6">
//             <strong>Author:</strong> {book.author}
//           </Typography>
//           <Typography variant="h6">
//             <strong>Published Year:</strong> {book.publishedYear}
//           </Typography>
//           <Typography variant="h6">
//             <strong>Genre:</strong> {book.genre}
//           </Typography>
//         </Box>
//         <Box sx={{ display: 'flex', gap: 2 }}>
//           <Button variant="contained" onClick={() => router.push(`/books/edit/${book.id}`)}>
//             Edit Book
//           </Button>
//           <Button variant="outlined" onClick={() => router.push('/books')}>
//             Back to List
//           </Button>
//         </Box>
//       </Box>
//     </Container>
//   );
// }

'use client';

import { useQuery, gql } from '@apollo/client';
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

export default function BookDetail() {
  const router = useRouter();
  const { id } = useParams();

  const { data, loading, error } = useQuery(GET_BOOK, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) {
    toast.error('Failed to load book details.');
    return <p className="error-text">{error.message}</p>;
  }

  const book = data?.book;

  if (!book) {
    toast.error('Book not found.');
    return <p className="error-text">Book not found.</p>;
  }

  return (
    <div className="container">
      <div className="detail-box">
        <h1>Book Details</h1>
        <p className="detail-item"><strong>Title:</strong> {book.title}</p>
        <p className="detail-item"><strong>Author:</strong> {book.author}</p>
        <p className="detail-item"><strong>Published Year:</strong> {book.publishedYear}</p>
        <p className="detail-item"><strong>Genre:</strong> {book.genre}</p>
        <div className="detail-buttons">
          <button className="btn" onClick={() => router.push(`/books/edit/${book.id}`)}>
            Edit Book
          </button>
          <button className="btn outlined" onClick={() => router.push('/books')}>
            Back to List
          </button>
        </div>
      </div>
    </div>
  );
}