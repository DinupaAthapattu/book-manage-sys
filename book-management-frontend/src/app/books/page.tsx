// // 'use client';

// // import { useState } from 'react';
// // import { useQuery, useMutation, gql } from '@apollo/client';
// // import { Typography, Container, Table, TableBody, TableCell, TableHead, TableRow, Button, TextField, Box, Pagination } from '@mui/material';
// // import { useRouter } from 'next/navigation';
// // import toast from 'react-hot-toast';
// // import { useDebounce } from 'use-debounce';

// // const GET_BOOKS = gql`
// //   query GetBooks($limit: Int!, $offset: Int!) {
// //     books(limit: $limit, offset: $offset) {
// //       id
// //       title
// //       author
// //       publishedYear
// //       genre
// //     }
// //   }
// // `;

// // const SEARCH_BOOKS = gql`
// //   query SearchBooks($query: String!) {
// //     searchBooks(query: $query) {
// //       id
// //       title
// //       author
// //       publishedYear
// //       genre
// //     }
// //   }
// // `;

// // const DELETE_BOOK = gql`
// //   mutation DeleteBook($id: String!) {
// //     deleteBook(id: $id) {
// //       id
// //     }
// //   }
// // `;

// // export default function Books() {
// //   const router = useRouter();
// //   const [page, setPage] = useState(1);
// //   const [searchInput, setSearchInput] = useState('');
// //   const [searchQuery, setSearchQuery] = useDebounce(searchInput, 300);
// //   const limit = 5;

// //   const { data, loading, error, refetch } = useQuery(GET_BOOKS, {
// //     variables: { limit, offset: (page - 1) * limit },
// //     skip: searchQuery !== '',
// //   });

// //   const { data: searchData, loading: searchLoading, error: searchError } = useQuery(SEARCH_BOOKS, {
// //     variables: { query: searchQuery },
// //     skip: searchQuery === '',
// //   });

// //   const [deleteBook] = useMutation(DELETE_BOOK);

// //   if (loading || searchLoading) return <Typography>Loading...</Typography>;
// //   if (error) {
// //     toast.error('Failed to load books.');
// //     return <Typography color="error">{error.message}</Typography>;
// //   }
// //   if (searchError) {
// //     toast.error('Failed to search books.');
// //     return <Typography color="error">{searchError.message}</Typography>;
// //   }

// //   const books = searchQuery ? searchData?.searchBooks || [] : data?.books || [];
// //   const totalBooks = searchQuery ? books.length : data?.books.length || 0;
// //   const totalPages = Math.ceil(totalBooks / limit);

// //   const handleDelete = async (id: string) => {
// //     if (confirm('Are you sure you want to delete this book?')) {
// //       try {
// //         await deleteBook({ variables: { id } });
// //         refetch();
// //         toast.success('Book deleted successfully!');
// //       } catch (err) {
// //         toast.error('Failed to delete book.');
// //       }
// //     }
// //   };

// //   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     setSearchInput(e.target.value);
// //     setPage(1);
// //   };

// //   const handleSearchSubmit = () => {
// //     setSearchQuery(searchInput);
// //     setPage(1);
// //   };

// //   const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
// //     setPage(value);
// //   };

// //   return (
// //     <Container>
// //       <Typography variant="h4" gutterBottom>Book List</Typography>
// //       <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
// //         <Button onClick={() => router.push('/books/add')} variant="contained">
// //           Add Book
// //         </Button>
// //         <Box sx={{ display: 'flex', gap: 1 }}>
// //           <TextField
// //             label="Search Books"
// //             variant="outlined"
// //             value={searchInput}
// //             onChange={handleSearchChange}
// //             sx={{ width: '300px' }}
// //             placeholder="Search by title, author, or genre"
// //           />
// //           <Button variant="contained" onClick={handleSearchSubmit}>
// //             Search
// //           </Button>
// //         </Box>
// //       </Box>
// //       <Table>
// //         <TableHead>
// //           <TableRow>
// //             <TableCell>Title</TableCell>
// //             <TableCell>Author</TableCell>
// //             <TableCell>Year</TableCell>
// //             <TableCell>Genre</TableCell>
// //             <TableCell>Actions</TableCell>
// //           </TableRow>
// //         </TableHead>
// //         <TableBody>
// //           {books.map((book: any) => (
// //             <TableRow key={book.id}>
// //               <TableCell>{book.title}</TableCell>
// //               <TableCell>{book.author}</TableCell>
// //               <TableCell>{book.publishedYear}</TableCell>
// //               <TableCell>{book.genre}</TableCell>
// //               <TableCell>
// //                 <Button onClick={() => router.push(`/books/${book.id}`)}>View Details</Button>
// //                 <Button onClick={() => router.push(`/books/edit/${book.id}`)}>Edit</Button>
// //                 <Button onClick={() => handleDelete(book.id)} color="error">Delete</Button>
// //               </TableCell>
// //             </TableRow>
// //           ))}
// //         </TableBody>
// //       </Table>
// //       {!searchQuery && (
// //         <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
// //           <Pagination
// //             count={totalPages}
// //             page={page}
// //             onChange={handlePageChange}
// //             color="primary"
// //           />
// //         </Box>
// //       )}
// //     </Container>
// //   );
// // }

