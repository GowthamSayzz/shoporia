import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Product from './Product';

function Search() {

    let searchKeyword = '';
    let queryParams = new URLSearchParams(window.location.search);
    searchKeyword = queryParams.get('keyword');

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);           // stores API categories
    const [selectedCategories, setSelectedCategories] = useState([]);

    useEffect(() => {
        // const getProductsData = async () => {
        //     //let apiResponse = await axios.get('https://dummyjson.com/products/search?q=' + searchKeyword);
        //     let apiResponse = await axios.get('https://dummyjson.com/products/search?q=phone');
        //     console.log("Products Data", apiResponse.data);
        //     setProducts(apiResponse.data.products);
        // }
        // getProductsData();

        const getAllProducts = async () => {
            let apiResponse = await axios.get('https://dummyjson.com/products/?limit=0');
            setProducts(apiResponse.data.products);
        }
        getAllProducts();
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get(
                "https://api.escuelajs.co/api/v1/categories"
            );
            setCategories(response.data); // store categories in state
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    // Handler to toggle checkbox selection
    const handleCheckboxChange = (categoryName) => {
        setSelectedCategories((prev) =>
            prev.includes(categoryName)
                ? prev.filter((c) => c !== categoryName) // remove if unchecked
                : [...prev, categoryName]                // add if checked
        );
    };

    return (
        <div>
            <Navbar />
            <div className='container-fluid shoporia-mt'>
                <div className='row mt-4'>
                    <div className='col-3'>
                        <div className='card card-body'>
                            <div className='card-title'>
                                <h5 className='fs-5'>Category</h5>
                            </div>
                            {
                                categories.map((category) => (
                                    <label key={category.id} style={{ marginRight: "15px" }}>
                                        <input
                                            type="checkbox"
                                            checked={selectedCategories.includes(category.name)}
                                            onChange={() => handleCheckboxChange(category.name)}
                                            className='me-2'
                                        />
                                        {category.name}
                                    </label>
                                ))
                            }
                            <div style={{ marginTop: "20px" }}>
                                <h4>Selected Categories:</h4>
                                {selectedCategories.length > 0
                                    ? selectedCategories.join(", ")
                                    : "None"}
                            </div>
                        </div>
                    </div>
                    <div className='col-6'>
                        {
                            products.map((product, i) => (
                                <Product data={product} key={i} />
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