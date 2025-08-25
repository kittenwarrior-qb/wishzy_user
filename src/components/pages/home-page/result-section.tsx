import Image from 'next/image'
import React from 'react'

const ResultSection = () => {
  return (
    <div className='py-20 relative'>
      <Image src={'https://res.cloudinary.com/djuksxdrw/image/upload/v1754109827/cardpng_nzmt5j.png'} alt='result' width={450} height={450} className='absolute -top-10 -right-10' />
      <div>
        hello
      </div>
    </div>
  )
}

export default ResultSection