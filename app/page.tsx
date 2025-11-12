// import Link from 'next/link';
// import Button from '@/components/UI/Button';

// export default function Home() {
//   return (
//     <>
//       <section className="hero">
//         <div className="container">
//           <h1>Hi, I'm Pankaj Chavan</h1>
//           <p>Software Developer </p>
//           <div className="btn-group">
//             <Link href="/projects">
//               <Button label="View My Work" variant="primary" />
//             </Link>
//             <Link href="/contact">
//               <Button label="Get In Touch" variant="outline" />
//             </Link>
//           </div>
//         </div>
//       </section>

//       <section className="container" style={{ padding: '80px 0' }}>
//         <div className="text-center">
//           <h2 className="section-title">What I Do</h2>
//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
//             <div className="project-card">
//               <h3>Frontend Development</h3>
//               <p>React, Next.js, TypeScript, HTML5, CSS3</p>
//             </div>
//             <div className="project-card">
//               <h3>Backend Development</h3>
//               <p>Node.js, MySql, PostgreSQL</p>
//             </div>
//             {/* <div className="project-card">
//               <h3>UI/UX Design</h3>
//               <p>Figma, Adobe XD, User Research, Prototyping</p>
//             </div> */}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }




import Link from 'next/link';
import Button from '@/components/UI/Button';
import { personalInfo } from '@/data/portfolio-data';

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>Hi, I'm {personalInfo.name}</h1>
          <p>{personalInfo.title}</p>
          <div className="btn-group">
            <Link href="/projects">
              <Button label="View My Work" variant="primary" />
            </Link>
            <Link href="/contact">
              <Button label="Get In Touch" variant="outline" />
            </Link>
          </div>
        </div>
      </section>

      <section className="container" style={{ padding: '80px 0' }}>
        <div className="text-center">
          <h2 className="section-title">What I Do</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            <div className="project-card">
              <h3>Frontend Development</h3>
              <p>React, Next.js, TypeScript, HTML5, CSS3</p>
            </div>
            <div className="project-card">
              <h3>Backend Development</h3>
              <p>Node.js, Express, MongoDB, PostgreSQL</p>
            </div>
            <div className="project-card">
              <h3>UI/UX Design</h3>
              <p>Figma, Adobe XD, User Research, Prototyping</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}