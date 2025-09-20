function Product({ data }) {

    // function handleClick() {
    //     alert(data.title);
    // }

    return (
        <div className='card mb-4'>
            <div className='row'>
                <div className='col-4'>
                    <a href={"/product/" + data.id} target="_blank" rel="noreferrer">
                        <img src={data.thumbnail} className='img-fluid rounded-start shoporia-pointer p-3' alt='...' />
                    </a>

                </div>
                <div className='col-8'>
                    <div className='card-body'>
                        <a href={"/product/" + data.id} target="_blank" rel="noreferrer">
                            <h5 className='card-title shoporia-pointer'>{data.title}</h5>
                        </a>
                        <div>
                            <h5 className='card-title'><i className="bi bi-currency-rupee"></i>{data.price}</h5>
                        </div>
                        <div>
                            <h5 className='card-title'><i className="bi bi-star-fill"></i>{data.rating}</h5>
                        </div>
                        <div>
                            <h5 className='card-title'><i className="bi bi-bag"></i>{data.stock}</h5>
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