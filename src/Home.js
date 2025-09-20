import HomeSection from "./Home/HomeSection.js";
import Footer from "./shared/Footer";
import NavBar from "./shared/Navbar";

function Home() {
    return (
        <div>
            <NavBar />
            <HomeSection />
            <Footer />
        </div>
    )
}

export default Home;