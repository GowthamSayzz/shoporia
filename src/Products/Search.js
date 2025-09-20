import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Product from './Product';

function Search() {

    let searchKeyword = '';
    let queryParams = new URLSearchParams(window.location.search);
    searchKeyword = queryParams.get('keyword');
    console.log(searchKeyword);

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProductsData = async () => {
            //let apiResponse = await axios.get('https://dummyjson.com/products/search?q=' + searchKeyword);
            let apiResponse = await axios.get('https://dummyjson.com/products/search?q=phone');
            setProducts(apiResponse.data.products);
            console.log(apiResponse.data);
        }
        getProductsData()
    }, [])

    return (
        <div>
            <Navbar />
            <div className='container-fluid shoporia-mt'>
                <div className='row mt-4'>
                    <div className='col-3'>
                        part 1
                    </div>
                    <div className='col-6'>
                        {
                            products.map((product, i) => (
                                <Product data={product} key={i}/>
                            ))
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )

}

export default Search;