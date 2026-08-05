import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import { NotificationProvider } from '@/lib/NotificationContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import Home from './pages/Home';
import ContainerAug4CodiaStudio from './pages/ContainerAug4CodiaStudio';
import ContainerAug4CodiaStudio2 from './pages/ContainerAug4CodiaStudio2';
import ContainerAug4CodiaStudio3 from './pages/ContainerAug4CodiaStudio3';
import ContainerAug4CodiaStudio4 from './pages/ContainerAug4CodiaStudio4';
import ChartPage from './pages/ChartPage';
import DrawDetailsPage from './pages/DrawDetailsPage';
import AdminRoute from '@/components/admin/AdminRoute';
import AdminApp from './pages/admin/AdminApp';
import ContainerAug5CodiaStudio from './pages/ContainerAug5CodiaStudio';
import ContainerAug5CodiaStudio2 from './pages/ContainerAug5CodiaStudio2';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
// Add page imports here

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-muted border-t-foreground rounded-full animate-spin" />
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      const AUTH_ROUTES = ['/login', '/register', '/forgot-password', '/reset-password', '/oauth-consent'];
      if (!AUTH_ROUTES.includes(window.location.pathname)) {
        navigateToLogin();
        return null;
      }
    }
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/giai-thuong" element={<ContainerAug4CodiaStudio />} />
      <Route path="/cua-toi" element={<ContainerAug4CodiaStudio2 />} />
      <Route path="/sanh-choi" element={<ContainerAug4CodiaStudio3 />} />
      <Route path="/choi-game/:gameId" element={<ContainerAug4CodiaStudio4 />} />
      <Route path="/bieu-do/:gameId" element={<ChartPage />} />
      <Route path="/ket-qua/:gameId" element={<DrawDetailsPage />} />
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminApp />} />
      </Route>
      <Route path="/ContainerAug5CodiaStudio" element={<ContainerAug5CodiaStudio />} />
      <Route path="/ContainerAug5CodiaStudio2" element={<ContainerAug5CodiaStudio2 />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      {/* Add your page Route elements here */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <QueryClientProvider client={queryClientInstance}>
          <Router>
            <AuthenticatedApp />
          </Router>
          <Toaster />
        </QueryClientProvider>
      </NotificationProvider>
    </AuthProvider>
  )
}

export default App