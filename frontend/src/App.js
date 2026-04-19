// frontend/src/App.js
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import './style.css';

// Pages
import SplashPage from './pages/SplashPage';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Quiz from './pages/Quiz';
import PostPage from './pages/PostPage';
import ProfilePage from './pages/ProfilePage';
import CreatePostPage from './pages/CreatePostPage';
import EditPostPage from './pages/EditPostPage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <>
      {/* Header hides itself on '/' — same pattern as reference site */}
      <Header />

      <Routes>
        {/* Public routes */}
        <Route path='/' element={<SplashPage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/quiz' element={<Quiz />} />
        <Route path='/posts/:id' element={<PostPage />} />

        {/* Protected routes — must be logged in */}
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/create-post'
          element={
            <ProtectedRoute>
              <CreatePostPage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/edit-post/:id'
          element={
            <ProtectedRoute>
              <EditPostPage />
            </ProtectedRoute>
          }
        />

        {/* Admin only */}
        <Route
          path='/admin'
          element={
            <ProtectedRoute role='admin'>
              <AdminPage />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App;