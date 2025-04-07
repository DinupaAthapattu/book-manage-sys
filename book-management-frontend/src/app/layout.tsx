
import './globals.css';
import ApolloWrapper from '../components/ApolloWrapper';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'Book Management System',
  description: 'A simple book management app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <ApolloWrapper>
          {children}
          <Toaster position="top-center" />
        </ApolloWrapper>
      </body>
    </html>
  );
}