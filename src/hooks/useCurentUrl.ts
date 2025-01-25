'use client';

import { useState, useEffect } from 'react';

const useCurrentUrl = () => {
  const [currentUrl, setCurrentUrl] = useState('');
  const [domainUrl, setDomainUrl] = useState('');

  useEffect(() => {
    setCurrentUrl(window.location.href);
    setDomainUrl(window.location.origin);

    const handleUrlChange = () => {
      setCurrentUrl(window.location.href);
      setDomainUrl(window.location.origin);
    };

    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, []);

  return {
    currentUrl,
    domainUrl,
  };
};

export default useCurrentUrl;
