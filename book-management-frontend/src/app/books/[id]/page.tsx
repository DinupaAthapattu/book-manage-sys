

// 'use client';

// import { useQuery, gql } from '@apollo/client';
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

//   if (loading) return <p>Loading...</p>;
//   if (error) {
//     toast.error('Failed to load book details.');
//     return <p className="error-text">{error.message}</p>;
//   }

//   const book = data?.book;

//   if (!book) {
//     toast.error('Book not found.');
//     return <p className="error-text">Book not found.</p>;
//   }

//   return (
//     <div className="container">
//       <div className="detail-box">
//         <h1>Book Details</h1>
//         <p className="detail-item"><strong>Title:</strong> {book.title}</p>
//         <p className="detail-item"><strong>Author:</strong> {book.author}</p>
//         <p className="detail-item"><strong>Published Year:</strong> {book.publishedYear}</p>
//         <p className="detail-item"><strong>Genre:</strong> {book.genre}</p>
//         <div className="detail-buttons">
//           <button className="btn" onClick={() => router.push(`/books/edit/${book.id}`)}>
//             Edit Book
//           </button>
//           <button className="btn outlined" onClick={() => router.push('/books')}>
//             Back to List
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';

import { useQuery, gql } from '@apollo/client';
import { useRouter, useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import {
  Container,
  Box,
  Typography,
  Button,
  CircularProgress,
  Paper,
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

const StyledContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
}));

const DetailBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: 500,
  width: '100%',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[4],
}));

const DetailItem = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  '& strong': {
    marginRight: theme.spacing(1),
  },
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
  display: 'flex',
  gap: theme.spacing(2),
  justifyContent: 'center',
}));

export default function BookDetail() {
  const router = useRouter();
  const { id } = useParams();

  const { data, loading, error } = useQuery(GET_BOOK, {
    variables: { id },
  });

  if (loading) {
    return (
      <StyledContainer>
        <CircularProgress />
      </StyledContainer>
    );
  }

  if (error) {
    toast.error('Failed to load book details.');
    return (
      <StyledContainer>
        <Typography color="error" align="center">
          {error.message}
        </Typography>
      </StyledContainer>
    );
  }

  const book = data?.book;

  if (!book) {
    toast.error('Book not found.');
    return (
      <StyledContainer>
        <Typography color="error" align="center">
          Book not found.
        </Typography>
      </StyledContainer>
    );
  }

  return (
    <StyledContainer>
      <DetailBox elevation={3}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Book Details
        </Typography>

        <DetailItem>
          <Typography variant="body1">
            <strong>Title:</strong> {book.title}
          </Typography>
        </DetailItem>
        <DetailItem>
          <Typography variant="body1">
            <strong>Author:</strong> {book.author}
          </Typography>
        </DetailItem>
        <DetailItem>
          <Typography variant="body1">
            <strong>Published Year:</strong> {book.publishedYear}
          </Typography>
        </DetailItem>
        <DetailItem>
          <Typography variant="body1">
            <strong>Genre:</strong> {book.genre}
          </Typography>
        </DetailItem>

        <ButtonContainer>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => router.push(`/books/edit/${book.id}`)}
          >
            Edit Book
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            onClick={() => router.push('/books')}
          >
            Back to List
          </Button>
        </ButtonContainer>
      </DetailBox>
    </StyledContainer>
  );
} 