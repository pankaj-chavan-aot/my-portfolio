// import Link from 'next/link';

// const Header = () => {
//   return (
//     <header className="header">
//       <div className="container">
//         <nav className="nav">
//           <Link href="/" className="logo">
//             MyPortfolio
//           </Link>
//           <ul className="nav-links">
//             <li><Link href="/">Home</Link></li>
//             <li><Link href="/about">About</Link></li>
//             <li><Link href="/projects">Projects</Link></li>
//             <li><Link href="/contact">Contact</Link></li>
//           </ul>
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Header;



import Link from 'next/link';
import { checkAuth } from '@/data/auth-data';

const Header = () => {
  const isAuthenticated = checkAuth();

  return (
    <header className="header">
      <div className="container">
        <nav className="nav">
          <Link href="/" className="logo">
            MyPortfolio
          </Link>
          <ul className="nav-links">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/projects">Projects</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li>
              <Link href={isAuthenticated ? "/admin" : "/admin/login"}>
                {isAuthenticated ? "🚀 Admin" : "Admin"}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;