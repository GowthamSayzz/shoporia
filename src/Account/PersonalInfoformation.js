import banner from './Images/PersonalInfoBanner.png';
function PersonalInformation({ profiledata }) {
    return (
        <div className='p-2'>
            <h5 className="mb-3"> Personal Information</h5>
            {
                <div>
                    <div className='mb-3'>
                        <strong className='form-label text-capitalize'>First Name</strong>
                        <input type='text' className='form-control' placeholder='Your First Name' value={profiledata.firstName || ''} readOnly />
                    </div>
                    <div className='mb-3'>
                        <strong className='form-label text-capitalize'>Last Name</strong>
                        <input type='text' className='form-control' placeholder='Your Last Name' value={profiledata.lastName || ''} readOnly />
                    </div>
                    <div className='mb-3'>
                        <strong className='form-label'>Email</strong>
                        <input type='email' className='form-control' placeholder='Your Email' value={profiledata.email || ''} readOnly />
                    </div>
                    <div className='mb-3'>
                        <strong className='form-label'>Phone Number</strong>
                        <input type='text' className='form-control' placeholder='Your Phone Number' value={profiledata.phone || ''} readOnly />
                    </div>
                    <div className='mb-3'>
                        <strong className='form-label'>Birth Date</strong>
                        <input type='text' className='form-control' placeholder='Your Birth Date' value={profiledata.birthDate || ''} readOnly />
                    </div>
                    {/* <div className='mb-3'>
                        <strong className="form-check-label me-3" for="radioDefault1">Gender</strong>

                        <input className="form-check-input me-2" type="radio" name="gender" id="male" value='male' checked={profiledata.gender === 'male'} />
                        <strong className="form-check-label me-4">Male</strong>
                        <input className="form-check-input me-2" type="radio" name="gender" id="male" value='female' checked={profiledata.gender === 'female'} />
                        <strong className="form-check-label me-2">Female</strong>
                    </div> */}
                </div>
            }
            <div className='mt-4'>
                <img src={banner} alt="footer-banner" style={{ width: '100%', height: '100%' }} />
            </div>
        </div>
    )
}

export default PersonalInformation;