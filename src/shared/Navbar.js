import { useEffect, useState } from 'react';
import { checkUserLoginStatus } from '../Utils/utils';
import LogoNoBg from './Images/Shoporia NoBg Logo.png';
import { Link } from 'react-router-dom';
import { searchsuggestionsAPI } from '../Services/searchServices';
import { toast, ToastContainer } from 'react-toastify';
import { getCartByUserId } from '../Services/cartServices';
import { getLoggedInUserId, getJWTToken } from '../Utils/utils';

function NavBar() {

    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [userFirstName, setuserFirstName] = useState('');
    const [fetchCartItems, setFetchCartItems] = useState(0);

    let userId = getLoggedInUserId();
    let token = getJWTToken();

    const [showSearchDropdown, setSearchDropdown] = useState(false);
    const [searchSuggestionList, setsearchSuggestionList] = useState("");

    useEffect(() => {
        const storedName = localStorage.getItem('userName');
        setuserFirstName(storedName);
        let isUserLoggedIn = checkUserLoginStatus();
        setIsUserLoggedIn(isUserLoggedIn);

        const fetchCart = async () => {
            if (userId && token) {
                try {
                    const apiResponse = await getCartByUserId(userId);
                    if(apiResponse.data.carts.length > 0){
                        setFetchCartItems(apiResponse.data.carts[0].totalProducts);
                    }else{
                        setFetchCartItems(0);
                    }
                } catch (error) {
                    console.error('Error fetching cart:', error);
                }
            } else {
                setFetchCartItems(0);
            }
        };
        fetchCart();
    }, [userId, token]);

    const logoutUser = () => {
        localStorage.clear();
        window.location.href = '/';
    }

    const searchHandler = async (e) => {
        let keyword = e.target.value;
        if (keyword.length > 0) {
            try {
                let apiResponse = await searchsuggestionsAPI(keyword);
                let suggestionList = apiResponse.data.products;
                let suggestionValues = suggestionList.map(searchSuggestion => {
                    return searchSuggestion.title
                });
                setsearchSuggestionList(suggestionValues);
                setSearchDropdown(true);
            } catch (error) {
                toast.error('Unable to process your request', error.message);
            }
        }
    }

    const handleSuggestionClick = (e) => {
        window.location.href = '/product-search?keyword=' + e;
    }
    const [isNavShowing, setIsNavShowing] = useState(false);
    const handleNavToggle = () => {
        setIsNavShowing(!isNavShowing);
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
                <div className="container d-flex justify-content-between align-items-center">

                    {/* ---------- Left Side Logo ---------- */}

                    <Link to='/' className='navbar-brand'><img src={LogoNoBg} alt="Logo" style={{ width: "170px", height: "50px" }} /></Link>

                    {/* ---------- Home Screen Search Bar ---------- */}
                    <div className="mt-1 ms-5 d-none d-lg-flex flex-grow-1 justify-content-center align-items-center">
                        <div className="input-group w-100" style={{ maxWidth: "500px" }}>
                            <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">All</button>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="/">Laptops</a></li>
                                <li><a className="dropdown-item" href="/">Smartphones</a></li>
                                <li><a className="dropdown-item" href="/">Furniture</a></li>
                                <li><a className="dropdown-item" href="/">Sunglasses</a></li>
                            </ul>
                            <input type="text" className="form-control" placeholder='Search Shoporia.in' onChange={e => searchHandler(e)} />
                            <button className="btn btn-outline-secondary" type="button"><i className="bi bi-search"></i></button>
                            {
                                showSearchDropdown === true &&
                                <div className='search-dropdown shadow'>
                                    {
                                        searchSuggestionList.map((searchSuggestionUI, i) => (
                                            <div key={i} className='suggestion-item' onClick={e => handleSuggestionClick(searchSuggestionUI)}>
                                                {searchSuggestionUI}
                                            </div>
                                        ))
                                    }
                                </div>
                            }
                        </div>
                    </div>

                    {/* ---------- Home Screen Menu ---------- */}
                    <button className='navbar-toggler' type='button' onClick={e => handleNavToggle()}>
                        <span className='navbar-toggler-icon'></span>
                    </button>
                    <div className={`collapse navbar-collapse ${isNavShowing ? "show" : ""}`} id='navbarNav'>
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item fs-5"><Link to="/" className="nav-link">Home</Link></li>
                            <li className="nav-item fs-5"><Link to="/product-search" className="nav-link">Products</Link></li>
                            <li className="nav-item fs-5"><Link to="/deals" className="nav-link">Deals</Link></li>
                            <li className="nav-item fs-5"><Link to="/contact" className="nav-link">Contact Us</Link></li>
                            {
                                isUserLoggedIn === true &&
                                <div>
                                    <li className="nav-item fs-5">
                                        <Link to="/cart" className="nav-link">
                                            <span className="position-relative me-2">
                                                <i className="bi bi-cart3"></i>
                                                {fetchCartItems >= 0 && (
                                                    <span className="position-absolute top-1 start-100 translate-middle badge text-bg-danger rounded-pill fw-lighter">
                                                        {fetchCartItems}
                                                    </span>
                                                )}
                                            </span>
                                            Cart
                                        </Link>
                                    </li>
                                </div>
                            }

                            <li className="nav-item ms-2">
                                <div className="dropdown">
                                    <button className="btn btn-secondary dropdown-toggle fs-5" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Hello {userFirstName}
                                    </button>
                                    {
                                        isUserLoggedIn === false &&
                                        <ul className="dropdown-menu">
                                            <li><Link className="dropdown-item mb-1 fs-5" to="/signin"><i className='bi bi-door-open-fill me-2 text-success'></i>Sign In</Link></li>
                                            <li><Link className="dropdown-item mb-1 fs-5" to="/signup"><i className='bi bi-person-plus-fill me-2 text-primary'></i>New Customer? <span className="text-primary">Start here</span></Link></li>
                                        </ul>
                                    }
                                    {
                                        isUserLoggedIn === true &&
                                        <ul className="dropdown-menu">
                                            <li><Link className="dropdown-item mb-1 fs-5" to="/account"><i className='bi bi-person-check-fill me-2 text-primary'></i>Account</Link></li>
                                            <li><Link className="dropdown-item mb-1 fs-5" to="/orders"><i className='bi bi-box-seam-fill me-2 text-danger'></i>My Orders</Link></li>
                                            <li><Link className="dropdown-item mb-1 fs-5" to="/wishlist"><i className='bi bi-heart-fill me-2 text-dark-emphasis'></i>Wishlist</Link></li>
                                            <li><Link className="dropdown-item mb-1 fs-5" to="/help"><i className='bi bi-patch-question-fill me-2 text-warning'></i>Help</Link></li>
                                            <li><Link className="dropdown-item mb-1 fs-5" to='/' onClick={e => logoutUser()}><i className='bi bi-box-arrow-right me-2 text-danger'></i>Logout</Link></li>
                                        </ul>
                                    }
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <ToastContainer />
        </div>
    )
}

export default NavBar;