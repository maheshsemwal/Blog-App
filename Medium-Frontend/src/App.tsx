import {Routes, Route} from 'react-router-dom'
import { ThemeProvider } from "@/components/theme-provider"
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
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">

    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/write" element={<WritePage />} />
        <Route path="/post/:id" element={<PostPage />} />
      </Routes>
    
    </div>

    </ThemeProvider>
  )
}

export default App
