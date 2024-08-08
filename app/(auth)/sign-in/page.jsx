"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import logo from '../../assets/img/logowithtext.png'
import GlobalApi from '@/app/_utils/GlobalApi'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { LoaderIcon } from 'lucide-react'


const page = () => {
  const router = useRouter()
  const [email,setEmail] = useState()
  const [password,setPassword] = useState()
  const [loader,setLoader] = useState(false)
  useEffect(()=>{
    const jwt = sessionStorage.getItem('jwt')
    if(jwt){
      router.push('/')
    }
  },[])
  const onSignIn = () =>{
    setLoader(true)
    GlobalApi.signIn(email,password).then(resp=>{
      console.log(resp.data.user)
      console.log(resp.data.jwt)
      sessionStorage.setItem('user',JSON.stringify(resp.data.user))
      sessionStorage.setItem('jwt',resp.data.jwt)
      toast.success("Login Successful")
      router.push('/')
      setLoader(false)
    },(e)=>{
    
      setLoader(false)

      toast.error(e?.response?.data?.error?.message)

    })
  }
  return (
    <div className=' flex items-baseline justify-center my-20'>
      <div className='flex flex-col items-center justify-center p-10 bg-slate-100 border-[2px] border-gray-200'>
        <Image src={logo} width={200} height={200} alt='Logo' />
        <h2 className='font-semibold text-3xl'>Sign In</h2>
        <h2 className='text-gray-500'>Enter Your Email and Password to sign in into your account</h2>
        <div className='w-full flex flex-col gap-5 mt-7'>
        <Input placeholder='name@example.com' onChange={(e)=>setEmail(e.target.value)}/>
        <Input type='password' placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/>
        <Button onClick={()=>onSignIn()} >{loader?<LoaderIcon className='animate-spin' />:'Sign In'}</Button>
        <p>Don't have an account? <Link className='text-[#254b36]' href={'/create-account'} > Sign Up</Link></p>

        </div>
      </div>
    </div>
  )
}

export default page