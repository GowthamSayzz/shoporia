import { checkUserLoginStatus } from '../Utils/utils';
import LogoNoBg from './Images/Shoporia NoBg Logo.png';
import { useState } from 'react';
import { ERROR_MESSAGES } from '../Constants/errors';
import { signinAPI } from '../Services/authServices';
import {Link} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

function SignIn() {

    /**
     * !!! CHECKING USER LOGIN STATUS
     */
    
    let isUserLoggedIn = checkUserLoginStatus();
    if (isUserLoggedIn === true) {
        window.location = '/';
    }

    const [signinData, setsigninData] = useState({ username: "", password: "" });
    const [signinErrors, setSigninErrors] = useState({ username: false, password: false, apiError: false });

    /**
     * !!! GET THE USER INPUT USERNAME & PASSWORD
     */

    const updateUserName = (e) => {
        setsigninData({ ...signinData, username: e.target.value });
    }

    const updatePassword = (e) => {
        setsigninData({ ...signinData, password: e.target.value });
    }

    /**
     * !!! USERNAME & PASSWORD LOGIN VALIDATIONS TO GET THE SHOPORIA USER ACCESS
     */

    const sendSignInData = async () => {
        let tempErrors = { signinErrors }
        let noofErrors = false;

        if (signinData.username.trim() === "") {
            noofErrors = true;
            tempErrors = { ...tempErrors, username: true };
        } else {
            tempErrors = { ...tempErrors, username: false };
        }
        if (signinData.password.length < 6) {
            noofErrors = true;
            tempErrors = { ...tempErrors, password: true };
        } else {
            tempErrors = { ...tempErrors, password: false };
        }
        setSigninErrors({ ...tempErrors });
        if (noofErrors === false) {
            try {
                let apiResponse = await signinAPI({ ...signinData });
                setSigninErrors({ ...signinData, apiError: false });
                if (apiResponse.data.accessToken) {
                    localStorage.setItem("access_token", apiResponse.data.accessToken);
                    localStorage.setItem('userId', apiResponse.data.id);
                    localStorage.setItem("isLoggedIn", "true");
                    localStorage.setItem('userName', apiResponse.data.firstName);
                    window.location.href = "/";
                    toast.success('Login Success');
                }
            } catch (error) {
                setSigninErrors({ ...signinData, apiError: true });
                toast.error(error.response?.data?.message || error.message);
            }
        }
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-lg-4">
                    <div className='text-center mb-3'>
                        <img src={LogoNoBg} alt='Logo' className='img-fluid mt-3' style={{ maxWidth: "150px" }} />
                    </div>
                    <div className='card mt-3'>
                        <div className='card-body'>
                            <h3>Login</h3>

                            <div className='mb-2'>
                                <strong className='form-label'>Username</strong>
                                <input type='text' className='form-control' placeholder='Your Username' onChange={e => updateUserName(e)} />
                                <div className='text-danger'>{signinErrors.username === true && ERROR_MESSAGES.SIGNIN.USERNAME}</div>
                            </div>
                            <div className='mb-2'>
                                <strong className='form-label'>Password</strong>
                                <input type='password' className='form-control' placeholder='Your Password' onChange={e => updatePassword(e)} />
                                <div className='text-danger'>{signinErrors.password === true && ERROR_MESSAGES.SIGNIN.PASSWORD}</div>
                            </div>

                            <div className='mt-4 d-grid'>
                                <button className='btn btn-warning' onClick={e => sendSignInData()}>Sign In</button>
                                <div className='text-danger'>
                                    {
                                        signinErrors.apiError === true && ERROR_MESSAGES.SIGNIN.INVALID
                                    }
                                </div>
                            </div>
                            <div className='row mt-3'>
                                <div className='col-6 text-start'>
                                    <Link to='/forgot-password' className='link-offset-2 link-underline link-underline-opacity-0'>Forgot Password</Link>
                                </div>
                                <div className='col-6 text-end'>
                                    <Link to='/signup' className='link-offset-2 link-underline link-underline-opacity-0'>Create Account</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr className='mt-5' />
            <div className='row justify-content-center mt-3'>
                <div className='col-12 col-md-8 text-center'>
                    <div className='row'>
                        <div className='col-12 col-sm-4 mb-2'><Link to='/' className='link-offset-2 link-underline link-underline-opacity-0'>Conditions of use</Link></div>
                        <div className='col-12 col-sm-4 mb-2'><Link to='/' className='link-offset-2 link-underline link-underline-opacity-0'>Privacy of use</Link></div>
                        <div className='col-12 col-sm-4 mb-2'><Link to='/' className='link-offset-2 link-underline link-underline-opacity-0'>Help</Link></div>
                    </div>
                </div>
                <div className='col-12 mt-3 text-center'>
                    &copy; 2025, Shoporia.in, Inc. or its affiliates
                </div>
            </div>
            <ToastContainer />
        </div>
    )

}

export default SignIn;