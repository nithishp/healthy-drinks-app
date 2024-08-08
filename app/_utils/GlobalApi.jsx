const {default:axios} = require('axios')

const axiosClient = axios.create({
    baseURL: 'http://localhost:8082/api',
});

 const getCategories =  () => axiosClient.get('/categories?populate=*');
 const getSliders = () => axiosClient.get('/sliders?populate=*').then(resp=>{return resp.data.data})
 const getCategoryList = () => axiosClient.get('/categories?populate=*').then(resp=>{return resp.data.data})
const getAllProducts = () =>axiosClient.get('/products?populate=*').then(resp=>{return resp.data.data})
const getProductsByCategories = (category) =>axiosClient.get('/products?filters[categories][name][$in]='+category+'&populate=*').then(resp => {return resp.data.data})
const registerUser = (username,email,password) => axiosClient.post('/auth/local/register',{
    username:username,
    email:email,
    password:password,

})
const signIn = (email,password) => axiosClient.post('/auth/local',{
    identifier:email,
    password:password
})
const addToCart=(data,jwt)=>axiosClient.post('/carts',data,{
     headers:{
        Authorization:'Bearer '+jwt
     }
});

const getCartItems = (userId,jwt) => axiosClient.get('/carts?filters[userId][$eq]='+userId+'&[populate][products][populate][images][populate][0]=url',{
    headers:{
        Authorization:'Bearer '+jwt
     }
}).then(resp=>{
    const data = resp.data.data
    const cartItemsList = data.map((item,index)=>(
        {
            
        name:item.attributes.products?.data[0].attributes.name,
        quantity:item.attributes.quantity,
        amount:item.attributes.amount,
        image:item.attributes.products?.data[0].attributes.images.data[0].attributes.url,
        actualPrice:item.attributes.products?.data[0].attributes.mrp,
        id:item.id,
        product:item.attributes.products?.data[0].id,
        to:item.attributes.to,
        from:item.attributes.from

        }
    ))
    console.log("GetCartItems :",cartItemsList)
    return cartItemsList
})

const deleteCartItem=(id,jwt)=>axiosClient.delete('/carts/'+id,{
    headers:{
        Authorization:'Bearer '+jwt
     }
})

const createOrder =(data,jwt)=>axiosClient.post('/orders',data,{
    headers:{
        Authorization:'Bearer '+jwt
     }
})

const getMyOrder=(userId,jwt)=>axiosClient.get('/orders?filters[userId][$eq]='+userId+'&populate[OrderItemList][populate][product][populate][images]=url',{
    headers:{
        Authorization:'Bearer '+jwt
     }
})
.then(resp=>{
    const responce=resp.data.data;
    console.log("GetMyOrder",responce)
    const orderList=responce.map(item=>({
        id:item.id, 
        totalOrderAmount:item.attributes.totalOrderAmount,
        OrderItemList:item.attributes.OrderItemList,
        createdAt:item.attributes.createdAt,
        status:item.attributes.status
    }));

    return orderList;
})
export default{
    getCategories,
    getSliders,
    getCategoryList,
    getAllProducts,
    getProductsByCategories,
    registerUser,
    signIn,
    addToCart,
    getCartItems,
    deleteCartItem,
    createOrder,
    getMyOrder
}