import { useState } from 'react';
import { checkUserLoginStatus } from '../Utils/utils';
import LogoNoBg from './Images/Shoporia NoBg Logo.png';
import { Link } from 'react-router-dom';
import { searchsuggestionsAPI } from '../Services/searchServices';

function NavBar() {

    let isUserLoggedIn = checkUserLoginStatus();

    const logoutUser = () => {
        localStorage.clear();
        window.location.href = '/signin';
    }

    let [showSearchDropdown, setSearchDropdown] = useState(false);
    //let [searchWord, setSearchWord] = useState("");
    let [searchSuggestionList,  setsearchSuggestionList] = useState("");

    const searchHandler = async (e) => {
        let keyword = e.target.value;
        if(keyword.length > 0){
            try{
                let apiResponse = await searchsuggestionsAPI({searchWord: keyword});
                let suggestionList = apiResponse.data.data;
                let suggestionValues = suggestionList.map(searchSuggestion => {
                    return searchSuggestion.value
                });
                setsearchSuggestionList([...suggestionValues]);
                setSearchDropdown(true);
            }catch(error){
                alert("unable to process request");
            }

        }
    }

    const handleSuggestionClick = (e) => {
        console.log(e);
        window.location = '/product-search?keyword=' + e;
    }

    return (
        <div>
            <nav className="navbar bg-body-tertiary navbar-expand-lg">
                <div className="container-fluid">
                    <Link to='/'><img src={LogoNoBg} alt="Logo" style={{ width: "170px", height: "50px" }} /></Link>
                    <div className="input-group ms-5">
                        <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">All</button>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="/">Action before</a></li>
                            <li><a className="dropdown-item" href="/">Another action before</a></li>
                            <li><a className="dropdown-item" href="/">Something else here</a></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><a className="dropdown-item" href="/">Separated link</a></li>
                        </ul>
                        <input type="text" className="form-control" onChange={e => searchHandler(e)} />
                        <button className="btn btn-outline-secondary me-5" type="button"><i className="bi bi-search"></i></button>
                        {
                            showSearchDropdown === true &&
                            <div className='search-dropdown shadow'>
                                {
                                    searchSuggestionList.map((searchSuggestionUI, i) => (
                                        <div key={i} className='suggestion-item' onClick={ e=> handleSuggestionClick(searchSuggestionUI)}>
                                            {searchSuggestionUI}
                                        </div>
                                    ))
                                }
                            </div>
                        }
                    </div>
                    <div className="d-flex">
                        <ul className="navbar-nav">
                            <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
                            <li className="nav-item"><Link to="/product-search" className="nav-link">Products</Link></li>
                            <li className="nav-item"><Link to="/pricing" className="nav-link">Pricing</Link></li>
                            <li className="nav-item"><Link to="/contact" className="nav-link">Contact Us</Link></li>
                            <li className="nav-item">
                                <div className="dropdown">
                                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Hello, User
                                    </button>
                                    {
                                        isUserLoggedIn === false &&
                                        <ul className="dropdown-menu">
                                            <li><Link className="dropdown-item" to="/signin">Sign In</Link></li>
                                            <li><Link className="dropdown-item" to="/signup">New Customer? <span className="text-primary">Start here</span></Link></li>
                                        </ul>
                                    }
                                    {
                                        isUserLoggedIn === true &&
                                        <ul className="dropdown-menu">
                                            <li><Link className="dropdown-item" to="/account">Account</Link></li>
                                            <li><Link className="dropdown-item" to="/cart">Cart</Link></li>
                                            <li><Link className="dropdown-item" to="/addresses">Address</Link></li>
                                            <li><Link className="dropdown-item" to='/' onClick={e => logoutUser()}>Logout</Link></li>
                                        </ul>
                                    }
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavBar;