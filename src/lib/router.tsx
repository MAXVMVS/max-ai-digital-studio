import React, { useState, useEffect } from 'react';

export function useLocation() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (to: string) => {
    window.history.pushState(null, '', to);
    setPath(to);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return [path, navigate] as const;
}

export function Route({ path, currentPath, children }: { path: string; currentPath: string; children: React.ReactNode }) {
  if (path !== currentPath) return null;
  return React.createElement(React.Fragment, null, children);
}
