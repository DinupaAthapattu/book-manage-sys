

'use client';

import { useRouter } from 'next/navigation';
import { 
  Container, 
  Box, 
  Typography, 
  Button, 
  List, 
  ListItem, 
  ListItemText 
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
}));

const HomeBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[4],
  maxWidth: 600,
  width: '100%',
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
  display: 'flex',
  gap: theme.spacing(2),
  justifyContent: 'center',
}));

export default function Home() {
  const router = useRouter();

  const features = [
    'Register and log in to access your account.',
    'View a list of all books with pagination.',
    'Search books by title, author, or genre.',
    'Add new books to the collection.',
    'Edit existing book details.',
    'Delete books you no longer need.',
  ];

  return (
    <StyledContainer>
      <HomeBox>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Welcome to the Book Management System
        </Typography>
        
        <Typography 
          variant="subtitle1" 
          align="center" 
          color="text.secondary" 
          sx={{ mb: 3 }}
        >
          Manage your book collection with ease! This application allows you to:
        </Typography>

        <List sx={{ mb: 3 }}>
          {features.map((feature, index) => (
            <ListItem key={index} disablePadding>
              <ListItemText 
                primary={feature}
                primaryTypographyProps={{
                  variant: 'body1',
                  color: 'text.primary'
                }}
              />
            </ListItem>
          ))}
        </List>

        <ButtonContainer>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => router.push('/login')}
          >
            Log In
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            onClick={() => router.push('/register')}
          >
            Register
          </Button>
        </ButtonContainer>
      </HomeBox>
    </StyledContainer>
  );
}