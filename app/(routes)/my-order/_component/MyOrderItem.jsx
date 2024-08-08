import Image from 'next/image'
import React from 'react'
import moment from "moment";
function MyOrderItem({orderItem}) {
  const fromDate = orderItem?.from ? moment(orderItem.from).format("DD/MMM/yyyy") : null;
  const toDate = orderItem?.to ? moment(orderItem.to).format("DD/MMM/yyyy") : null;
  return (
    <div className='w-full'>
    
    <div className='flex flex-wrap gap-10  mt-3 items-center'>
        <Image src={orderItem.product.data.attributes.images.data[0].attributes.url}
        width={80}
        height={80}
        alt='image'
        className='bg-gray-100 p-5 rounded-md border'
        />
        <div className=''>
            <h2>{orderItem.product.data.attributes.name}</h2>
            <h2>Item Price: {orderItem.product.data.attributes.mrp}</h2>
        </div>
        <h2 className=''>Quantity:{orderItem.quantity}</h2>
        <h2>Price:{orderItem.amount}</h2>
        <h2>Delivery Date : {toDate ? `${fromDate} - ${toDate}` : fromDate}</h2>
       

    </div>
    <hr className='mt-3'></hr>
    </div>
  )
}

export default MyOrderItem