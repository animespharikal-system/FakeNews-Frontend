import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { DashboardPage } from './pages/DashboardPage';
import { AnalyzePage } from './pages/AnalyzePage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('tl_logged_in') === 'true';
  });
  const [userEmail, setUserEmail] = useState<string>(() => {
    return localStorage.getItem('tl_user_email') || '';
  });

  const handleLogin = (email: string) => {
    setIsLoggedIn(true);
    setUserEmail(email);
    localStorage.setItem('tl_logged_in', 'true');
    localStorage.setItem('tl_user_email', email);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail('');
    localStorage.removeItem('tl_logged_in');
    localStorage.removeItem('tl_user_email');
  };

  // Protected route portal gate
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (!isLoggedIn) {
      return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={
            <LandingPage 
              isLoggedIn={isLoggedIn} 
              onLogout={handleLogout} 
            />
          } 
        />
        <Route 
          path="/login" 
          element={
            isLoggedIn 
              ? <Navigate to="/dashboard" replace /> 
              : <LoginPage onLogin={handleLogin} />
          } 
        />
        <Route 
          path="/signup" 
          element={
            isLoggedIn 
              ? <Navigate to="/dashboard" replace /> 
              : <SignupPage onLogin={handleLogin} />
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <DashboardPage onLogout={handleLogout} userEmail={userEmail} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/analyze" 
          element={
            <ProtectedRoute>
              <AnalyzePage onLogout={handleLogout} userEmail={userEmail} />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
