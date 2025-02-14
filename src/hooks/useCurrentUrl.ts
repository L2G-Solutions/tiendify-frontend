'use client';

import { useState, useEffect } from 'react';

/**
 * Custom hook to retrieve the current URL and domain URL.
 *
 * @returns {Object} An object containing:
 *   - `currentUrl` (string): The full current URL.
 *   - `domainUrl` (string): The origin (domain) of the current URL.
 *
 * This hook updates whenever the URL changes due to navigation events.
 */
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
