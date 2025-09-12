import Footer from "./shared/Footer";
import NavBar from "./shared/Navbar";

function Home(){
    return(
        <div>
            <NavBar />
            <div className="text-danger">
                To Do Content
            </div>
            <Footer />
        </div>
    )
}

export default Home;