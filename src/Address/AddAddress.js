import { useState } from "react";
import axios from "axios";
import { addressaddAPI } from "../Services/addressService";

function AddAddress({addnewAddress}){

    let [addressData, setAddressData] = useState({name: '', mobile:'', email: '', address1:'', city:'', state:'', country:'', pincode:'', latLong:''});
    

    const getUserLatLong = () =>{
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setAddressData({...addressData, latLong: position.coords.latitude + ',' + position.coords.longitude});
                    getLocationData(position.coords.latitude, position.coords.longitude);
                },
                () => {
                    alert('Permission denied');
                }
            )
        }else{
            alert('Geolocation not supported');
        }

    }

    const getLocationData = async (lat, long) =>{
        let apikey = '';
        let apiResponse = await axios.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + long + "&key=" + apikey);
        let addressComponents = apiResponse.data.results[0].address_components;
        let city = addressComponents.find(component => component.types.includes("locality")).long_name;
        let state = addressComponents.find(component => component.types.includes("administrative_area_level_1")).long_name;
        let country = addressComponents.find(component => component.types.includes("country")).long_name;
        //let pincode = addressComponents.find(component => component.types.includes("postal_code")).short_name;

        setAddressData({...addressData, city, state, country });
    }
    
    const addAddressHandler = async() => {
        let apiResponse = await addressaddAPI(addressData);
        addnewAddress(apiResponse.data.data);
    }
    
    
    
    return(
        <div>
            <div className="card shadow-sm mt-3">
                <div className="card-body">
                    <div>
                        <button className="btn btn-primary" onClick={e=> getUserLatLong()}><i className="bi bi-crosshair"></i> Use my location</button>
                    </div>
                    <div className="mt-3">
                        <label className="small">Name</label>
                        <input type="text" className="form-control" placeholder="Your Name" value={addressData.name} onChange={e=> setAddressData({...addressData, name: e.target.value})}/>
                    </div>
                    <div className="mt-3">
                        <label className="small">Phone Number</label>
                        <input type="text" className="form-control" placeholder="Your Phone Number" value={addressData.mobile} onChange={e=> setAddressData({...addressData, mobile: e.target.value})}/>
                    </div>
                    <div className="mt-3">
                        <label className="small">Email</label>
                        <input type="text" className="form-control" placeholder="Your Email" value={addressData.email} onChange={e=> setAddressData({...addressData, email: e.target.value})}/>
                    </div>
                    <div className="mt-3">
                        <label className="small">Permanent Address</label>
                        <input type="text" className="form-control" placeholder="Your Address" value={addressData.address1} onChange={e=> setAddressData({...addressData, address1: e.target.value})}/>
                    </div>
                    <div className="mt-3">
                        <label className="small">City</label>
                        <input type="text" className="form-control" placeholder="Your City" value={addressData.city} onChange={e=> setAddressData({...addressData, city: e.target.value})}/>
                    </div>
                    <div className="mt-3">
                        <label className="small">State</label>
                        <input type="text" className="form-control" placeholder="Your State" value={addressData.state} onChange={e=> setAddressData({...addressData, state: e.target.value})}/>
                    </div>
                    <div className="mt-3">
                        <label className="small">Country</label>
                        <input type="text" className="form-control" placeholder="Your Country" value={addressData.country} onChange={e=> setAddressData({...addressData, country: e.target.value})}/>
                    </div>
                    <div className="mt-3">
                        <label className="small">Pincode</label>
                        <input type="text" className="form-control" placeholder="Your Pincode" value={addressData.pincode} onChange={e=> setAddressData({...addressData, pincode: e.target.value})}/>
                    </div>
                    <div className="mt-3">
                        <button className="btn btn-primary" onClick={e=> addAddressHandler()}>Add New Address</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddAddress;