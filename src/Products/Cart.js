import { useEffect, useState } from "react";
import Footer from "../shared/Footer";
import NavBar from "../shared/Navbar";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import LogoNoBg from '../shared/Images/Shoporia only logo.png';
import { getJWTToken, getLoggedInEmail, getLoggedInUserId, getLoggedInUserName } from "../Utils/utils";

function Cart() {

    const [cartData, setCartData] = useState([]);

    /**
     * !!! INCREASES THE PRODUCT QTY'S IN USER CART
     * 
     * @param {gives product information} product 
     * @param {gives product qty's} j 
     * @param {gives cart information} cart 
     * @param {gives cart total price} i 
     */

    const qtyIncrease = async (product, j, cart, i) => {
        let newQty = product.quantity + 1;
        let tempcartData = [...cartData];

        tempcartData[i]['products'][j].quantity = newQty;
        setCartData([...tempcartData]);

        let apiData = {
            merge: true,
            product: [
                {
                    id: product.id,
                    qty: newQty,

                }
            ]
        }
        updateProductData(apiData);
    }

    /**
     * !!! DECREASE THE PRODUCT QTY'S IN USER CART
     * 
     * @param {gives product information} product 
     * @param {gives product qty's} j 
     * @param {gives cart information} cart 
     * @param {gives cart total price} i 
     */

    const qtyDecrease = async (product, j, cart, i) => {
        let newQty = product.quantity - 1;
        if(newQty > 0){
            let tempcartData = [...cartData];
            tempcartData[i]['products'][j].quantity = newQty;
            setCartData([...tempcartData]);
        }

        let apiData = {
            merge: true,
            product: [
                {
                    id: product.id,
                    qty: newQty,

                }
            ]
        }
        updateProductData(apiData);
    }

    /**
     * TODO: UPDATES THE CART PRODUCT QTY'S AND PRICE BASED ON END USER CART
     * !!! UPDATING THE CART VIA API RESPONSE
    */

    const updateProductData = async (product) => {
        let apiData = {
            merge: true,
            product: [
                {
                    id: product.id,
                    qty: product.quantity,

                }
            ]
        }
        try {
            let apiResponse = await axios.put('https://dummyjson.com/carts/6', apiData);
            console.log(apiResponse.data.data);
        } catch (error) {
            toast.error(error.message);
        }
    }

    /**
     * !!! CALCULATING THE TOTAL PRICE AND PRODUCT QTY'S AFTER ADDDING TO THE CART
    */

    const calculatetotalPrice = (products) => {
        let totalQtys = 0;
        let totalPrice = 0;

        products.forEach(element => {
            let tempTotalPrice = element.quantity * element.price;
            totalPrice = totalPrice + tempTotalPrice;
            totalQtys = totalQtys + element.quantity;
        });
        return "(" + totalQtys + " items): " + totalPrice.toFixed(2);
    }

    /**
     * !!! DELETING OF A PRODUCT FROM THE CART
     */

    const deleteProduct = async(product) => {
        try {
            let apiResponse = await axios.delete(`https://dummyjson.com/products/${product.id}`);
            console.log("DELETE API RESPONSE", apiResponse.data);
            setCartData(prevProducts => prevProducts.filter(p=> p.id !== product.id));
            toast.success("Product deleted successfully!");
        } catch (error) {
            toast.error(error.message);
        }
    }

    /**
     * !!! PAYMENT GATEWAY INITIATION
     */

    const handlePayments = async () => {
        let orderId = 'shoporia_OrderId_dgbHDc42xeJG44';
        let amount = 1000;

        let createOrderAPIData = {
            userId: getLoggedInUserId(),
            token: getJWTToken().replace('Bearer ', ''),
            amount: 100
        }

        try {
            let apiResponse = await axios.post('https://api.softwareschool.co/payments/create-order', createOrderAPIData);
            orderId = apiResponse.data.data.order.id;
            console.log(orderId);
        } catch (error) {
            toast.error(error.message);
        }


        var options = {
            "key": "rzp_live_c785j6XmnPXWle",  /// live: rzp_live_c785j6XmnPXWle  /// test: rzp_test_8gNHxGVGlM9lZR
            "amount": amount,
            "currency": "INR",
            "name": "Shoporia",
            "description": "Test Transaction",
            "image": LogoNoBg,
            "order_id": orderId,
            "handler": async function (response) {
                let orderSuccessAPIData = {
                    userId: getLoggedInUserId(),
                    token: getJWTToken().replace('Bearer ', ''),
                    paymentId: response.razorpay_payment_id,
                    orderId: response.razorpay_order_id,
                    signature: response.razorpay_signature
                }
                let apiResponse = await axios.post('https://api.softwareschool.co/payments/order-success', orderSuccessAPIData);
                console.log(apiResponse.data);
                toast.success('Payment Success');
            },
            "prefill": {
                "name": getLoggedInUserName(),
                "email": getLoggedInEmail(),
                "contact": ""
            }
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.on('payment.failed', async function (response) {
            let failedOrderAPIData = {
                userId: getLoggedInUserId(),
                token: getJWTToken().replace('Bearer ', ''),
                paymentId: response.error.metadata.payment_id,
                orderId: response.error.metadata.order_id,
                error: response.error
            }
            try {
                let apiResponse = await axios.post('https://api.softwareschool.co/payments/order-failed', failedOrderAPIData);
                console.log(apiResponse.data);
                toast.error('Payment Failed');
            } catch (error) {
                toast.error('Payment Failed')
            }
            console.log(response.error.code);
            console.log(response.error.description);
            console.log(response.error.source);
            console.log(response.error.step);
            console.log(response.error.reason);
            console.log(response.error.metadata.order_id);
            console.log(response.error.metadata.payment_id);
        });
        try {
            rzp1.open();
        } catch (error) {
            toast.error(error.message);
        }
    }

    /**
     * TODO: RENDERS THE REQUIRED CART USER CART INFORMATION & PRODUCT DETAILS
     */

    useEffect(() => {
        const getCartData = async () => {
            try {
                let userId = getLoggedInUserId(); //userId hardcoded due to API limitations
                let apiResponse = await axios.get('https://dummyjson.com/carts/user/' + userId)
                setCartData([...apiResponse.data.carts]);
                console.log(apiResponse.data);
            } catch (error) {
                toast.error(error.message);
            }
        }

        getCartData();

        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        }

    }, [])
    return (
        <div>
            <NavBar />
            <div className="container shoporia-mt">
                <div className="row">
                    <div className="col-8">
                        {
                            cartData.map((cart, i) => (
                                <div className="card mb-3 shadow" key={i}>
                                    <div className="card-body">
                                        {
                                            cart.products.map((products, j) => (
                                                <div className="card border-0 mb-3 border-bottom pb-3" key={j}>
                                                    <div className="row">
                                                        <div className="col-2">
                                                            <img src={products.thumbnail} className="img-fluid" alt="product thumbnail" />
                                                        </div>
                                                        <div className="col-8">
                                                            <div className="card-body">
                                                                <h5>{products.title}</h5>
                                                                <div className="d-flex flex-row mt-3">
                                                                    <div className="btn-group me-2 border border-dark">
                                                                        <button className="btn btn-light" onClick={e => qtyDecrease(products, j, cart, i)}><strong> - </strong></button>
                                                                        <span className="m-2">{products.quantity}</span>
                                                                        <button className="btn btn-light" onClick={e => qtyIncrease(products, j, cart, i)}><strong> + </strong></button>
                                                                    </div>
                                                                    <button className="btn btn-danger me-2" onClick={e => deleteProduct(products)}>Delete</button>
                                                                    <button className="btn btn-secondary me-2">Save for later</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-2 text-end">
                                                            {/* <span class="badge rounded-pill text-bg-danger">Limited time deal</span> //badges for limited time deal */}
                                                            <strong><i className="bi bi-currency-rupee fs-6"></i>{products.price}</strong>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                        <div className="text-end">
                                            <strong>Subtotal {calculatetotalPrice(cart.products)}</strong>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="col-4">
                        <div className="shadow card">
                            <div className="card-body">
                                {
                                    cartData.length > 0 &&
                                    <div>
                                        <p>
                                            <strong>Subtotal {calculatetotalPrice(cartData[0].products)}</strong>
                                        </p>
                                        <div className="d-grid gap-2">
                                            <button className="btn btn-warning rounded-pill" type="button" onClick={e => handlePayments()}>Buy Now</button>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
            <Footer />
        </div>
    )
}

export default Cart;