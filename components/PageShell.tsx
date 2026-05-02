import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-12">{children}</main>
      <Footer />
    </>
  );
}
