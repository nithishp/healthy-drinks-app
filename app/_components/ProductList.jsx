import React from 'react'
import ProductItem from './ProductItem'

const ProductList = ({productsList}) => {

  return (
    <div className='my-4'>
   <h2 className=' text-2xl font-semibold'>Our Products</h2>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 my-4'>
            {productsList.map((product,index) => (
                <ProductItem product={product} />
            ))}
        </div>
    </div>
  )
}

export default ProductList