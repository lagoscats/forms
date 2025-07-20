import { jwtDecode } from 'jwt-decode';

export const isLoggedIn = () => {
  const token = localStorage.getItem('access');
  if (!token) return false;

  try {
    const { exp } = jwtDecode(token);
    return Date.now() / 1000 < exp;
  } catch {
    return false;
  }
};

export const getUsername = () => {
  const token = localStorage.getItem('access');
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.username || 'User';
  } catch {
    return null;
  }
};
