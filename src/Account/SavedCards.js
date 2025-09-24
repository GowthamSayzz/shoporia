import banner from './Images/PersonalInfoBanner.png';

function SavedCards({ savedcardsdata }) {
    return (
        <div className='p-2'>
            <h5 className="mb-3">Saved Cards</h5>
            {
                <div>
                    <div className='mb-3'>
                        <strong className='form-label text-capitalize'>Card Name</strong>
                        <input type='text' className='form-control' placeholder='Your Card Name' value={savedcardsdata.cardNumber || ''} readOnly />
                    </div>
                    <div className='mb-3'>
                        <strong className='form-label text-capitalize'>Card Expire</strong>
                        <input type='text' className='form-control' placeholder='Your Card Expiry Date' value={savedcardsdata.cardExpire || ''} readOnly />
                    </div>
                    <div className='mb-3'>
                        <strong className='form-label text-capitalize'>Your Currency</strong>
                        <input type='text' className='form-control' placeholder='Your Currency' value={savedcardsdata.currency || ''} readOnly />
                    </div>
                </div>
            }
            <div className='mt-4'>
                <img src={banner} alt="footer-banner" style={{ width: '100%', height: '100%' }} />
            </div>
        </div>
    )

}

export default SavedCards;