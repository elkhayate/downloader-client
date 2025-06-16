import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { MainLayout } from './layouts/MainLayout';
import { DownloadPage } from './pages/DownloadPage';
import { HistoryPage } from './pages/HistoryPage';
import { LoginPage } from './pages/auth/LoginPage';
import { SignUpPage } from './pages/auth/SignUpPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/auth/ResetPasswordPage';
import { LandingPage } from './pages/LandingPage';
import { AuthGuard, GuestGuard } from './middleware/auth';
 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        {/* Auth Routes */}
        <Route
          path="/login"
          element={
            <GuestGuard>
              <LoginPage />
            </GuestGuard>
          }
        />
        <Route
          path="/signup"
          element={
            <GuestGuard>
              <SignUpPage />
            </GuestGuard>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <GuestGuard>
              <ForgotPasswordPage />
            </GuestGuard>
          }
        />
        <Route
          path="/reset-password"
          element={<ResetPasswordPage />}
        />

        {/* Protected Routes */}
        <Route
          path="/download"
          element={
            <AuthGuard>
              <MainLayout>
                <DownloadPage />
              </MainLayout>
            </AuthGuard>
          }
        />
        <Route
          path="/history"
          element={
            <AuthGuard>
              <MainLayout>
                <HistoryPage />
              </MainLayout>
            </AuthGuard>
          }
        />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
