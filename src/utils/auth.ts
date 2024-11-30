// interface Auth {
//   setToken: (access_token: string, refresh_token: string) => void;
//   getToken: () => string | null;
//   clearToken: () => void;
//   isAuthenticated: () => boolean;
// }

const auth = {
  setToken: (access_token: string, refresh_token: string) => {
    localStorage.setItem('token_access', access_token);
    localStorage.setItem('token_refresh', refresh_token);
  },
  getToken: () => localStorage.getItem('token_access'),
  getRefreshToken: () => localStorage.getItem('token_refresh'),
  clearToken: () => {
    localStorage.removeItem('token_access');
    localStorage.removeItem('token_refresh');
  },
  isAuthenticated: () => !!localStorage.getItem('token_access'),
};

export default auth;
