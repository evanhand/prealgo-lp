import { Navbar } from './landing/Navbar';
import { Footer } from './landing/Footer';

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-12">{children}</main>
      <Footer />
    </>
  );
}
