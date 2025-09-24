import { useEffect, useState } from "react";
import Footer from "../shared/Footer";
import NavBar from "../shared/Navbar";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import PersonalInformation from "./PersonalInfoformation";
import { getLoggedInUserId } from "../Utils/utils";
import SavedCards from "./SavedCards";
import { Link } from "react-router-dom";
import ManageAddress from "./ManageAddress";

function Account() {
    const [userName, setUserName] = useState({});
    const [savedCards, setSavedCards] = useState({});
    const [activeTabs, setActiveTabs] = useState('profile');
    const [manageaddress, setManageAddress] = useState({});

    const logoutUser = () => {
        localStorage.clear();
        window.location.href = '/signin';
    }

    useEffect(() => {
        let userId = getLoggedInUserId();
        if (!userId || userId === null) {
            logoutUser();
        }
        const getUserName = async () => {
            let access_token = localStorage.getItem("access_token");
            if (!access_token) {
                localStorage.clear();
                sessionStorage.clear();
                toast.error("Unknown User Detected");
                return setTimeout(() => {
                    window.location.href = "/signin";
                }, 3000);
            }
            try {
                let apiResponse = await axios.get("https://dummyjson.com/users/" + userId,
                    {
                        headers: {
                            Authorization: `Bearer ${access_token}`,
                        },
                    }
                );
                setUserName(apiResponse.data);
                setSavedCards(apiResponse.data.bank);
                console.log(apiResponse.data.address);
                setManageAddress(apiResponse.data.address);
                
            } catch (error) {
                toast.error("Unauthorised Login");
            }
        };
        getUserName();
    }, []);


    return (
        <div>
            <NavBar />
            <div className="container shoporia-mt">
                <div className="row">
                    <div className="col-md-3">
                        <div className="card shadow mb-3">
                            <div className="card-body d-flex">
                                <img
                                    src={userName.image}
                                    alt="userAvatar"
                                    className="rounded-circle"
                                    style={{ width: "100px", height: "100px" }}
                                />
                                <div className="ms-3 mt-2">
                                    <h6 className="text-capitalize">Hello {userName.role}</h6>
                                    <strong className="text-capitalize">{userName?.username}</strong>
                                </div>
                            </div>
                        </div>

                        <div className="card shadow mb-3">
                            <div className="card-body">
                                <div className="mt-1">
                                    <div className="text-uppercase">
                                        <h6 className="text-start fs-5"><i className="bi bi-person fs-4 me-1"></i> Account Settings</h6>
                                    </div>
                                    <div className="text-center account account-div-height" onClick={() => setActiveTabs('profile')}>
                                        <Link className="d-inline-flex pt-1 link-underline link-underline-opacity-0">Profile</Link>
                                    </div>
                                    <div className="account text-center account-div-height" onClick={() => setActiveTabs('manageaddress')}>
                                        <Link className="d-inline-flex pt-1 link-underline link-underline-opacity-0">Manage Addresses</Link>
                                    </div>
                                </div>

                                <hr />

                                <div className="mt-4">
                                    <div className="text-uppercase">
                                        <h6 className="text-start fs-5"><i className="bi bi-wallet2 me-1"></i> Payments</h6>
                                    </div>
                                    <div className="text-center account account-div-height">
                                        <Link to="/profile" className="d-inline-flex pt-1 link-underline link-underline-opacity-0">Gift Cards</Link>
                                    </div>
                                    <div className="account text-center account-div-height">
                                        <Link to="/profile" className="d-inline-flex pt-1 link-underline link-underline-opacity-0">UPI</Link>
                                    </div>
                                    <div className="account text-center account-div-height" onClick={() => setActiveTabs('savedcards')}>
                                        <Link className="d-inline-flex pt-1 link-underline link-underline-opacity-0">Saved Cards</Link>
                                    </div>
                                </div>

                                <hr />

                                <div className="mt-4">
                                    <div className="text-uppercase">
                                        <h6 className="text-start fs-5"><i className="bi bi-file-earmark-person me-1"></i> My Stuff</h6>
                                    </div>
                                    <div className="account text-center account-div-height">
                                        <Link to="/profile" className="d-inline-flex pt-1 link-underline link-underline-opacity-0">My Coupons</Link>
                                    </div>
                                    <div className="account text-center account-div-height">
                                        <Link to="/profile" className="d-inline-flex pt-1 link-underline link-underline-opacity-0">My reviews & Ratings</Link>
                                    </div>
                                    <div className="account text-center account-div-height">
                                        <Link to="/profile" className="d-inline-flex pt-1 link-underline link-underline-opacity-0">All Notifications</Link>
                                    </div>
                                    <div className="account text-center account-div-height">
                                        <Link to="/profile" className="d-inline-flex pt-1 link-underline link-underline-opacity-0">My Wishlist</Link>
                                    </div>
                                </div>

                                <hr />
                                <div className="mt-4">
                                    <h6 className="text-uppercase fs-5" onClick={e => logoutUser()}><i className="bi bi-power me-1"></i> Logout</h6>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-9">
                        <div className="card shadow">
                            <div className="card-body">
                                {activeTabs === 'profile' && <PersonalInformation profiledata={userName} />}
                                {activeTabs === 'savedcards' && <SavedCards savedcardsdata={savedCards} />}
                                {activeTabs === 'manageaddress' && <ManageAddress manageaddressdata={manageaddress} profiledata={userName}/>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
            <Footer />
        </div>
    );
}

export default Account;
