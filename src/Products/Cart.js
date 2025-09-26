import { useEffect, useState } from "react";
import Footer from "../shared/Footer";
import NavBar from "../shared/Navbar";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { getLoggedInUserId, timeoutSession } from "../Utils/utils";
import emptyCart from './Images/emptyCart1.png';
import { deleteProductInCart, getCartByUserId } from "../Services/cartServices";

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
        if (newQty > 0) {
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
            console.log(apiResponse.data);
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

    const deleteProduct = async (product) => {
        try {
            console.log(product, 'from delete api');
            let apiResponse = await deleteProductInCart(product.id);
            if (apiResponse.status === 200) {
                setCartData(prev => prev.filter(p => p.id !== product.id));
                toast.success("Product deleted successfully!");
            } else {
                toast.error("Failed to delete product");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    }

    /**
     * !!! DUMMY PAYMENT GATEWAY INITIATION
     */

    const handlePayments = async () => {
        if (cartData[0].totalProducts > 0) {
            toast.success('Order Success');
            timeoutSession();
        } else if (cartData[0].totalProducts === 0) {
            toast.warning('No Products Found');
        } else {
            toast.error('Payment Initiation & Order Failed');
        }
    }

    /**
     * TODO: RENDERS THE REQUIRED CART USER CART INFORMATION & PRODUCT DETAILS
     */

    useEffect(() => {
        const getCartData = async () => {
            try {
                let userId = getLoggedInUserId();
                let apiResponse = await getCartByUserId(userId);
                setCartData([...apiResponse.data.carts]);
            } catch (error) {
                toast.error(error.message);
            }
        }

        getCartData();

    }, [])
    return (
        <div>
            <NavBar />
            <div className="container shoporia-mt">
                {
                    (cartData === null || cartData.length === 0) && (
                        <div className="text-center">
                            <img src={emptyCart} alt="empty-cart" className="mt-5 mb-3" style={{ height: '300px', width: '300px' }} />
                            <p>Your cart is empty!!</p>
                            <p>Explore our wide selection and find something you like</p>
                        </div>
                    )
                }
                {
                    <div className="row">
                        <div className="col-8">
                            {
                                (cartData.length > 0) && (
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
                                    )))
                            }
                        </div>
                        {
                            (cartData.length > 0) && (
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
                            )
                        }
                    </div>
                }
            </div>
            <ToastContainer autoClose={3000}/>
            <Footer />
        </div>
    )
}

export default Cart;