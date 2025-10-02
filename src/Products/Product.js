import { Link } from "react-router-dom";

function Product({ data }) {
    return (
        <div className='card mb-4'>
            {/* DISPLAYS THE WHOLE SHOPORIA PRODUCTS INFORMATION STUFF */}
            <div className='row g-0'>
                <div className='col-12 col-sm-4'>
                    <Link to={"/product/" + data.id} target="_blank" rel="noreferrer">
                        <img src={data.thumbnail} className='img-fluid rounded-start shoporia-pointer p-3' alt='imageThumbnail' />
                    </Link>
                </div>
                <div className='col-12 col-sm-8'>
                    <div className='card-body'>
                        <Link to={"/product/" + data.id} target="_blank" rel="noreferrer" className="text-decoration-none">
                            <h5 className='card-title text-dark'>{data.title}</h5>
                        </Link>
                        <div className='d-flex flex-wrap gap-2 align-items-center mb-2'>
                            <h5 className='card-title'><i className="bi bi-currency-rupee"></i>{data.price}</h5>
                        </div>
                        <div className='d-flex flex-wrap gap-2 align-items-center mb-2'>
                            <h5 className='card-title badge text-bg-success'><i className="bi bi-star-fill"></i> {data.rating}</h5>
                        </div>
                        <div className='d-flex flex-wrap gap-2 align-items-center mb-2'>
                            <h5 className='card-title'><i className="bi bi-bag"></i> {data.stock}</h5>
                        </div>

                        {/* BUTTON TO ADD THE PRODUCT INTO THE CART */}

                        <div className="mt-2">
                            <button className='btn btn-warning w-100'>Add to cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product;