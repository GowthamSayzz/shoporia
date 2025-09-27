import progress from '../Temp Files/progress.gif';
import NavBar from '../shared/Navbar';
import Footer from '../shared/Footer';

function MyOrders() {
    return (
        <div>
            <NavBar />
            <div className='container shoporia-mt'>
                <div className='text-center'>
                    <img src={progress} alt="in-progress" style={{ height: '300px', width: '300px' }} />
                    <p className='fw-bold mt-2'>Page Development In Progress. Stay Tuned!!</p>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default MyOrders;