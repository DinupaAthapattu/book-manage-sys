// // // src/app/layout.tsx (Server Component)
// // import { CssBaseline } from '@mui/material';
// // import './globals.css';
// // import ApolloWrapper from '../components/ApolloWrapper';

// // export const metadata = {
// //   title: 'Book Management System',
// //   description: 'A simple book management app',
// // };

// // export default function RootLayout({
// //   children,
// // }: {
// //   children: React.ReactNode;
// // }) {
// //   return (
// //     <html lang="en">
// //       <body>
// //         <ApolloWrapper>
// //           <CssBaseline />
// //           {children}
// //         </ApolloWrapper>
// //       </body>
// //     </html>
// //   );
// // }

// import { CssBaseline } from '@mui/material';
// import './globals.css';
// import ApolloWrapper from '../components/ApolloWrapper';
// import { Toaster } from 'react-hot-toast'; // Add this import

// export const metadata = {
//   title: 'Book Management System',
//   description: 'A simple book management app',
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body>
//         <ApolloWrapper>
//           <CssBaseline />
//           {children}
//           <Toaster position="top-center" /> {/* Add Toaster here */}
//         </ApolloWrapper>
//       </body>
//     </html>
//   );
// }

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
          <Toaster position="top-right" />
        </ApolloWrapper>
      </body>
    </html>
  );
}