import { checkUserLoginStatus, isEmailValid } from '../Utils/utils';
import LogoNoBg from './Images/Shoporia NoBg Logo.png';
import { useState } from 'react';
import { ERROR_MESSAGES } from '../Constants/errors';
import { signupAPI } from '../Services/authServices';
import { Link } from 'react-router-dom';


function Signup() {

    let isUserLoggedIn = checkUserLoginStatus();
    if (isUserLoggedIn === true) {
        window.location = '/';
    }

    const [signupData, setsignupData] = useState({ name: "", email: "", password: "" });
    const [signupErrors, setSignupErrors] = useState({ name: false, email: false, password: false });

    const updateName = (e) => {
        setsignupData({ ...signupData, name: e.target.value });
    }

    const updateEmail = (e) => {
        setsignupData({ ...signupData, email: e.target.value });
    }

    const updatePassword = (e) => {
        setsignupData({ ...signupData, password: e.target.value });
    }

    const sendSignUpData = async () => {
        let tempErrors = { signupErrors }
        let noofErrors = false;
        if (signupData.name.length < 3) {
            noofErrors = true;
            tempErrors = { ...tempErrors, name: true };
        } else {
            tempErrors = { ...tempErrors, name: false };
        }
        if (isEmailValid(signupData.email) === false) {
            noofErrors = true;
            tempErrors = { ...tempErrors, email: true };
        } else {
            tempErrors = { ...tempErrors, email: false };
        }
        if (signupData.password.length < 6) {
            noofErrors = true;
            tempErrors = { ...tempErrors, password: true };
        } else {
            tempErrors = { ...tempErrors, password: false };
        }
        setSignupErrors({ ...tempErrors });
        if (noofErrors === false) {
            try {
                let apiResponse = await signupAPI({ ...signupData });
                console.log(apiResponse.data);
                if (apiResponse.data.result === "success") {
                    localStorage.setItem("userData", JSON.stringify(apiResponse.data.data));
                    localStorage.setItem("tracking_Id", 1)
                    window.location = "/";
                }
            }catch(error){
                
            }
        } else {
            alert("Details are incorrect");
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
                            <h3>Create Account</h3>
                            <div className='mb-2'>
                                <strong className='form-label'>Your name</strong>
                                <input type='text' className='form-control' placeholder='Your Name' onChange={e => updateName(e)} />
                                <div className='text-danger'>{signupErrors.name === true && ERROR_MESSAGES.SIGNUP.NAME}</div>
                            </div>
                            <div className='mb-2'>
                                <strong className='form-label'>Email</strong>
                                <input type='text' className='form-control' placeholder='Your Email' onChange={e => updateEmail(e)} />
                                <div className='text-danger'>{signupErrors.email === true && ERROR_MESSAGES.SIGNUP.EMAIL}</div>
                            </div>
                            <div className='mb-2'>
                                <strong className='form-label'>Password</strong>
                                <input type='password' className='form-control' placeholder='Your Password' onChange={e => updatePassword(e)} />
                                <div className='text-danger'>{signupErrors.password === true && ERROR_MESSAGES.SIGNUP.PASSWORD}</div>
                                <div><i className='fs-6 bi bi-info-lg text-primary'></i><span className='fs-6'>Password must be at least 6 characters</span></div>
                            </div>
                            <div className='mt-3'>
                                <p>To verify your number, we will send you a text message with temporary code. Message and data rates may apply.</p>
                            </div>
                            <div className='mt-4 d-grid'>
                                <button className='btn btn-warning' onClick={e => sendSignUpData()}>Create Account</button>
                            </div>
                            <hr className='mt-4' />
                            <div>
                                <strong className='fs-6'>Buying for work?</strong> <br />
                                <Link to='/' className='link-offset-2 link-underline link-underline-opacity-0'>Create a free business account</Link>
                            </div>
                            <hr />
                            <div className='mt-4'>
                                <label className='form-label'>Already have an account? <Link to='/' className='link-offset-2 link-underline link-underline-opacity-0'>Sign In<i className="bi bi-caret-right-fill fs-6"></i></Link></label>
                            </div>
                            <div className='mt-3'>
                                By creating an account for logging in, you are agree to Shoporia's <Link to='/' className='link-offset-2 link-underline link-underline-opacity-0'>Conditions of Use</Link> and <Link to='/' className='link-offset-2 link-underline link-underline-opacity-0'>Privacy policy</Link>
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

export default Signup;