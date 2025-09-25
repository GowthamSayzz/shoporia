import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import { SideBySideMagnifier } from "react-image-magnifiers";
import { ToastContainer, toast } from "react-toastify";
import { getJWTToken, getLoggedInUserId, invalidSession } from "../Utils/utils";
import { getProductByIdAPI, getOtherProductsAPI } from '../Services/productsService';
import { getCartByUserId, addtoCartByUserId } from '../Services/cartServices';
import { Link } from "react-router-dom";

function SingleProduct() {

    const { productId } = useParams();
    const [productData, setProductData] = useState(null);
    const [similarProducts, setSimilarProducts] = useState([]);

    const [mainImage, setMainImage] = useState("");
    const [productqty, setQty] = useState(1);

    const [getCart, setGetcart] = useState();

    useEffect(() => {
        let userId = getLoggedInUserId();
        let token = getJWTToken();
        if (!userId && token != null) {
            loadCart();
        }

        //Loads the data when product screen loads
        const getproductData = async () => {
            try {
                let apiResponse = await getProductByIdAPI(productId);
                setProductData({ ...apiResponse.data });
                setMainImage(apiResponse.data.images[0]);
            } catch (error) {
                toast.error(error.message);
            }
        }
        getproductData();

        getSimilarProducts();
    }, [productId]);

    const loadCart = async () => {
        try {
            let userId = getLoggedInUserId();
            let apiResponse = await getCartByUserId(userId);
            const carts = apiResponse.data?.carts || [];

            const cart = carts[0] || { products: [] };

            setGetcart(cart);
            return cart;
        } catch (error) {
            toast.error(error.message);
        }
    }

    //For Other Products tab
    const getSimilarProducts = async () => {
        try {
            let apiResponse = await getOtherProductsAPI();
            setSimilarProducts(apiResponse.data.products);
        } catch (error) {
            toast.error(error.message);
        }
    }

    const Addtocart = async () => {
        try {
            const userId = getLoggedInUserId();
            const token = getJWTToken();

            if (userId !== null && token !== null) {
                const cart = await loadCart();
                const existingCart = cart?.products || [];

                if (productqty > productData.stock) {
                    toast.error('Product is out of stock');
                    return;
                }

                const index = existingCart.findIndex((p) => p.id === productId);
                if (index > -1) {
                    if (existingCart[index].quantity + productqty > productData.stock) {
                        toast.error(`Cannot add more than available stock (${productData.stock})`);
                        return;
                    }
                    existingCart[index].quantity += productqty;
                } else {
                    existingCart.push({ id: productId, quantity: productqty });
                }

                // Send updated cart to backend
                const addResponse = await addtoCartByUserId({
                    userId,
                    products: existingCart
                });
                if (addResponse.status === 201) {
                    toast.success("Added to cart");
                    setGetcart({ ...getCart, products: existingCart });
                } else {
                    toast.error("Unable to add item to cart");
                }
            } else if ((userId !== null && token === null) || (userId === null && token !== null)) {
                toast.error('Invalid Session. Please Login Again');
                invalidSession();
            } else {
                toast.error('Login Needed');
                invalidSession();
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <div>
            <Navbar />
            <div className='container shoporia-mt'>
                <div className='row mt-4'>
                    <div className="col-5">
                        <div className="row">
                            {/* Left column - Thumbnails */}
                            <div className="col-2 d-flex flex-column align-items-start">
                                {productData?.images.map((image, i) => (
                                    <div key={i} className="mb-2">
                                        <img
                                            src={image}
                                            className="img-thumbnail shoporia-pointer"
                                            onMouseOver={() => setMainImage(image)}
                                            alt="image-shoporia-cursor"
                                            style={{ width: "60px", height: "60px", objectFit: "cover" }} // adjust size
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Right column - Main Image */}
                            <div className="col-10 d-flex justify-content-center">
                                {mainImage && (
                                    <SideBySideMagnifier
                                        imageSrc={mainImage}
                                        alwaysInPlace={false}
                                        fillAvailableSpace={false}
                                        zoomPosition="right"
                                        zoomContainerBorder="1px solid #ccc"
                                        zoomContainerBoxShadow="0 4px 8px rgba(0, 0, 0, 1)"
                                        style={{ width: "300px", height: "300px" }}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        {productData != null && <h3>{productData.title}</h3>}
                        <div>
                            <h5 className="fs-6 badge text-bg-success">{productData != null && productData.rating} <i className="i bi-star-fill"></i></h5>
                            <h3><i className="i bi-currency-rupee fs-4"></i>{productData != null && productData.price}</h3>
                            <h3 className="fs-5">In Stock: {productData != null && productData.stock}</h3>
                            <h3 className="fs-5">{productData != null && productData.shippingInformation}</h3>
                            <h3 className="fs-5"><i className="bi bi-truck"></i> {productData != null && productData.returnPolicy}</h3>
                            <h3 className="fs-6">Product Description: {productData != null && productData.description}</h3>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Add to Cart</h5>
                                <select className="form-control mt-3" onChange={e => setQty(e.target.value)}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                                <div className="d-grid gap-2 mt-3">
                                    <button className="btn btn-warning" onClick={e => Addtocart()}>Add to cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-12">
                            <div className="card p-3">
                                <h4>Other Products</h4>
                                <hr />
                                <div className="card-body d-flex flex-nowrap overflow-auto">
                                    {
                                        similarProducts.map((similarproductsLoop) => {
                                            if (!similarproductsLoop.thumbnail) return null;

                                            return (
                                                <div key={similarproductsLoop.id} className="me-3">
                                                    <Link to={`/products/${similarproductsLoop.id}`} target="_blank" rel="noopener noreferrer">
                                                        <img src={similarproductsLoop?.thumbnail}
                                                            alt={similarproductsLoop?.title}
                                                            style={{ width: "150px", height: "150px", objectFit: "contain" }}
                                                        />
                                                    </Link>
                                                    <h6 className="mt-3">{similarproductsLoop?.title}</h6>
                                                    <h6 className="mt-3 badge text-bg-success"><i className="i bi-star-fill text-sm"></i> {similarproductsLoop?.rating}</h6>
                                                    <h6><i className="i bi-currency-rupee fs-6"></i>{similarproductsLoop?.price}</h6>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
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

export default SingleProduct;