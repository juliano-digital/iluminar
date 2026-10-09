import { useEffect, useState } from 'react';
import FoldcraftLanding from './components/FoldcraftLanding';
import AdminPanel from './components/admin/AdminPanel';

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  // Check if we're on admin route
  useEffect(() => {
    const checkRoute = () => {
      setIsAdmin(window.location.pathname.includes('/admin') || window.location.hash === '#admin');
    };
    checkRoute();
    window.addEventListener('hashchange', checkRoute);
    window.addEventListener('popstate', checkRoute);
    return () => {
      window.removeEventListener('hashchange', checkRoute);
      window.removeEventListener('popstate', checkRoute);
    };
  }, []);

  // If admin route, show admin panel
  if (isAdmin) {
    return <AdminPanel />;
  }

  // Otherwise, show the new Foldcraft landing page
  return <FoldcraftLanding />;
}
