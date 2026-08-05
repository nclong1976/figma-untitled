import React, { createContext, useState, useContext, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { localCurrentSession, localClearSession } from '@/lib/localAuth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [authError, setAuthError] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  // Khởi động: đọc phiên từ localStorage trực tiếp, không gọi Base44 API.
  useEffect(() => {
    const session = localCurrentSession();
    if (session) {
      setUser(session);
      setIsAuthenticated(true);
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
    setAuthError(null);
    setIsLoadingAuth(false);
    setAuthChecked(true);
  }, []);

  // Cập nhật tức thì phiên sau khi đăng nhập/đăng ký thành công:
  // set user state + localStorage('user') + tắt loading để ProtectedRoute không kẹt/đẩy về /login
  const setSession = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    setAuthChecked(true);
    setIsLoadingAuth(false);
    setAuthError(null);
    try { localStorage.setItem('user', JSON.stringify(userData)); } catch (e) { /* ignore */ }
  };

  // Hàm đăng xuất dùng chung trên toàn ứng dụng:
  // xoá phiên cục bộ + state rồi chuyển về /login
  const logout = (redirectUrl) => {
    // Xoá hoàn toàn Token, Session và thông tin User hiện tại.
    setUser(null);
    setIsAuthenticated(false);
    setAuthChecked(true);
    setAuthError(null);
    localClearSession();
    try {
      sessionStorage.clear();
      localStorage.removeItem('base44_token');
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
    } catch (e) { /* ignore */ }
    
    if (redirectUrl) {
      window.location.href = redirectUrl;
    } else {
      window.location.href = '/login';
    }
  };

  const navigateToLogin = () => {
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isLoadingAuth,
      authError,
      authChecked,
      logout,
      navigateToLogin,
      setSession
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};