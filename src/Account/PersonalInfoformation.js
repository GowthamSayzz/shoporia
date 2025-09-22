import banner from './Images/PersonalInfoBanner.png';
function PersonalInformation({ data }) {
    return (
        <div>
            <h5 className="mb-3"> Personal Information <i className="bi bi-pencil-square"></i></h5>
            {
                <div className='mb-3'>
                    <strong className='form-label text-capitalize'>{data.role || ''} Name</strong>
                    <input type='text' className='form-control' placeholder='Your Email' value={data.name || ''} disabled />
                </div>
            }
            {
                <div className='mb-2'>
                    <strong className='form-label'>Email</strong>
                    <input type='email' className='form-control' placeholder='Your Email' value={data.email || ''} disabled />
                </div>
            }
            {
                <div className='mb-2 mt-5'>
                    <img src={banner} alt="" style={{width:'100%', height:'100%'}}/>
                </div>
            }
        </div>
    )
}

export default PersonalInformation;