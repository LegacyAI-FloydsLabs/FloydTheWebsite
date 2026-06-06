'use client';

import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AdminSidebar } from './admin-sidebar';

export function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession() || {};
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (status === 'loading') return;
    
    // Allow access to login page without authentication
    if (pathname === '/admin/login') return;
    
    // Redirect to login if not authenticated
    if (!session) {
      router.replace('/admin/login');
    }
  }, [session, status, pathname, router]);

  // Full-page wrapper that covers the parent Navbar/Footer
  const fullPageStyle = {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
    background: 'rgba(20, 10, 30, 1)',
  };

  if (!mounted) {
    return (
      <div style={fullPageStyle}>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-pulse text-xl" style={{ color: 'var(--floyd-accent-cyan)' }}>
            Loading...
          </div>
        </div>
      </div>
    );
  }

  // Show login page without sidebar
  if (pathname === '/admin/login') {
    return (
      <div style={fullPageStyle}>
        {children}
      </div>
    );
  }

  // Show loading state while checking authentication
  if (status === 'loading') {
    return (
      <div style={fullPageStyle}>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-pulse text-xl" style={{ color: 'var(--floyd-accent-cyan)' }}>
            Authenticating...
          </div>
        </div>
      </div>
    );
  }

  // If not authenticated and not on login page, show nothing (redirect will happen)
  if (!session && pathname !== '/admin/login') {
    return <div style={fullPageStyle} />;
  }

  return (
    <div style={fullPageStyle} className="flex overflow-hidden">
      <AdminSidebar />
      <main className="flex-1 ml-64 p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}
