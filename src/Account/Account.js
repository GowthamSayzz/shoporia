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
import AllUsers from "./AllUsers";
import DeleteUser from "./DeleteUser";

function Account() {
    const [userName, setUserName] = useState({});
    const [savedCards, setSavedCards] = useState({});
    const [activeTabs, setActiveTabs] = useState('profile');
    const [manageaddress, setManageAddress] = useState({});
    const [isAdmin, setIsAdmin] = useState('');

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
                setIsAdmin(apiResponse.data.role);
                setSavedCards(apiResponse.data.bank);
                setManageAddress(apiResponse.data.address);

            } catch (error) {
                toast.error("Unauthorised Login");
            }
        };
        getUserName();
    }, []);


    return (
        <div className='d-flex flex-column min-vh-100'>
            <NavBar />
            <div className="container shoporia-mt flex-grow-1">
                <div className="row">
                    <div className="col-12 col-md-3 mb-3 mb-md-0">
                        <div className="card shadow mb-3">
                            <div className="card-body d-flex flex-column flex-md-row align-items-center">
                                <img
                                    src={userName.image}
                                    alt="userAvatar"
                                    className="rounded-circle img-fluid"
                                    style={{ maxwidth: "100px", height: "auto" }}
                                />
                                <div className="mt-2 mt-md-0 ms-md-3 text-center text-md-start">
                                    <h6 className="text-capitalize">Hello {userName.role}</h6>
                                    <strong className="text-capitalize">{userName?.username}</strong>
                                </div>
                            </div>
                        </div>

                        <div className="card shadow mb-3">
                            <div className="card-body">
                                <div className="mb-4">
                                    <h6 className="text-uppercase fs-5"><i className="bi bi-person fs-4 me-1"></i> Account Settings</h6>
                                    <div className="account text-center py-2" onClick={() => setActiveTabs('profile')}>
                                        <Link className="d-inline-flex pt-1 link-underline link-underline-opacity-0">Profile</Link>
                                    </div>
                                    <div className="account text-center py-2" onClick={() => setActiveTabs('manageaddress')}>
                                        <Link className="d-inline-flex pt-1 link-underline link-underline-opacity-0">Manage Addresses</Link>
                                    </div>
                                </div>

                                <hr />

                                <div className="mb-4">
                                    <h6 className="text-uppercase fs-5"><i className="bi bi-wallet2 me-1"></i> Payments</h6>
                                    <div className="account text-center py-2" onClick={() => setActiveTabs('savedcards')}>
                                        <Link className="d-inline-flex pt-1 link-underline link-underline-opacity-0">Saved Cards</Link>
                                    </div>
                                </div>

                                {
                                    isAdmin === 'admin' &&
                                    <div>
                                        <hr/>
                                        <h6 className="text-uppercase fs-5"><i className="bi bi-person-check me-1"></i> Admin Console</h6>
                                        <div className="account text-center py-2" onClick={() =>setActiveTabs('adminrole')}>
                                            <Link className="d-inline-flex pt-1 link-underline link-underline-opacity-0">All Customers</Link>
                                        </div>
                                        <div className="account text-center py-2" onClick={() =>setActiveTabs('userdelete')}>
                                            <Link className="d-inline-flex pt-1 link-underline link-underline-opacity-0">Delete User</Link>
                                        </div>
                                    </div>
                                }

                                {/* <hr /> For Site Development Code Commented

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
                                </div> */}

                                <hr />
                                <div className="mt-4 text-center text-md-start">
                                    <h6 className="text-uppercase fs-5 shoporia-pointer" onClick={() => logoutUser()}>
                                        <i className="bi bi-power me-1"></i> Logout
                                    </h6>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-md-9">
                        <div className="card">
                            <div className="card-body shadow-sm">
                                {activeTabs === 'profile' && <PersonalInformation profiledata={userName} />}
                                {activeTabs === 'savedcards' && <SavedCards savedcardsdata={savedCards} />}
                                {activeTabs === 'manageaddress' && <ManageAddress manageaddressdata={manageaddress} profiledata={userName} />}
                                {activeTabs === 'adminrole' && <AllUsers isadmin={isAdmin} />}
                                {activeTabs === 'userdelete' && <DeleteUser isadmin={isAdmin} />}
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
