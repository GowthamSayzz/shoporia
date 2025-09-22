import { useEffect, useState } from "react";
import Footer from "../shared/Footer";
import NavBar from "../shared/Navbar";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import PersonalInformation from "./PersonalInfoformation";

function Account() {
    const [userName, setUserName] = useState("");

    const logoutUser = () => {
        localStorage.clear();
        window.location.href = '/';
    }

    useEffect(() => {
        const getUserName = async () => {
            let access_token = localStorage.getItem("access_token");
            if (!access_token) {
                toast.error("Unknown User Detected");
                return (window.location.href = "/signin");
            }
            try {
                let apiResponse = await axios.get(
                    "https://api.escuelajs.co/api/v1/auth/profile",
                    {
                        headers: {
                            Authorization: `Bearer ${access_token}`,
                        },
                    }
                );
                setUserName(apiResponse.data);
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
                                    src={userName.avatar}
                                    alt="userAvatar"
                                    className="rounded-circle"
                                    style={{ width: "100px", height: "100px" }}
                                />
                                <div className="ms-3 mt-2">
                                    <h6 className="text-capitalize">Hello, {userName.role}</h6>
                                    <strong>{userName?.name}</strong>
                                </div>
                            </div>
                        </div>

                        <div className="card shadow mb-3">
                            <div className="card-body">
                                <div className="mt-1">
                                    <div className="text-uppercase">
                                        <h6 className="text-start fs-5">
                                            <i className="bi bi-person-fill me-1"></i> Account
                                            Settings
                                        </h6>
                                    </div>
                                    <div className="text-center account account-div-height">
                                        <a href="/profile" className="d-inline-flex pt-1 link-underline link-underline-opacity-0"><i className="bi bi-person-bounding-box me-2"></i>Profile Information</a>
                                    </div>
                                    <div className="account text-center account-div-height">
                                        <a href="/profile" className="d-inline-flex pt-1 link-underline link-underline-opacity-0"><i className="bi bi-house-lock me-2"></i> Manage Addresses</a>
                                    </div>
                                    <div className="account text-center account-div-height">
                                        <a href="/profile" className="d-inline-flex pt-1 link-underline link-underline-opacity-0"><i className="bi bi-person-vcard me-2"></i> PAN Card Information</a>
                                    </div>
                                </div>

                                <hr />

                                <div className="mt-4">
                                    <div className="text-uppercase">
                                        <h6 className="text-start fs-5">
                                            <i className="bi bi-wallet2 me-1"></i> Payments
                                        </h6>
                                    </div>
                                    <div className="text-center account account-div-height">
                                        <a href="/profile" className="d-inline-flex pt-1 link-underline link-underline-opacity-0"><i className="bi bi-box2-heart me-2"></i> Gift Cards</a>
                                    </div>
                                    <div className="account text-center account-div-height">
                                        <a href="/profile" className="d-inline-flex pt-1 link-underline link-underline-opacity-0"><i className="bi bi-cash-stack me-2"></i> UPI</a>
                                    </div>
                                    <div className="account text-center account-div-height">
                                        <a href="/profile" className="d-inline-flex pt-1 link-underline link-underline-opacity-0"><i className="bi bi-cash-stack me-2"></i> Saved Cards</a>
                                    </div>
                                </div>

                                <hr />

                                <div className="mt-4">
                                    <div className="text-uppercase">
                                        <h6 className="text-start fs-5">
                                            <i className="bi bi-wallet2 me-1"></i> My Stuff
                                        </h6>
                                    </div>
                                    <div className="account text-center account-div-height">
                                        <a href="/profile" className="d-inline-flex pt-1 link-underline link-underline-opacity-0"><i className="bi bi-collection me-2"></i> My Coupons</a>
                                    </div>
                                    <div className="account text-center account-div-height">
                                        <a href="/profile" className="d-inline-flex pt-1 link-underline link-underline-opacity-0"><i className="bi bi-list-stars me-2"></i> My reviews & Ratings</a>
                                    </div>
                                    <div className="account text-center account-div-height">
                                        <a href="/profile" className="d-inline-flex pt-1 link-underline link-underline-opacity-0"><i className="bi bi-bell me-2"></i> All Notifications</a>
                                    </div>
                                    <div className="account text-center account-div-height">
                                        <a href="/profile" className="d-inline-flex pt-1 link-underline link-underline-opacity-0"><i className="bi bi-heart me-2"></i> My Wishlist</a>
                                    </div>
                                </div>

                                <hr/>
                                <div className="mt-4">
                                    <h6 className="text-uppercase fs-5" onClick={e=> logoutUser()}><i className="bi bi-power"></i> Logout</h6>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-9">
                        <div className="card shadow">
                            <div className="card-body">
                                <PersonalInformation data={userName} />
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
