// // 'use client';

// // import { useRouter } from 'next/navigation';
// // import { useEffect } from 'react';
// // import ApolloWrapper from '../components/ApolloWrapper';

// // export default function Home() {
// //   const router = useRouter();

// //   useEffect(() => {
// //     router.push('/login');
// //   }, [router]);

// //   return (
// //     <ApolloWrapper>
// //       <div /> {/* Minimal content since it redirects */}
// //     </ApolloWrapper>
// //   );
// // }

// 'use client';

// import { useRouter } from 'next/navigation';

// export default function Home() {
//   const router = useRouter();

//   return (
//     <div className="container">
//       <div className="home-box">
//         <h1>Welcome to the Book Management System</h1>
//         <p className="home-subtitle">
//           Manage your book collection with ease! This application allows you to:
//         </p>
//         <div className="home-features">
//           <p>- Register and log in to access your account.</p>
//           <p>- View a list of all books with pagination.</p>
//           <p>- Search books by title, author, or genre.</p>
//           <p>- Add new books to the collection.</p>
//           <p>- Edit existing book details.</p>
//           <p>- Delete books you no longer need.</p>
//         </div>
//         <div className="home-buttons">
//           <button className="btn" onClick={() => router.push('/login')}>
//             Log In
//           </button>
//           <button className="btn outlined" onClick={() => router.push('/register')}>
//             Register
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className="container">
      <div className="home-box">
        <h1>Welcome to the Book Management System</h1>
        <p className="home-subtitle">
          Manage your book collection with ease! This application allows you to:
        </p>
        <div className="home-features">
          <p>- Register and log in to access your account.</p>
          <p>- View a list of all books with pagination.</p>
          <p>- Search books by title, author, or genre.</p>
          <p>- Add new books to the collection.</p>
          <p>- Edit existing book details.</p>
          <p>- Delete books you no longer need.</p>
        </div>
        <div className="home-buttons">
          <button className="btn" onClick={() => router.push('/login')}>
            Log In
          </button>
          <button className="btn outlined" onClick={() => router.push('/register')}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
