import { checkUserLoginStatus, isEmailValid } from '../Utils/utils';
import LogoNoBg from './Images/Shoporia NoBg Logo.png';
import { useState } from 'react';
import { ERROR_MESSAGES } from '../Constants/errors';
import { signinAPI } from '../Services/authServices';
import {Link} from "react-router-dom";

function SignIn() {

    let isUserLoggedIn = checkUserLoginStatus();
    if (isUserLoggedIn === true) {
        window.location = '/';
    }

    const [signinData, setsigninData] = useState({ email: "", password: "" });
    const [signinErrors, setSigninErrors] = useState({ email: false, password: false, apiError: false });

    const updateEmail = (e) => {
        setsigninData({ ...signinData, email: e.target.value });
    }

    const updatePassword = (e) => {
        setsigninData({ ...signinData, password: e.target.value });
    }

    const sendSignInData = async () => {
        let tempErrors = { signinErrors }
        let noofErrors = false;

        if (isEmailValid(signinData.email) === false) {
            noofErrors = true;
            tempErrors = { ...tempErrors, email: true };
        } else {
            tempErrors = { ...tempErrors, email: false };
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
                if (apiResponse.data.result === "success") {
                    localStorage.setItem("userData", JSON.stringify(apiResponse.data.data));
                    localStorage.setItem("tracking_Id", 1)
                    window.location = "/";
                }
            } catch (error) {
                setSigninErrors({ ...signinData, apiError: true });
            }
        }
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-4">
                    <div className='text-center'>
                        <img src={LogoNoBg} alt='Logo' className='logo-img' />
                    </div>
                    <div className='card mt-3'>
                        <div className='card-body'>
                            <h3>Login</h3>

                            <div className='mb-2'>
                                <strong className='form-label'>Email</strong>
                                <input type='text' className='form-control' placeholder='Your Email' onChange={e => updateEmail(e)} />
                                <div className='text-danger'>{signinErrors.email === true && ERROR_MESSAGES.SIGNIN.EMAIL}</div>
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
                            <div className='row d-flex'>
                                <div className='text-primary mt-2 col-6'>
                                    <Link to='/forgot-password' className='link-offset-2 link-underline link-underline-opacity-0'>Forgot Password</Link>
                                </div>
                                <div className='text-primary mt-2 col-6 text-end'>
                                    <Link to='/signup' className='link-offset-2 link-underline link-underline-opacity-0'>Create Account</Link>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
            <hr className='mt-5' />
            <div className='row justify-content-center mt-3'>
                <div className='col-4 text-center'>
                    <div className='row mt-3'>
                        <div className='col-4'><Link to='/' className='link-offset-2 link-underline link-underline-opacity-0'>Conditions of use</Link></div>
                        <div className='col-4'><Link to='/' className='link-offset-2 link-underline link-underline-opacity-0'>Privacy of use</Link></div>
                        <div className='col-4'><Link to='/' className='link-offset-2 link-underline link-underline-opacity-0'>Help</Link></div>
                    </div>
                </div>
                <div className='mt-3 text-center'>
                    &copy; 2025, Shoporia.in, Inc. or its affiliates
                </div>
            </div>
        </div>
    )

}

export default SignIn;