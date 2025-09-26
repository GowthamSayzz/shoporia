import axios from 'axios';
import banner1 from './Banners/banner25.png';
import banner2 from './Banners/banner26.jpg';
import banner3 from './Banners/banner36.png';
import banner4 from './Banners/banner28.jpg';
import banner5 from './Banners/banner29.jpg';
import banner6 from './Banners/banner30.jpg';
import banner8 from './Banners/banner8.png';
import banner9 from './Banners/banner15.png';
import banner10 from './Banners/banner16.png';
import banner11 from './Banners/banner17.png';
import banner12 from './Banners/banner18.png';
import banner13 from './Banners/banner19.png';
import banner14 from './Banners/banner20.png';
import banner15 from './Banners/banner21.png';
import banner16 from './Banners/banner22.png';
import banner17 from './Banners/banner23.png';
import banner18 from './Banners/banner24.png';
import banner19 from './Banners/banner39.png';
import banner20 from './Banners/banner40.png';
import banner21 from './Banners/banner42.png';
import banner22 from './Banners/banner43.png';

import { useEffect, useState } from 'react';

function HomeSection() {

    const [getPhones, setGetPhones] = useState([]);

    useEffect(() => {
        getPhoneProducts();
    }, [])

    const getPhoneProducts = async () => {
        let apiResponse = await axios.get('https://dummyjson.com/products/category/smartphones');
        setGetPhones(apiResponse.data.products);
    }

    return (
        <div className="container shoporia-mt">
            <div id="autoCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000" data-bs-pause="false" >
                <div className="carousel-inner" style={{ aspectRatio: "211 / 35" }}>
                    <div className="carousel-item active">
                        <img src={banner1} className="d-block w-100" alt="Slide 1" />
                    </div>
                    <div className="carousel-item">
                        <img src={banner2} className="d-block w-100" alt="Slide 2" />
                    </div>
                    <div className="carousel-item">
                        <img src={banner3} className="d-block w-100" alt="Slide 3" />
                    </div>
                    <div className="carousel-item">
                        <img src={banner4} className="d-block w-100" alt="Slide 4" />
                    </div>
                    <div className="carousel-item">
                        <img src={banner5} className="d-block w-100" alt="Slide 5" />
                    </div>
                    <div className="carousel-item">
                        <img src={banner6} className="d-block w-100" alt="Slide 6" />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#autoCarousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#autoCarousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <div className='container mt-3'>
                <div className='row'>
                    <div className='col-10 shadow'>
                        <div id="phonesCarousel" className="carousel slide" data-bs-interval="3000" data-bs-ride="carousel" data-bs-pause="false">
                            <div className="carousel-inner">
                                {getPhones.reduce((rows, phone, index) => {
                                    const chunkIndex = Math.floor(index / 4);
                                    if (!rows[chunkIndex]) rows[chunkIndex] = [];
                                    rows[chunkIndex].push(phone);
                                    return rows;
                                }, []).map((group, i) => (
                                    <div key={i} className={`carousel-item ${i === 0 ? 'active' : ''}`}>
                                        <div className="d-flex justify-content-center mt-4">
                                            {group.map((phone, j) => (
                                                <div key={j} className="card me-3" style={{ width: '200px' }}>
                                                    <img
                                                        src={phone.thumbnail}
                                                        className="card-img-top pt-3 product-card"
                                                        alt={phone.title}
                                                        style={{ height: '200px', objectFit: 'contain' }}
                                                    />
                                                    <div className="card-body text-center">
                                                        <h6 className="card-title">{phone.title}</h6>
                                                        <h6 className="card-text">
                                                            From <i className="bi bi-currency-rupee"></i>{phone.price}*
                                                        </h6>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#phonesCarousel" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#phonesCarousel" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                    <div className='col-2'>
                        <div className='card-body shadow'>
                            <img src={banner8} alt='image-poster' style={{ height: '335px', width: '205px' }} />
                        </div>
                    </div>
                </div>
            </div>

            <div className='container mt-3 shadow border'>
                <div className='row'>
                    <h6 className='fs-4 mt-3 mb-3'>Featured Products</h6>
                    <div id="brandsCarousel" className="carousel slide" data-bs-interval="3000" data-bs-ride="carousel" data-bs-pause="false">
                        <div className="carousel-inner">
                            <div className="carousel-item active mb-3">
                                <div className="d-flex justify-content-start">
                                    <img src={banner9} className="img-fluid me-2 product-card" style={{ width: '312px' }} alt="brand1" />
                                    <img src={banner10} className="img-fluid me-2 product-card" style={{ width: '312px' }} alt="brand2" />
                                    <img src={banner11} className="img-fluid me-2 product-card" style={{ width: '312px' }} alt="brand3" />
                                    <img src={banner12} className="img-fluid me-2 product-card" style={{ width: '312px' }} alt="brand4" />
                                </div>
                            </div>

                            <div className="carousel-item mb-3">
                                <div className="d-flex justify-content-start">
                                    <img src={banner13} className="img-fluid me-2 product-card" style={{ width: '312px' }} alt="brand1" />
                                    <img src={banner14} className="img-fluid me-2 product-card" style={{ width: '312px' }} alt="brand2" />
                                    <img src={banner15} className="img-fluid me-2 product-card" style={{ width: '312px' }} alt="brand3" />
                                    <img src={banner16} className="img-fluid me-2 product-card" style={{ width: '312px' }} alt="brand4" />
                                </div>
                            </div>

                            <div className="carousel-item mb-3">
                                <div className="d-flex justify-content-start">
                                    <img src={banner17} className="img-fluid me-2 product-card" style={{ width: '312px' }} alt="brand1" />
                                    <img src={banner18} className="img-fluid me-2 product-card" style={{ width: '312px' }} alt="brand1" />
                                    <img src={banner19} className="img-fluid me-2 product-card" style={{ width: '312px' }} alt="brand1" />
                                    <img src={banner20} className="img-fluid me-2 product-card" style={{ width: '312px' }} alt="brand1" />
                                </div>
                            </div>
                        </div>

                        <button className="carousel-control-prev" type="button" data-bs-target="#brandsCarousel" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>

                        <button className="carousel-control-next" type="button" data-bs-target="#brandsCarousel" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className='container mt-3'>
                <div className='row'>
                    <div className='col-6'>
                        <img src={banner21} alt='images' style={{height:'100%', width:'100%'}}/>
                    </div>
                    <div className='col-6'>
                        <img src={banner22} alt='images' style={{height:'100%', width:'100%'}} />
                    </div>
                </div>
            </div>
        </div>
    )

}

export default HomeSection;