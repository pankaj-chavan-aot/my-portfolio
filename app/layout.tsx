// import type { Metadata } from 'next';
// import './globals.css';
// import Header from '@/components/Layout/Header';
// import Footer from '@/components/Layout/Footer';

// export const metadata: Metadata = {
//   title: 'My Portfolio',
//   description: 'A personal portfolio built with Next.js',
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
//         <Header />
//         <main style={{ flex: 1 }}>
//           {children}
//         </main>
//         <Footer />
//       </body>
//     </html>
//   );
// }
import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { ToastProvider } from '@/components/UI/Toast/ToastProvider';

export const metadata: Metadata = {
  title: 'My Portfolio',
  description: 'A personal portfolio built with Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <ToastProvider />
        <Header />
        <main style={{ flex: 1 }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}