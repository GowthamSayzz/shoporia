import { Link } from "react-router-dom";

function Product({ data }) {
    return (
        <div className='card mb-4'>
            <div className='row'>
                <div className='col-4'>
                    <Link to={"/product/" + data.id} target="_blank" rel="noreferrer">
                        <img src={data.thumbnail} className='img-fluid rounded-start shoporia-pointer p-3' alt='imageThumbnail' />
                    </Link>
                </div>
                <div className='col-8'>
                    <div className='card-body'>
                        <Link to={"/product/" + data.id} target="_blank" rel="noreferrer">
                            <h5 className='card-title'>{data.title}</h5>
                        </Link>
                        <div>
                            <h5 className='card-title'><i className="bi bi-currency-rupee"></i>{data.price}</h5>
                        </div>
                        <div>
                            <h5 className='card-title badge text-bg-success'><i className="bi bi-star-fill"></i> {data.rating}</h5>
                        </div>
                        <div>
                            <h5 className='card-title'><i className="bi bi-bag"></i> {data.stock}</h5>
                        </div>
                        <div>
                            <button className='btn btn-warning mt-2'>Add to cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product;