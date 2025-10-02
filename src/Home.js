import HomeSection from "./Home/HomeSection.js";
import Footer from "./shared/Footer";
import NavBar from "./shared/Navbar";

function Home() {
    return (
        <div>
            {/* NAVBAR & USER MENU */}
            <NavBar />

            {/* HOME SECTION FOR USER REQUIREMENTS */}
            <HomeSection />

            {/* A QUICK MENU FOR USER FAQ'S */}
            <Footer />
        </div>
    )
}

export default Home;