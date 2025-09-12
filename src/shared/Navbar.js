import { checkUserLoginStatus } from '../Utils/utils';
import LogoNoBg from './Images/Shoporia NoBg Logo.png';

function NavBar() {

    let isUserLoggedIn = checkUserLoginStatus();

    const logoutUser = () => {
        localStorage.clear();
        window.location.href = '/signin';
    }

    return (
        <div>
            <nav className="navbar bg-body-tertiary navbar-expand-lg">
                <div className="container">
                    <a href='/'><img src={LogoNoBg} alt="Logo" style={{ width: "170px", height: "50px" }} /></a>
                    <div className="d-flex">
                        <ul className="navbar-nav">
                            <li className="nav-item"><a href="/" className="nav-link">Home</a></li>
                            <li className="nav-item"><a href="/products" className="nav-link">Products</a></li>
                            <li className="nav-item"><a href="/pricing" className="nav-link">Pricing</a></li>
                            <li className="nav-item"><a href="/contact" className="nav-link">Contact Us</a></li>
                            <li className="nav-item">
                                <div className="dropdown">
                                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Hello, User
                                    </button>
                                    {
                                        isUserLoggedIn === false &&
                                        <ul className="dropdown-menu">
                                            <li><a className="dropdown-item" href="SignIn">Sign In</a></li>
                                            <li><a className="dropdown-item" href="SignUp">New Customer? <span className="text-primary">Start here</span></a></li>
                                        </ul>
                                    }
                                    {
                                        isUserLoggedIn === true &&
                                        <ul className="dropdown-menu">
                                            <li><a className="dropdown-item" href="/">Account</a></li>
                                            <li><a className="dropdown-item" href="/">Cart</a></li>
                                            <li><a className="dropdown-item" href='#' onClick={e=> logoutUser()}>Logout</a></li>
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