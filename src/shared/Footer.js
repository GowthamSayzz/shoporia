import { Link } from 'react-router-dom';
import cards from './Images/cards.png';

function Footer() {
    return (
        <div className="container-fluid bg-black mt-5">
            <div className="row">
                <div className="col-2 mt-3 text-light">
                    <h5>About</h5>
                    <p>
                        <Link className="dropdown-item" to="/contact-us">Contact Us</Link>
                        <Link className="dropdown-item" to="/about-us">About Us</Link>
                        <Link className="dropdown-item" to="/shoporia-stories">Shoporia Stories</Link>
                        <Link className="dropdown-item" to="/press">Press</Link>
                    </p>
                </div>
                <div className="col-2 mt-3 text-light">
                    <h5>Group Companies</h5>
                    <p>
                        <Link className="dropdown-item" to="/shoptra">Shoptra</Link>
                        <Link className="dropdown-item" to="/shoptrip">ShopTrip</Link>
                    </p>
                </div>
                <div className="col-2 mt-3 text-light">
                    <h5>Help</h5>
                    <p>
                        <Link className="dropdown-item" to="/payments">Payments</Link>
                        <Link className="dropdown-item" to="/shipping">Shipping</Link>
                        <Link className="dropdown-item" to="/cancellation-returns">Cancellation & Returns</Link>
                        <Link className="dropdown-item" to="/faq">FAQ</Link>
                    </p>
                </div>
                <div className="col-2 mt-3 text-light">
                    <h5>Consumer Policy</h5>
                    <p>
                        <Link className="dropdown-item" to="/terms-of-use">Terms Of Use</Link>
                        <Link className="dropdown-item" to="/security">Security</Link>
                        <Link className="dropdown-item" to="/privacy">Privacy</Link>
                        <Link className="dropdown-item" to="/sitemap">Sitemap</Link>
                    </p>
                </div>
                <div className="col-2 mt-3 text-light">
                    <h5>Mail Us</h5>
                    <p>
                        customercare@shoporia.in <br/>
                        Phone : 040-1224546
                    </p>
                </div>
                <div className="col-2 mt-3 text-light">
                    <h5>Office Address</h5>
                    <p>
                        Shoporia Private Limited,
                        Embassy Industrial Tech Corporate Village,
                        Bengaluru, 560103, <br />
                        Karnataka, India.
                    </p>
                </div>
            </div>
            <hr />
            <div className='container'>
                <div className='row justify-content-center align-items-center'>
                    <div className='col-2 text-light mb-5'>
                        <i className="bi bi-cart-check-fill"></i> Become a Seller
                    </div>
                    <div className='col-2 text-light mb-5'>
                        <i className="bi bi-question-circle"></i> Help center
                    </div>
                    <div className='col-2 text-light mb-5'>
                        &copy; 2025 Shoporia Pvt Ltd
                    </div>
                    <div className='col-2 mb-5'>
                        <img src={cards} alt='credit-debit-cards' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;