import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import { useEffect, useState } from 'react';
import Product from './Product';
import { toast, ToastContainer } from 'react-toastify';
import { getAllProductsAPI, getAllProductsCategoriesAPI, getAllProductsByCategoryAPI } from '../Services/productsService';
import { ERROR_MESSAGES } from '../Constants/errors';

function Search() {

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    /**
     * !!! RETRIEVES EVERY PRODUCT, CATEGORY AND FILTERS THE PRODUCTS BASED ON USER CATERGORY SELECTION
     */

    useEffect(() => {

        const fetchData = async () => {
            try {
                const productsResponse = await getAllProductsAPI();
                setProducts(productsResponse.data.products);

                const categoriesResponse = await getAllProductsCategoriesAPI();
                setCategories(categoriesResponse.data);

                setFilteredProducts(productsResponse.data.products);
            } catch (error) {
                toast.error(error.message);
            }
        };
        fetchData();
    }, []);

    /**
     * TODO: HANDLES THE CHECKBOX SELECTION CATEGROY AND DISPLAYS THE PRODUCTS DATA
     */

    const handleCheckboxChange = async (categoryName) => {
        setSelectedCategories((prev) =>
            prev.includes(categoryName)
                ? prev.filter((c) => c !== categoryName)
                : [...prev, categoryName]
        );
        let tempCategories = [...selectedCategories]
        if (tempCategories.includes(categoryName)) {
            tempCategories = tempCategories.filter((c) => c !== categoryName)
        } else {
            tempCategories.push(categoryName)
        }
        let tempData = [];
        if (tempCategories.length === 0) {
            tempData = [...products];
        } else {
            tempData = await getCategoryData(tempCategories)
        }
        setFilteredProducts([...tempData])
    };

    const getCategoryData = async (tempCategories) => {
        let tempData = []
        for (let cat of tempCategories) {
            let apiResponse = await getAllProductsByCategoryAPI(cat.toLowerCase());
            tempData = [...tempData, ...apiResponse?.data?.products]
        }
        return [...tempData];
    }

    return (
        <div className='d-flex flex-column min-vh-100'>
            <Navbar />
            <div className='container-fluid shoporia-mt flex-grow-1'>
                <div className='row mt-4'>
                    <div className='col-12 col-md-3 mb-4 mb-md-0'>

                        {/* CATEGORY'S LAYOUT */}

                        <div className='card card-body'>
                            <div className='card-title'>
                                <h5 className='fs-5'>Category</h5>
                            </div>
                            {
                                categories.map((category) => (
                                    <div key={category.name} className='form-check'>
                                        <input
                                            type="checkbox"
                                            checked={selectedCategories.includes(category.name)}
                                            onChange={() => handleCheckboxChange(category.name)}
                                            className='form-check-input me-2'
                                        />
                                        <label htmlFor={`cat-${category.name}`} className='form-check-label'>
                                    {category.name}
                                </label>
                                    </div>
                                ))
                            }

                            {/* DISPLAYS THE SELECTED CATEGORY'S INFORMATION */}

                            <div style={{ marginTop: "20px" }}>
                                <h4>Selected Categories:</h4>
                                {selectedCategories.length > 0
                                    ? selectedCategories.join(", ")
                                    : "None"}
                            </div>
                        </div>
                    </div>

                    {/* LOOPS EACH AND EVERY PRODUCT TO DISPLAY ON THE SCREEN */}

                    <div className='col-6'>
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product, i) => (
                                <div key={i}>
                                    <Product data={product} />
                                </div>
                            ))
                        ) : (
                            <p>{ERROR_MESSAGES.PRODUCTS.NO_PRODUCTS_FOUND}</p>
                        )}
                    </div>
                </div>
            </div>
            <ToastContainer />
            <Footer />
        </div>
    )

}

export default Search;