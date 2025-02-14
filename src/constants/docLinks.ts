const BASE_URL = process.env.NEXT_PUBLIC_DOCS_URL || 'http://localhost:3001';

const DOCK_PATHS = {
  '': '',
  docs: 'docs/intro',
  blog: 'blog',
  infrastructure: 'docs/infrastructure',
  auth: 'store-api/authentication',
  adminAuth: 'docs/store-api/admin%20access',
  apiReference: 'api-reference',
};

export const getDocUrl = (path: keyof typeof DOCK_PATHS) => `${BASE_URL}/${DOCK_PATHS[path]}`;
