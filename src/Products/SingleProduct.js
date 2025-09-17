import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import axios from "axios";
import { SideBySideMagnifier } from "react-image-magnifiers";
import { ToastContainer, toast } from "react-toastify";
//import { getLoggedInUserId } from "../Utils/utils";

function SingleProduct() {

    const { productId } = useParams();
    const [productData, setProductData] = useState(null);

    const [mainImage, setMainImage] = useState("");
    const [qty, setQty] = useState(1);

    useEffect(() => {
        const getproductData = async () => {

            let apiResponse = await axios.get('https://dummyjson.com/products/' + productId);
            setProductData({ ...apiResponse.data });
            setMainImage(apiResponse.data.images[0]);
        }
        getproductData();
    }, [productId]);

    const Addtocart = async () => {
        try {
            if (qty <= productData.stock) {
                let userId = 1; // due to API limitations, userId has been hardcoded
                let totalProducts = {
                    id: productId, qty: qty
                }
                let products = [];
                products.push(totalProducts);
                let apiResponse = await axios.post('https://dummyjson.com/carts/add', { userId: userId, products: products });
                console.log(apiResponse);
                if(apiResponse.status === 201){
                    toast.success("Added to cart");
                }else{
                    toast.error("unable to add selected item");
                }
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <div>
            <Navbar />
            <div className='container'>
                <div className='row mt-4'>
                    <div className="col-5">
                        <div className="row">
                            {
                                productData != null &&
                                <div className="row">
                                    {
                                        productData.images.map((image, i) => (
                                            <div className="col-2" key={i}>
                                                <img src={image} className="img-thumbnail shoporia-pointer" onMouseOver={e => setMainImage(image)} alt="image-shoporia-cursor" />
                                            </div>
                                        ))
                                    }
                                    {
                                        productData != null &&
                                        // <img src={mainImage} className="img-fluid" />
                                        <SideBySideMagnifier
                                            imageSrc={mainImage}
                                            alwaysInPlace={false}
                                            fillAvailableSpace={false}
                                            zoomPosition="right"
                                            zoomContainerBorder="1px solid #ccc"
                                            zoomContainerBoxShadow="0 4px 8px rgba(0, 0, 0, 0.3)"
                                            style={{ width: '500px', height: '500px' }}

                                        />
                                    }
                                </div>
                            }
                        </div>
                    </div>
                    <div className="col-4">
                        {productData != null && <h3>{productData.title}</h3>}
                        <div>
                            <h5 className="fs-5"><i className="i bi-star-fill"></i> {productData != null && productData.rating}</h5>
                            <h3><i className="i bi-currency-rupee fs-4"></i>{productData != null && productData.price}</h3>
                            <h3 className="fs-5">In Stock: {productData != null && productData.stock}</h3>
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
                                    <button className="btn btn-warning" onClick={e => Addtocart()}>Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer autoClose={5000} />
            <Footer />
        </div>
    )
}

export default SingleProduct;