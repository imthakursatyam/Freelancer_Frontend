import React from 'react'
import { Spinner } from '@chakra-ui/react';

export default function PageSpinner({Loading}) {

     return <>
      <div className={`${Loading?"visible":"invisible"} fixed min-w-full overlay flex justify-center items-center pb-28 md:pb-0 flex-wrap z-30 min-h-screen bg-white bg-opacity-30`}>
      <Spinner className='mb-40 text-bold' size="lg" color='green.500' />   
      </div>
    
     </>
    }