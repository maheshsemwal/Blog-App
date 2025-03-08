
import SignupComponent from '@/components/SignupComponent'
import QuoteComponent from '@/components/QuoteComponent'

const SignupPage = () => {
  return (
    <>
      <div className='flex h-screen w-screen items-center justify-center'>
        <div className='hidden flex-1 md:flex items-center justify-center p-8 h-full bg-black'>
          <QuoteComponent 
            quote="The only way to do great work is to love what you do." 
            author="Steve Jobs" 
          />
        </div>
        <div className='flex-1 flex items-center justify-center p-8 text-center'>
          <div className='w-full max-w-md'>
            <SignupComponent />
          </div>
        </div>
      </div>
    </>
  )
}

export default SignupPage
