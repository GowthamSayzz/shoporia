import { useState } from 'react';
import { addressaddAPI } from '../Services/addressService';
import banner from './Images/PersonalInfoBanner.png';
import { ToastContainer, toast } from 'react-toastify';

function ManageAddress({ manageaddressdata, profiledata }) {

    const [addressData, setAddressData] = useState({ name: '', mobile: '', email: '', address: '', city: '', state: '', country: '', pincode: '' });

    const addressHandler = async () => {
        try {
            let apiResponse = await addressaddAPI(addressData);
            setAddressData(apiResponse.data);
        }catch(error){
            toast.error(error.response?.data?.message || error.message);
        }
    }

    return (
        <div className='p-2'>
            <h5 className="mb-3">Manage Address</h5>
            <button className='btn btn-primary fw-bold border border-1' data-bs-toggle="collapse" data-bs-target="#myFormCollapse">
                <i className='bi bi-plus me-2'></i>ADD A NEW ADDRESS
            </button>
            <div className='card card-body mt-3 rounded-0 shadow-sm'>
                {
                    <div>
                        <div className="mb-3">
                            <span className="badge bg-warning text-dark mb-2">HOME</span>
                            <div className="fw-bold">
                                {profiledata?.firstName} {<i className="bi bi-dot mx-1"></i>} {profiledata?.phone}
                            </div>
                            <div className="text-regular mt-1">
                                {manageaddressdata?.address}, {manageaddressdata?.city}, {manageaddressdata?.state}, {manageaddressdata?.country} -{" "}
                                <span className="fw-bold">{manageaddressdata?.postalCode}</span>
                            </div>
                        </div>
                    </div>
                }
            </div>
            <div className='card card-body mt-3 collapse shadow-sm' id='myFormCollapse'>
                <h6 className='fw-bold'>Add Address</h6>
                <div className="mt-2">
                    <label className="small">Name</label>
                    <input type="text" className="form-control" placeholder="Your Name" value={addressData.name} onChange={e => setAddressData({ ...addressData, name: e.target.value })} />
                </div>
                <div className="mt-3">
                    <label className="small">Phone Number</label>
                    <input type="text" className="form-control" placeholder="Your Phone Number" value={addressData.mobile} onChange={e => setAddressData({ ...addressData, mobile: e.target.value })} />
                </div>
                <div className="mt-3">
                    <label className="small">Email</label>
                    <input type="text" className="form-control" placeholder="Your Email" value={addressData.email} onChange={e => setAddressData({ ...addressData, email: e.target.value })} />
                </div>
                <div className="mt-3">
                    <label className="small">Permanent Address</label>
                    <input type="text" className="form-control" placeholder="Your Address" value={addressData.address} onChange={e => setAddressData({ ...addressData, address: e.target.value })} />
                </div>
                <div className="mt-3">
                    <label className="small">City</label>
                    <input type="text" className="form-control" placeholder="Your City" value={addressData.city} onChange={e => setAddressData({ ...addressData, city: e.target.value })} />
                </div>
                <div className="mt-3">
                    <label className="small">State</label>
                    <input type="text" className="form-control" placeholder="Your State" value={addressData.state} onChange={e => setAddressData({ ...addressData, state: e.target.value })} />
                </div>
                <div className="mt-3">
                    <label className="small">Country</label>
                    <input type="text" className="form-control" placeholder="Your Country" value={addressData.country} onChange={e => setAddressData({ ...addressData, country: e.target.value })} />
                </div>
                <div className="mt-3">
                    <label className="small">Pincode</label>
                    <input type="text" className="form-control" placeholder="Your Pincode" value={addressData.pincode} onChange={e => setAddressData({ ...addressData, pincode: e.target.value })} />
                </div>
                <div className="mt-3">
                    <button className='btn btn-warning' onClick={() => addressHandler()}>Submit</button>
                </div>
            </div>
            <div className='mt-4'>
                <img src={banner} alt="footer-banner" className='img-fluid' style={{ width: '100%', height: '100%' }} />
            </div>
            <ToastContainer />
        </div>
    )
}
export default ManageAddress;