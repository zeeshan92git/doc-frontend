// src/components/StripeCheckout.jsx
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import React, { useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";



const StripeCheckout = ({ amount, appointmentId, doctorname, slotTime , slotDate, phone , onSuccess }) => {
    const { backendURL, token } = useContext(AppContext);
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post(backendURL + '/api/user/pay-appointment',
                { amount, appointmentId , doctorname ,slotTime ,slotDate , phone}, { headers: { token } });

            const result = await stripe.confirmCardPayment(data.clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement)
                }
            });

            if (result.error) {
                toast.error(result.error.message);
            } else if (result.paymentIntent.status === "succeeded") {
                toast.success("Payment successful!");
                onSuccess();
            }
        } catch (err) {
            console.error(err);
            toast.error("Payment failed.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <CardElement />
            <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
                Pay Now
            </button>
        </form>
    );
};

export default StripeCheckout;
