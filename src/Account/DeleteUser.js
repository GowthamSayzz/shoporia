import { useState } from 'react';
import { deleteUsersAPI } from '../Services/adminService';
import banner from './Images/PersonalInfoBanner.png';
import { ToastContainer, toast } from 'react-toastify';

function DeleteUser({ isadmin }) {

    const [userId, setUserId] = useState('');
    /**
    * !!! RETRIEVES ALL REQUIRED ADMIN LEVEL INFORMATION FROM THE BACKEND WHEN THE TAB IS OPENED TO DELETE USER
    */
    const deleteUser = async (id) => {
        try {
            let apiResponse = await deleteUsersAPI(id);
            if (apiResponse.data.isDeleted === true) {
                toast.success('User Deleted Successfully');
                setUserId('');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || "Failed to delete user");
        }
    };


    return (
        <div className='p-2'>

            {/* CHECKS THE USER ROLE AND ENABLES THE UI TAB FOR DELETING USERS AND PERFORMING OTHER OPERATIONS */}

            {
                isadmin === 'admin' &&
                <div>
                    <h5 className='mb-3'>Delete User</h5>
                    <div className='mb-3 mt-3 justify-content-center align-items-center'>
                        <label className='form-label text-center text-capitalize fw-bold'>Enter User Id</label>
                        <input type='text' className='form-control w-50' placeholder='User Id' value={userId} onChange={(e) => setUserId(e.target.value)} />
                        <button className='btn btn-danger mt-3' onClick={() => deleteUser(userId)} disabled={!userId}>Delete User</button>
                    </div>
                </div>
            }
            
            {/* A FOOTER BANNER TO PROVIDE A CLEAN AND ENHANCED UI EXPERIENCE */}

            <div className='mt-4'>
                <img src={banner} alt="footer-banner" className='img-fluid' style={{ width: '100%', height: '100%' }} />
            </div>
            <ToastContainer />
        </div>
    )
}

export default DeleteUser;