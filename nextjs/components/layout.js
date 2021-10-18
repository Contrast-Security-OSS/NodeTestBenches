import Link from 'next/link';

export const Layout = ({ children }) => (
  <>
  <header>
    <nav>
      <Link href='/'>Home</Link>
    </nav>
  </header>
  <div>{ children }</div>
  </>
);