// 'use client';

// import { Typography, Button } from '@mui/material';
// import { useRouter } from 'next/navigation';

// export default function Home() {
//   const router = useRouter();

//   return (
//     <div className="container">
//       <div className="home-box">
//         <Typography className="home-title">Welcome to the Book Management System</Typography>
//         <Typography className="home-subtitle">
//           Manage your book collection with ease! This application allows you to:
//         </Typography>
//         <div className="home-features">
//           <Typography>- Register and log in to access your account.</Typography>
//           <Typography>- View a list of all books with pagination.</Typography>
//           <Typography>- Search books by title, author, or genre.</Typography>
//           <Typography>- Add new books to the collection.</Typography>
//           <Typography>- Edit existing book details.</Typography>
//           <Typography>- Delete books you no longer need.</Typography>
//         </div>
//         <div className="home-buttons">
//           <Button className="login-btn" onClick={() => router.push('/login')}>
//             Log In
//           </Button>
//           <Button className="register-btn outlined" onClick={() => router.push('/register')}>
//             Register
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

  'use client';

  import { useState } from 'react';
  import { useQuery, useMutation, gql } from '@apollo/client';
  import { useRouter } from 'next/navigation';
  import toast from 'react-hot-toast';
  import { useDebounce } from 'use-debounce';

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

  export default function Books() {
    const router = useRouter();
    const [page, setPage] = useState(1);
    const [searchInput, setSearchInput] = useState('');
    const [searchQuery, setSearchQuery] = useDebounce(searchInput, 300);
    const limit = 5;

    const { data, loading, error, refetch } = useQuery(GET_BOOKS, {
      variables: { limit, offset: (page - 1) * limit },
      skip: searchQuery !== '',
    });

    const { data: searchData, loading: searchLoading, error: searchError } = useQuery(SEARCH_BOOKS, {
      variables: { query: searchQuery },
      skip: searchQuery === '',
    });

    const [deleteBook] = useMutation(DELETE_BOOK);

    if (loading || searchLoading) return <p>Loading...</p>;
    if (error) {
      toast.error('Failed to load books.');
      return <p className="error-text">{error.message}</p>;
    }
    if (searchError) {
      toast.error('Failed to search books.');
      return <p className="error-text">{searchError.message}</p>;
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

    const handleSearchSubmit = () => {
      setSearchQuery(searchInput);
      setPage(1);
    };

    const handlePageChange = (value: number) => {
      setPage(value);
    };

    return (
      <div className="container">
        <div className="books-header">
          <h1>Book List</h1>
          <div className="search-box">
            <input
              type="text"
              placeholder="Search by title, author, or genre"
              value={searchInput}
              onChange={handleSearchChange}
            />
            <button className="btn" onClick={handleSearchSubmit}>Search</button>
          </div>
        </div>
        <button className="btn" onClick={() => router.push('/books/add')}>
          Add Book
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Year</th>
              <th>Genre</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book: any) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.publishedYear}</td>
                <td>{book.genre}</td>
                <td className="table-actions">
                  <button className="btn" onClick={() => router.push(`/books/${book.id}`)}>View Details</button>
                  <button className="btn" onClick={() => router.push(`/books/edit/${book.id}`)}>Edit</button>
                  <button className="btn error" onClick={() => handleDelete(book.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!searchQuery && (
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`pagination-btn ${page === i + 1 ? 'active' : ''}`}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }