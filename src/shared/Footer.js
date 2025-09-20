import { Link } from 'react-router-dom';

function Footer() {
    return (
        <div className="container-fluid bg-black mt-5">
            <div className="row">
                <div className="col-2 mt-5 text-light">
                    <h5>About</h5>
                    <p>
                        <Link className="dropdown-item" to="/contact-us">Contact Us</Link>
                        <Link className="dropdown-item" to="/about-us">About Us</Link>
                        <Link className="dropdown-item" to="/shoporia-stories">Shoporia Stories</Link>
                        <Link className="dropdown-item" to="/press">Press</Link>
                        <Link className="dropdown-item" to="/corporate-information">Corporate Information</Link>
                    </p>
                </div>
                <div className="col-2 mt-5 text-light">
                    <h5>Group Companies</h5>
                    <p>
                        <Link className="dropdown-item" to="/shoptra">Shoptra</Link>
                        <Link className="dropdown-item" to="/shoptrip">ShopTrip</Link>
                    </p>
                </div>
                <div className="col-2 mt-5 text-light">
                    <h5>Help</h5>
                    <p>
                        <Link className="dropdown-item" to="/payments">Payments</Link>
                        <Link className="dropdown-item" to="/shipping">Shipping</Link>
                        <Link className="dropdown-item" to="/cancellation-returns">Cancellation & Returns</Link>
                        <Link className="dropdown-item" to="/faq">FAQ</Link>
                    </p>
                </div>
                <div className="col-2 mt-5 text-light">
                    <h5>Consumer Policy</h5>
                    <p>
                        <Link className="dropdown-item" to="/cancelletion-returns">Cancellation & Returns</Link>
                        <Link className="dropdown-item" to="/terms-of-use">Terms Of Use</Link>
                        <Link className="dropdown-item" to="/security">Security</Link>
                        <Link className="dropdown-item" to="/privacy">Privacy</Link>
                        <Link className="dropdown-item" to="/sitemap">Sitemap</Link>
                        <Link className="dropdown-item" to="/grievance-redressal">Grievance Redressal</Link>
                        <Link className="dropdown-item" to="/epr-compilance">EPR Compilance</Link>
                    </p>
                </div>
                <div className="col-2 mt-5 text-light">
                    <h5>Mail Us</h5>
                    <p>
                        Shoporia Private Limited,
                        Embassy Tech Village,
                        Outer Ring Road,
                        Bengaluru, 560103, <br />
                        Karnataka, India
                    </p>
                </div>
                <div className="col-2 mt-5 text-light">
                    <h5>Registered Office Address</h5>
                    <p>
                        Shoporia Private Limited,
                        Embassy Tech Village,
                        Outer Ring Road,
                        Bengaluru, 560103, <br />
                        Karnataka, India
                        CIN: KVG51109KA2025PTC824763
                        Telephone: 044-12345678 / 044-87654321
                    </p>
                </div>
            </div>
            <hr />
            <div className='container'>
                <div className='row'>
                    <div className='col-2 text-light mb-5'>
                        <i className="bi bi-cart-check-fill"></i> Become a Seller
                    </div>
                    <div className='col-2 text-light mb-5'>
                        <i className="bi bi-badge-ad"></i> Advertise
                    </div>
                    <div className='col-2 text-light mb-5'>
                        <i className="bi bi-gift"></i> Gift Cards
                    </div>
                    <div className='col-2 text-light mb-5'>
                        <i className="bi bi-question-circle"></i> Help center
                    </div>
                    <div className='col-2 text-light mb-5'>
                        &copy; 2025 Shoporia Pvt Ltd
                    </div>
                    <div className='col-2 mb-5'>
                        <img src='https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/payment-method-c454fb.svg' alt='credit-debit-cards' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;