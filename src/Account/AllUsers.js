import { useEffect, useState } from 'react';
import { getAllUsersAPI } from '../Services/adminService';
import banner from './Images/PersonalInfoBanner.png';
import { ToastContainer, toast } from 'react-toastify';

function AllUsers({ isadmin }) {

    const [allUsers, setAllusers] = useState([{}]);

    useEffect(() => {
        const fetchAllCustomers = async () => {
            try {
                let apiResponse = await getAllUsersAPI();
                setAllusers(apiResponse.data.users);
            } catch (error) {
                toast.error(error.response?.data?.message || error.message);
            }
        }
        fetchAllCustomers();
    }, []);
    return (
        <div className='p-2'>
            {
                isadmin === 'admin' &&
                <div>
                    <h5 className='mb-3'>Users Data</h5>
                    <table className='table table-hover table-striped table-bordered shadow border rounded-1'>
                        <thead>
                            <tr className='text-center'>
                                <th scope='col'>User Id</th>
                                <th scope='col'>User Name</th>
                                <th scope='col'>First Name</th>
                                <th scope='col'>Last Name</th>
                                <th scope='col'>Birth Date</th>
                                <th scope='col'>Gender</th>
                                <th scope='col'>Age</th>
                                <th scope='col'>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allUsers.length > 0 ? (
                                    allUsers?.map((customersData, i) => (
                                        <tr key={customersData.id || i} className='text-center text-capitalize'>
                                            <th scope='row' className='text-center'>{customersData.id}</th>
                                            <td>{customersData.username}</td>
                                            <td>{customersData.firstName}</td>
                                            <td>{customersData.lastName}</td>
                                            <td>{new Date(customersData.birthDate).toLocaleDateString("en-GB")}</td>
                                            <td>{customersData.gender}</td>
                                            <td>{customersData.age}</td>
                                            <td>{customersData.role}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan='8' className='text-center'>No Users Found</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            }
            <div className='mt-4'>
                <img src={banner} alt="footer-banner" className='img-fluid' style={{ width: '100%', height: '100%' }} />
            </div>
            <ToastContainer />
        </div>
    )
};

export default AllUsers;