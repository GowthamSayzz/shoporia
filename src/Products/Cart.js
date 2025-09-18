import { useEffect, useState } from "react";
import Footer from "../shared/Footer";
import NavBar from "../shared/Navbar";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

function Cart() {

    const [cartData, setCartData] = useState([]);

    /**
     * !!! Increases the product qty's in a cart
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
     * !!! Decrease the product qty's in the cart
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
     * TODO: Updates the cart product qty's and price based on end user cart
     * !!! Updating the cart via API Response
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
     * !!! Calculating the total price and product qty's after adding to the cart
    */

    const calculatetotalPrice = (products) => {
        let totalQtys = 0;
        let totalPrice = 0;

        products.forEach(element => {
            let tempTotalPrice = element.quantity * element.price;
            totalPrice = totalPrice + tempTotalPrice;
            totalQtys = totalQtys + element.quantity;
        });

        console.log(totalQtys, totalPrice);

        return "(" + totalQtys + " items): " + totalPrice;
    }

    /**
     * TODO: delete the total cart products 
     */

    const deleteProduct = (product) => {

    }

    /**
     * TODO: Renders the required cart information (based on logged in user) for the page when it load in browser
     */

    useEffect(() => {
        const getCartData = async () => {
            try {
                let userId = 6; //userId hardcoded due to API limitations
                let apiResponse = await axios.get('https://dummyjson.com/carts/user/' + userId)
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
            <div className="container">
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
                                                                <div>
                                                                    <button className="btn btn-light" onClick={e => qtyDecrease(products, j, cart, i)}><strong> - </strong></button>
                                                                    <span>{products.quantity}</span>
                                                                    <button className="btn btn-light" onClick={e => qtyIncrease(products, j, cart, i)}><strong> + </strong></button>
                                                                    <a href="/" className="card-link" onClick={e => deleteProduct(products)}>Delete</a>
                                                                    <a href="/" className="card-link">Save for later</a>
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
                    <div className="col-4"></div>
                </div>
            </div>
            <ToastContainer />
            <Footer />
        </div>
    )
}

export default Cart;