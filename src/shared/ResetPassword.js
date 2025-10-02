import { isEmailValid } from '../Utils/utils';
import LogoNoBg from './Images/Shoporia NoBg Logo.png';
import { useState } from 'react';
import { ERROR_MESSAGES } from '../Constants/errors';
import { resetpasswordAPI } from '../Services/authServices';
import {Link} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function ResetPassword(){

    const [fpData, setfpData] = useState({ email: "" });
    const [fpErrors, setfpErrors] = useState({ email: false, apiError: false });
    let [apiMsg, setapiMsg] = useState("");

    /**
     * !!! GET THE USER INPUT EMAIL DATA
     */
    const updateEmail = (e) => {
        setfpData({ ...fpData, email: e.target.value });
    }

    /**
     * !!! FORGOT/RESET PASSWORD LOGIC VALIDATIONS
     */
    const sendForgotPassword = async () => {
        let tempErrors = {fpErrors}
        let noofErrors = false;

        if(isEmailValid(fpData.email) === false){
            noofErrors = true;
            tempErrors = {...tempErrors, email: true}
        }else{
            tempErrors = {...tempErrors, email: false}
        }
        setfpErrors({...tempErrors});

        if(noofErrors === false){
            try{
                setapiMsg("");
                let apiResponse = await resetpasswordAPI({...fpData});
                setfpErrors({...fpErrors, apiError: false});
                if(apiResponse.data.result === 'success'){
                    setapiMsg(apiResponse.data.message);
                }else{
                    setfpErrors({...fpErrors, apiError: true});
                }
            }catch(error){
                setapiMsg("");
                setfpErrors({...fpErrors, apiError: true});
                toast.error(error.response?.data?.message || error.message)
            }
        }
    }



    return(
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-lg-4">
                    <div className='text-center mb-3'>
                        <img src={LogoNoBg} alt='Logo' className='img-fluid mt-3' style={{ maxWidth: "150px" }} />
                    </div>
                    <div className='card mt-3'>
                        <div className='card-body'>
                            <h3>Forgot Password</h3>

                            <div className='mb-2'>
                                <strong className='form-label'>Email</strong>
                                <input type='text' className='form-control' placeholder='Your Email' onChange={e => updateEmail(e)} />
                                <div className='text-danger'>{fpErrors.email === true && ERROR_MESSAGES.FORGOT_PASSWORD.EMAIL_VALIDATION}</div>
                            </div>
                            <div className='mt-4 d-grid'>
                                <button className='btn btn-warning' onClick={e => sendForgotPassword()}>Send Password Reset Link</button>
                                <div className='text-danger'>
                                    {
                                        fpErrors.apiError === true && ERROR_MESSAGES.FORGOT_PASSWORD.EMAIL_NOT_FOUND
                                    }
                                </div>
                                <div className='text-success'>
                                    {
                                        apiMsg
                                    }
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

export default ResetPassword;