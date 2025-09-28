import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import { SideBySideMagnifier } from "react-image-magnifiers";
import { ToastContainer, toast } from "react-toastify";
import { getJWTToken, getLoggedInUserId, invalidSession } from "../Utils/utils";
import { getProductByIdAPI, getOtherProductsAPI, getAllProductsAPI } from '../Services/productsService';
import { getCartByUserId, addtoCartByUserId } from '../Services/cartServices';
import productReturn from './Images/product-return.png';
import freeDelivery from './Images/free-delivery.png';
import secure from './Images/secure.png';
import emi from './Images/EMI.png';
import unknownUser from './Images/unknowunuser.png';

function SingleProduct() {

    const { productId } = useParams();
    const [productData, setProductData] = useState(null);
    const [similarProducts, setSimilarProducts] = useState([]);

    const [mainImage, setMainImage] = useState("");
    const [productqty, setQty] = useState(1);

    const [getCart, setGetcart] = useState();
    const [breadcrumb, setBreadcrumb] = useState([]);

    const originalPrice = productData?.price; // 36999.99
    const discount = productData?.discountPercentage; // 16.44

    // Calculate discounted price
    const discountedPrice = (originalPrice * (100 - discount)) / 100;

    // Optionally, round to 2 decimal places
    const finalPrice = discountedPrice.toFixed(2);


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

        const breadCrumbFlow = async () => {
            try {
                let apiResponse = await getAllProductsAPI();
                const products = apiResponse.data.products;
                if (!products || products.length === 0) return;
                const product = products.find(p => p.id === parseInt(productId));
                if (!product) return;
                const breadCrumbData = [
                    "Home",
                    //product.category,
                    ...(product.tags || []),
                    product.brand,
                    //product.title
                ].filter(Boolean);

                setBreadcrumb(breadCrumbData);
            } catch (error) {
                console.error(error);
            }
        }

        getproductData();
        breadCrumbFlow();
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
            const shuffleProducts = apiResponse.data.products.sort(() => 0.5 - Math.random());
            setSimilarProducts(shuffleProducts);
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
        <div className='d-flex flex-column min-vh-100'>
            <Navbar />
            <div className='container shoporia-mt flex-grow-1'>
                <div className='row mt-4'>
                    <div className="col-12 col-md-5 mb-4 mb-md-0">
                        <div className="row">
                            {/* Left column - Thumbnails */}
                            <div className="col-2 d-flex flex-column align-items-start">
                                {productData?.images.map((image, i) => (
                                    <div key={i} className="mb-2">
                                        <img
                                            src={image}
                                            className="img-thumbnail shoporia-pointer img-fluid"
                                            onMouseOver={() => setMainImage(image)}
                                            alt="image-shoporia-cursor"
                                            style={{ maxwidth: "60px", height: "auto", objectFit: "cover" }} // adjust size
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
                                        style={{ maxwidth: "300px", height: "auto" }}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <p className="breadcrumb text-capitalize">
                            {breadcrumb.map((item, index) => (
                                <span key={index}>
                                    {item}{" "}
                                    {index < breadcrumb.length - 1 && <i className="bi bi-caret-right-fill mx-1"></i>}
                                </span>
                            ))}
                        </p>
                        {productData != null && <h3>{productData.title}</h3>}
                        <div>
                            <span className="badge rounded-pill text-bg-success px-2 py-1 small mb-2">{productData?.rating} <i className="bi bi-star-fill"></i></span>
                            <h6 className="ms-1">
                                {productData &&
                                    `${productData.reviews.length} Reviews & ${(productData.reviews.reduce((sum, r) => sum + r.rating, 0) / productData.reviews.length).toFixed(1)
                                    } Ratings`}
                            </h6>
                            {/* <h3><i className="i bi-currency-rupee fs-4"></i>{productData != null && productData.price}</h3> */}
                            <div>
                                <span className="text-muted text-decoration-line-through me-3 fs-4">₹{originalPrice?.toLocaleString()}</span>
                                <span className="fw-bold text-danger fs-4">₹{finalPrice?.toLocaleString()}</span>
                                <span className="ms-2 badge bg-success fs-6">{discount}% OFF</span>
                            </div>
                            <h3 className="fs-5">Available Stock: {productData != null && productData.stock}</h3>
                            <h3 className="fs-5">{productData != null && productData.shippingInformation}</h3>
                            <h3 className="fs-5"><i className="bi bi-truck"></i> {productData != null && productData.returnPolicy}</h3>
                            <h3 className="fs-6">Product Description: {productData != null && productData.description}</h3>
                        </div>
                        <div className="row mt-3">
                            <div className="card border-0">
                                <div className="card-body text-center">
                                    <div className="row">
                                    {[{img: freeDelivery, text: "Free Delivery"},
                                      {img: secure, text: "Secure Payments"},
                                      {img: productReturn, text: "Easy Returns"},
                                      {img: emi, text: "EMI Options"}].map((feature, idx) => (
                                        <div key={idx} className="col-3 product-card">
                                            <img src={feature.img} alt={feature.text} className="img-fluid" style={{ maxHeight: '50px', maxWidth: '50px' }} />
                                            <p className="mt-2 mb-0 small fw-medium">{feature.text}</p>
                                        </div>
                                    ))}
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-3 mt-4 mt-md-0">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Add to Cart</h5>
                                <select className='form-control mt-3' onChange={e => setQty(e.target.value)}>
                                {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
                            </select>
                                <div className="d-grid gap-2 mt-3">
                                    <button className="btn btn-warning" onClick={e => Addtocart()}>Add to cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="container mt-5"> */}
                    <div className="row mt-5">
                        <div className="col-12">
                            <div className="card p-3">
                                <h4>Other Products</h4>
                                <div className="card-body d-flex flex-nowrap overflow-auto">
                                    {
                                        similarProducts.map((similarproductsLoop) => {
                                            if (!similarproductsLoop.thumbnail) return null;

                                            return (
                                                <div key={similarproductsLoop.id} className="m-2 border rounded col-6 col-sm-4 col-md-3 col-lg-2 text-center">
                                                    <img src={similarproductsLoop?.thumbnail}
                                                        alt={similarproductsLoop?.title}
                                                        style={{ maxheight: "150px", objectFit: "contain" }}
                                                        className="img-fluid product-card"
                                                    />
                                                    <h6 className="mt-2">{similarproductsLoop?.title}</h6>
                                                    {/* <h6 className="mt-3 badge text-bg-success"><i className="i bi-star-fill text-sm"></i> {similarproductsLoop?.rating}</h6> */}
                                                    <h6 className="text-center"><i className="i bi-currency-rupee fs-6"></i>{similarproductsLoop?.price}</h6>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                {/* </div> */}
                {/* <div className="container mt-3"> */}
                    <div className="row mt-3">
                        <div className="col-12">
                            <div className="card">
                                <h4 className="ms-3 mt-3">Customers say</h4>
                                <div className="card-body d-grid">
                                    {
                                        productData?.reviews?.map((productReviews, i) => (
                                            <div key={i} className="me-3 mb-3">
                                                <div className="card card-body product-card">
                                                    <h6><img src={unknownUser} className="rounded-circle me-2" alt="unknown user" style={{ height: '30px', width: '30px' }} />{productReviews.reviewerName}</h6>
                                                    <h6>Rating: {"⭐".repeat(productReviews.rating)}</h6>
                                                    <h6>Reviewed in India on {new Date(productReviews.date).toLocaleDateString("en-GB", {
                                                        day: "2-digit",
                                                        month: "short",
                                                        year: "numeric",
                                                    })}</h6>
                                                    <h6>Reviewer Comments: {productReviews.comment}</h6>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                {/* </div> */}
            </div>
            <ToastContainer />
            <Footer />
        </div>
    )
}

export default SingleProduct;