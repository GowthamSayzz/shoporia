import { useEffect, useState } from "react";
import Footer from "../shared/Footer";
import NavBar from "../shared/Navbar";
import AddAddress from "./AddAddress";
import { addressaddAPI, addressdeleteAPI, addressviewAPI } from '../Services/addressService';
import { getLoggedInUserId } from "../Utils/utils";
import SingleAddress from "./SingleAddress";

function Address() {

    let [showAddAddress, setShowAddAddress] = useState(false);
    let [addressData, setAddressData] = useState([]);

    useEffect(() => {
        const getAddresses = async () => {
            try {
                let apiResponse = await addressviewAPI({ userId: getLoggedInUserId() });
                setAddressData([...apiResponse.data.data]);
            } catch (error) {
                console.log(error.message);
            }
        }

        getAddresses();

    }, []);

    const addnewAddress = async (data) => {
        let tempData = addressData;
        tempData.push(data);
        setAddressData([...tempData]);
        await addressaddAPI(data);
    }
    const addressDelete = async (id) => {
        let tempData = addressData;
        tempData = tempData.filter(address=>address.id !== id);
        setAddressData([...tempData]);
        await addressdeleteAPI({addressId: id});
    }


    return (
        <div>
            <NavBar />
            <div className="container mt-3">
                <div className="row">
                    <div className="col-3"></div>
                    <div className="col-6">
                        <button className="btn btn-secondary" onClick={e => setShowAddAddress(true)}>Add New Address</button>
                        {
                            showAddAddress === true && <AddAddress addnewAddress={addnewAddress} />
                        }
                    </div>
                    <div className="col-3"></div>
                </div>
                <div className="row">
                    {
                        addressData.map((address, i) => (
                            <SingleAddress address={address} key={i} addressDelete={addressDelete}/>
                        ))
                    }
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Address;