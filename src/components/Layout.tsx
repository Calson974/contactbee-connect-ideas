import { ReactNode } from 'react';
import NewNavbar from './NewNavbar';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NewNavbar />
      <main className="flex-1 pt-20">
        {children}
      </main>
    </div>
  );
};

export default Layout;
