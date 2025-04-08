'use client'
import { useRouter } from 'next/navigation' 

export default function GoBackButton (){
    const router = useRouter();
    return(
        <button type="button" className='btn-text' onClick={() => router.back()}>
            Go Back
        </button>
    )
}