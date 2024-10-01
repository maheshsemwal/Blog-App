import React from 'react'

const QuoteComponent = ({ quote, author }: any) => {
  return (
    <div className='text-center'>
      <blockquote className='text-xl italic text-gray-200'>
        "{quote}"
      </blockquote>
      <p className='mt-4 text-lg font-semibold text-gray-500'>
        - {author}
      </p>
    </div>
  )
}

export default QuoteComponent
