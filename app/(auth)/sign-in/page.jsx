'use client';
//error handling added
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import logo from '../../assets/img/logowithtext.png';
import GlobalApi from '@/app/_utils/GlobalApi';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { LoaderIcon } from 'lucide-react';
import { getCookie, setCookie } from 'cookies-next';

const Page = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const jwt = getCookie('jwt');
    if (jwt) {
      router.push('/');
    }
  }, [router]);

  const onSignIn = async () => {
    setLoader(true);
    try {
      const response = await GlobalApi.signIn(email, password);
      console.log(response.data.user);
      console.log(response.data.jwt);
      setCookie('user', JSON.stringify(response.data.user));
      setCookie('jwt', response.data.jwt);
      toast.success('Login Successful');
      router.push('/');
    } catch (error) {
      console.error('Sign-in error:', error);
      toast.error(error?.response?.data?.error?.message || 'An error occurred during sign-in.');
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className='flex items-baseline justify-center my-20'>
      <div className='flex flex-col items-center justify-center p-10 bg-slate-100 border-[2px] border-gray-200'>
        <Image src={logo} width={200} height={200} alt='Logo' />
        <h2 className='font-semibold text-3xl'>Sign In</h2>
        <h2 className='text-gray-500'>
          Enter Your Email and Password to sign in to your account
        </h2>
        <div className='w-full flex flex-col gap-5 mt-7'>
          <Input
            placeholder='name@example.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={onSignIn}>
            {loader ? <LoaderIcon className='animate-spin' /> : 'Sign In'}
          </Button>
          <p>
            Don't have an account?{' '}
            <Link className='text-[#254b36]' href={'/create-account'}>
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
