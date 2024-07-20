import {Routes, Route} from 'react-router-dom'
import { lazy } from 'react'

const HomePage = lazy(() => import('./pages/HomePage'))
const LandingPage = lazy(() => import('./pages/LandingPage'))
const LoginPage = lazy(() => import('./pages/LoginPage'))
const SignupPage = lazy(() => import('./pages/SignupPage'))
const ProfilePage = lazy(() => import('./pages/ProfilePage'))
const WritePage = lazy(() => import('./pages/WritePage'))
const PostPage = lazy(() => import('./pages/PostPage'))

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/home" element={<LandingPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/write" element={<WritePage />} />
        <Route path="/post" element={<PostPage />} />
        
      </Routes>
    </div>
  )
}

export default App
