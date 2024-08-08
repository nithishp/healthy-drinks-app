"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import logo from '../../assets/img/logowithtext.png'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import GlobalApi from '@/app/_utils/GlobalApi'
import { useRouter } from 'next/navigation'
import { toast } from "sonner"
import { LoaderIcon } from 'lucide-react'



const CreateAccount = () => {
  const router = useRouter()
  const [username,setUsername] = useState()
  const [email,setEmail] = useState()
  const [password,setPassword] = useState()
  const [loader,setLoader] = useState(false)
  const onCreateAccount =()=>{
    setLoader(true)
    GlobalApi.registerUser(username,email,password).then(resp=>{
      console.log(resp.data.user)
      console.log(resp.data.jwt)
      sessionStorage.setItem('user',JSON.stringify(resp.data.user))
      sessionStorage.setItem('jwt',resp.data.jwt)
      toast.success("Account Created Successfully")
      router.push('/')
      setLoader(false)
    },(e)=>{
      setLoader(false)
      toast.error(e?.response?.data?.error?.message)


    })
  }
  return (
    <div className=' flex items-baseline justify-center my-0'>
      <div className='flex flex-col items-center justify-center p-10 bg-slate-100 border-[2px] border-gray-200'>
        <Image src={logo} width={200} height={200} alt='Logo' />
        <h2 className='font-semibold text-3xl'>Create Account</h2>
        <h2 className='text-gray-500'>Enter Your Email and Password to create your account</h2>
        <div className='w-full flex flex-col gap-5 mt-7'>
        <Input placeholder='User Name' onChange={(e)=>setUsername(e.target.value)} />
        <Input placeholder='name@example.com' onChange={(e)=>setEmail(e.target.value)}/>
        <Input type='password' placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/>
        <Button onClick={()=>onCreateAccount()} >{loader?<LoaderIcon className=' animate-spin' />:'Create an Account'}</Button>
        <p>Already have an account? <Link className='text-[#254b36]' href={'/sign-in'} >Sign In</Link></p>

        </div>
      </div>
    </div>
  )
}

export default CreateAccount