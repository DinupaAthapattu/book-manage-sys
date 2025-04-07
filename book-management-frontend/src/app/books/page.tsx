
  'use client';

import { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useDebounce } from 'use-debounce';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  CircularProgress,
  styled,
} from '@mui/material';

const GET_BOOKS = gql`
  query GetBooks($limit: Int!, $offset: Int!) {
    books(limit: $limit, offset: $offset) {
      id
      title
      author
      publishedYear
      genre
    }
  }
`;

const SEARCH_BOOKS = gql`
  query SearchBooks($query: String!) {
    searchBooks(query: $query) {
      id
      title
      author
      publishedYear
      genre
    }
  }
`;

const DELETE_BOOK = gql`
  mutation DeleteBook($id: String!) {
    deleteBook(id: $id) {
      id
    }
  }
`;

const StyledContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const HeaderBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
}));

const SearchBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  maxWidth: 400,
}));

const ActionButtons = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
}));

export default function Books() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery] = useDebounce(searchInput, 1000);
  const limit = 5;

  const { data, loading, error, refetch } = useQuery(GET_BOOKS, {
    variables: { limit, offset: (page - 1) * limit },
    skip: searchQuery !== '',
  });

  const { data: searchData, loading: searchLoading } = useQuery(SEARCH_BOOKS, {
    variables: { query: searchQuery },
    skip: searchQuery === '',
  });

  const [deleteBook] = useMutation(DELETE_BOOK);

  if (loading || searchLoading) {
    return (
      <StyledContainer>
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      </StyledContainer>
    );
  }

  if (error) {
    toast.error('Failed to load books.');
    return (
      <StyledContainer>
        <Typography color="error">{error.message}</Typography>
      </StyledContainer>
    );
  }

  const books = searchQuery ? searchData?.searchBooks || [] : data?.books || [];
  const totalBooks = searchQuery ? books.length : data?.books.length || 0;
  const totalPages = Math.ceil(totalBooks / limit);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this book?')) {
      try {
        await deleteBook({ variables: { id } });
        refetch();
        toast.success('Book deleted successfully!');
      } catch (err) {
        toast.error('Failed to delete book.');
      }
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    setPage(1);
  };

  return (
    <StyledContainer>
      <HeaderBox>
        <Typography variant="h4" component="h1">
          Book List
        </Typography>
        <SearchBox>
          <TextField
            label="Search by title, author, or genre"
            variant="outlined"
            value={searchInput}
            onChange={handleSearchChange}
            fullWidth
          />
        </SearchBox>
      </HeaderBox>

      <Button
        variant="contained"
        color="primary"
        onClick={() => router.push('/books/add')}
        sx={{ mb: 3 }}
      >
        Add Book
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Genre</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book: any) => (
              <TableRow key={book.id}>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.publishedYear}</TableCell>
                <TableCell>{book.genre}</TableCell>
                <TableCell align="right">
                  <ActionButtons>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => router.push(`/books/${book.id}`)}
                    >
                      View
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      color="primary"
                      onClick={() => router.push(`/books/edit/${book.id}`)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      color="error"
                      onClick={() => handleDelete(book.id)}
                    >
                      Delete
                    </Button>
                  </ActionButtons>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {!searchQuery && totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={3}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
          />
        </Box>
      )}
    </StyledContainer>
  );
}