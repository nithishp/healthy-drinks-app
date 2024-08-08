import GlobalApi from '@/app/_utils/GlobalApi'
import React from 'react'
import TopCategoryList from '../_components/TopCategoryList'
import ProductList from '@/app/_components/ProductList'

const ProductCategory = async({params}) => {
    const categoryList = await GlobalApi.getCategoryList()
    const productsList = await GlobalApi.getProductsByCategories(params.categoryName)
    console.log(productsList,"page.jsx")

    // Decode the category name
    const decodedCategoryName = decodeURIComponent(params.categoryName)

    return (
        <div>
            <h2 className='p-4 bg-primary text-white text-3xl font-semibold text-center'>
                {decodedCategoryName}   
            </h2>
            <TopCategoryList selectedCategory={decodedCategoryName} categoryList={categoryList} />
            <div className='p-5 md:p-10' >
                <ProductList productsList={productsList} />
            </div>
        </div>
    )
}

export default ProductCategory
