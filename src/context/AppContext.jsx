import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";

export const AppContext = createContext();


const AppContextProvider = (props) => {

    const backendURL = import.meta.env.VITE_BACKEND_URL;
    const [doctorsData, setdoctorsData] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false);
    const [userData, setuserData] = useState(false);

    const getDoctorsData = async () => {
        try {
            const response = await axios.get(backendURL + '/api/doctor/list');
            const { success, data, message } = response.data;

            if (success) {
                console.log("Doctors Data:", data);
                setdoctorsData(data);
            } else {
                console.log("data not fetched on FE", message);
                toast.error(message);
            }
        } catch (error) {
            console.log("Request failed:", error);
            toast.error("Failed to fetch doctors.");
        }
    };

    const getuserProfileData = async () => {
        try {
            const {data} = await axios.get(backendURL + '/api/user/get-profile', { headers: { token } });
            if (data.success) {
                console.log("Data fetched",data);
                setuserData(data.data);
            } else {
                console.log("Data not found" , data.message);
                toast.error(data.message);
            }
        } catch (error) {
            console.log("Request failed:", error);
            toast.error("Failed to fetch user profile data.");
        }
    };
    const value = {
        doctorsData, getDoctorsData ,
        token, setToken, backendURL , userData , setuserData , getuserProfileData 
    };

    useEffect(() => {
        getDoctorsData();
    }, []);
    useEffect(() => {
        if (token) {
            getuserProfileData();
        }
        else{
            setuserData(false);
        }
    }, [token])

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )


}

export default AppContextProvider;