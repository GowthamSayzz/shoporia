import banner from './Images/PersonalInfoBanner.png';
import { useEffect, useState } from 'react';
import { getLoggedInUserId } from '../Utils/utils';
import axios from 'axios';
import { toast } from 'react-toastify';

function ManageAddress({ manageaddressdata, profiledata }) {

    const [address, setAddress] = useState({});

    const logoutUser = () => {
        localStorage.clear();
        window.location.href = '/signin';
    }

    useEffect(() => {
        getAddress();
    });

    const getAddress = async () => {
        let userId = getLoggedInUserId();
        if (!userId || userId == null) {
            logoutUser();
        }
        try {
            let apiResponse = await axios.get('https://dummyjson.com/users/' + userId);
            setAddress(apiResponse.data);
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <div className='p-2'>
            <h5 className="mb-3">Manage Address</h5>
            <h6 className='card-body border border-1'><i className='bi bi-plus me-2'></i>ADD A NEW ADDRESS</h6>
            <div className='card card-body mt-3 rounded-0'>
                {
                    <div>
                        <div className="mb-3">
                            <span className="badge bg-warning text-dark mb-2">HOME</span>
                            <div className="fw-bold">
                                {profiledata?.firstName} {<i className="bi bi-dot"></i>} {profiledata?.phone}
                            </div>
                            <div className="text-regular mt-1">
                                {manageaddressdata?.address}, {manageaddressdata?.city}, {manageaddressdata?.state}, {manageaddressdata?.country} -{" "}
                                <span className="fw-bold">{manageaddressdata?.postalCode}</span>
                            </div>
                        </div>
                    </div>
                }
            </div>
            <div className='mt-3'>
                {
                    
                }
            </div>
            <div className='mt-4'>
                <img src={banner} alt="footer-banner" style={{ width: '100%', height: '100%' }} />
            </div>
        </div>
    )
}
export default ManageAddress;