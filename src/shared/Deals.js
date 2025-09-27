import progress from '../Temp Files/progress.gif';
import NavBar from './Navbar';
import Footer from './Footer';

function Deals() {
    return (
        <div>
            <NavBar />
            <div className='container shoporia-mt'>
                <div className='d-flex flex-column justify-content-center align-items-center text-center' style={{ minHeight: "70vh" }}>
                    <img src={progress} alt="in-progress" className='img-fluid' style={{ height: 'auto', maxwidth: '300px' }} />
                    <p className='fw-bold mt-3'>Page Development In Progress. Stay Tuned!!</p>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Deals;