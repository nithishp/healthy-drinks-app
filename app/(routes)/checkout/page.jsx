'use client'
import GlobalApi from '@/app/_utils/GlobalApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {CreditCardIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

const Checkout = () => {
  const jwt = sessionStorage.getItem("jwt");
  const userData = sessionStorage.getItem("user");
  const user = JSON.parse(userData);
  const [totalCartItem, setTotalCartItem] = useState(0);
  const [subtotal, setSubTotal] = useState(0);
  const [billAmount,setBillAmount] = useState(0)
  const [cartItemList, setCartItemList] = useState([]);
  const router = useRouter()

  const [username,setUsername]=useState();
  const [email,setEmail]=useState();
  const [phone,setPhone]=useState();
  const [zip,setZip]=useState();
  const [address,setAddress]=useState();

  useEffect(()=>{
      getCartItems()
  },[])


  const getCartItems = async () => {
    try {
      if (!user || !jwt) {
        router.push('/sign-in')
      }

      const cartItemList_ = await GlobalApi.getCartItems(user.id, jwt);
      console.log("Fetched cart items:", cartItemList_);

      if (Array.isArray(cartItemList_)) {
        setCartItemList([...cartItemList_]); // Ensure we set a new array reference
        console.log("Items in cart :", cartItemList);
        setTotalCartItem(cartItemList_.length);
      } else {
        throw new Error("Cart items data is not in expected array format.");
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setCartItemList([]);
    }
  };


  useEffect(() => {
    let total = 0;
    cartItemList.forEach((element) => {
      const amount = parseFloat(element.amount);
      if (!isNaN(amount)) {
        total += amount;
      } else {
        console.warn(`Invalid amount for item ${element.name}:`, element.amount);
      }
    });
    setBillAmount((total*1.1+15).toFixed(0))
    setSubTotal(total);
  }, [cartItemList]);

  const calculateTotalAmount =()=>{
    const totalAmount=subtotal+subtotal*0.1+15;
    return totalAmount
  }
  const calculateTaxAmount = ()=>{
    const taxAmount = subtotal*0.1;
    return taxAmount
  }
  const onApprove =()=>{
    const payload ={
      data:{
        totalOrderAmount:billAmount,
        username:username,
        email:email,
        phone,phone,
        zip:zip,
        address:address,
        OrderItemList:cartItemList,
        userId:user.id
      }
    }
    console.log('Payload',payload)
    GlobalApi.createOrder(payload,jwt).then(resp=>{
      console.log(resp)
      toast.success('Order Placed Successfully')
   
      
     
    },(e)=>{
      toast.error('Something Went Wrong.')
    })
    router.replace('/order-confirmation')
  }

  
  return (
    
    <div className=''>
    <h2 className='p-3 bg-primary text-xl font-bold text-center text-white'>Checkout</h2>
    <div className='p-5 px-5 md:px-10 grid grid-cols-1 md:grid-cols-3 py-8'>
        <div className='md:col-span-2 mx-20'>
            <h2 className='font-bold text-3xl'>Billing Details</h2>
            <div className='grid grid-cols-2 gap-10 mt-3'>
                <Input placeholder='Name' onChange={(e)=>setUsername(e.target.value)}/>
                <Input placeholder='Email' onChange={(e)=>setEmail(e.target.value)} />
            </div>
            <div className='grid grid-cols-2 gap-10 mt-3'>
                <Input placeholder='Phone' onChange={(e)=>setPhone(e.target.value)}/>
                <Input placeholder='Zip'onChange={(e)=>setZip(e.target.value)} />
            </div>
            <div className=' mt-3'>
                <Input placeholder='Address'onChange={(e)=>setAddress(e.target.value)} />

            </div>
        </div>
        <div className='mx-10 border'>
            <h2 className='p-3 bg-gray-200 font-bold text-center'>Total Cart ({totalCartItem}) </h2>
            <div className='p-4 flex flex-col gap-4'>
                <h2 className='font-bold flex justify-between'>Subtotal : <span>₹{subtotal}</span></h2>
                <hr></hr>
                <h2 className='flex justify-between'>Delivery : <span>₹15.00</span></h2>
                <h2 className='flex justify-between'>Tax (10%) : <span>₹{calculateTaxAmount()}</span></h2>
                <hr></hr>
                <h2 className='font-bold flex justify-between'>Total : <span>₹{calculateTotalAmount()}</span></h2>
                <Button className='gap-3' onClick={()=>onApprove()} disabled={!(username && email && address && zip)} >Payment <CreditCardIcon /> </Button>
               
            
            </div>
        </div>
    </div>

</div>
  )
}

export default Checkout

