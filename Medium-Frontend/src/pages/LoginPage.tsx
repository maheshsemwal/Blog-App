import LoginComponent from '@/components/LoginComponent'
import QuoteComponent from '@/components/QuoteComponent'
const LoginPage = () => {
  return (
    <>
      <div className='flex h-screen w-screen items-center justify-center'>
        <div className='hidden md:flex flex-1 items-center justify-center p-8 h-full bg-black'>
          <QuoteComponent
            quote="The only way to do great work is to love what you do."
            author="Steve Jobs"
          />
        </div>
        <div className='flex-1 flex items-center justify-center p-8'>
          <div className='w-full max-w-md'>
            <LoginComponent />
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage
