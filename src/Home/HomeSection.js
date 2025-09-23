import axios from 'axios';
import banner1 from './Banners/banner5.webp';
import banner2 from './Banners/banner6.webp';
import banner3 from './Banners/banner7.webp';
import banner8 from './Banners/banner8.webp';
import { useEffect, useState } from 'react';

function HomeSection() {

    const [getPhones, setGetPhones] = useState([]);

    useEffect(()=> {
        getPhoneProducts();
    },[])

    const getPhoneProducts = async() => {
        let apiResponse = await axios.get('https://dummyjson.com/products/category/smartphones');
        setGetPhones(apiResponse.data.products);
    }

    return (
        <div className="container shoporia-mt">
            <div id="carouselExampleRide" className="carousel slide" data-bs-ride="true">
                <div className="carousel-inner" style={{aspectRatio: "211 / 35"}}>
                    <div className="carousel-item active">
                        <img src={banner1} className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={banner2} className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={banner3} className="d-block w-100" alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <div className='container mt-3'>
                <div className='row'>
                    <div className='col-10 shadow'>
                        <div className='card-body d-flex flex-nowrap overflow-auto p-4'>
                            {
                                getPhones.map((phones,i) => (
                                    <div key={i}>
                                        <img src={phones.thumbnail} alt='mobile-phones' style={{height:'200px', width:'200px', objectFit:'contain'}}/>
                                        <h6 className='text-center mt-3'>{phones.title}</h6>
                                        <h6 className='text-center mt-1'>From <span><i className="i bi-currency-rupee"></i>{phones.price}*</span></h6>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className='col-2'>
                        <div className='card-body shadow'>
                            <img src={banner8} alt='image-poster' style={{height:'335px', width:'205px'}} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default HomeSection;