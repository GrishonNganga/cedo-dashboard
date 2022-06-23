import React, { useState, useEffect } from 'react';

import { Modal, ModalHeader, ModalBody, ModalFooter } from '@windmill/react-ui'
import { Button, Input } from '@windmill/react-ui'

import mpesa from '../assets/img/mpesa.png'
import paypal from '../assets/img/paypal.png'
import { Message } from './Message'

import { mpesaConfirmPaid, mpesaPayment } from '../api/endpoints'

const PaymentModal = ({ isModalOpen, closeModal, formDetails, payCallback }) => {

    const paymentMethods = {
        "mpesa": "mpesa",
        "paypal": "paypal",
        "wire": "wire"
    }

    const initialNotification = {
        message: "",
        type: "",
        isNotification: false
    }

    const [payment, setPayment] = useState("")
    const [notification, setNotification] = useState(initialNotification)
    const [phone, setPhone] = useState("")
    const [phoneValid, setPhoneValid] = useState(false)

    useEffect(() => {
        if (validPhone(phone)) {
            setPhoneValid(true)
        } else {
            setPhoneValid(false)
        }
    }, [phone])
    const handleChange = (e) => {
        setPhone(e.target.value)
    }

    const setPaymentMethod = (pay) => {
        if (payment === "mpesa") {
            setPayment("")
        } else {
            setPayment(paymentMethods.mpesa)
        }
    }

    const mpesaPay = () => {
        mpesaPayment({ ...formDetails, phone: phone }).then(response => {
            if (response?.status === 200) {
                setNotification({ message: "An STK Prompt has been sent to the phone number provided.", isNotification: true, type: "success" })
                setTimeout(() => {
                    console.log("response", response)
                    setNotification({ message: "", isNotification: false, type: "error" })
                    pollForMpesaPaid(response.data.merchantRequestId)
                }, 5000)
            } else {
                setNotification({ message: response?.data.message, isNotification: true, type: "error" })
            }
        })
    }

    const validPhone = (phone) => {
        if (phone.length === 12 || phone.length === 13 && phone[0] === "254" && phone.substring(3) === "254") {
            return true
        } else {
            return false
        }
    }

    const delay = ms => new Promise(res => setTimeout(res, ms));

    const pollForMpesaPaid = async (merchantRequestId) => {
        let success = false;
        for (let i = 0; i < 9; i++) {
            mpesaConfirmPaid({ merchantRequestId }).then((response) => {
                if (response && response.status === 200) {
                    console.log(response)
                    setNotification({ message: "Payment received successfully", isNotification: true, type: "success" })
                    setTimeout(() => {
                        setNotification({ message: "", isNotification: false, type: "error" })
                        payCallback()
                        closeModal()
                    }, 3000)
                }
            })
            if (i === 10) {
                setNotification({ message: "something wrong happened. Payment not received", isNotification: true, type: "error" })
                break;
            }
            await delay(5000);
        }
    }

    return (
        <Modal isOpen={isModalOpen} onClose={closeModal} wider>
            <ModalHeader className="-mt-2">Billing </ModalHeader>
            <ModalBody>
                <div className="w-full flex justify-center">
                    <div className="w-3/4 flex flex-col border rounded divide-y">
                        <div className="w-full flex flex-col">
                            <div className="w-full flex justify-between items-center cursor-pointer border-b p-4 hover:bg-gray-100" onClick={() => { setPaymentMethod("mpesa") }}>
                                <div className="w-1/2 tracking-wider font-semibold">
                                    M-PESA
                                </div>
                                <div className="w-1/2 flex justify-end">
                                    <img src={mpesa} className="w-1/3" />
                                </div>
                                <div className="ml-4">
                                    {
                                        payment === "mpesa" &&
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                        </svg>
                                        ||
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                        </svg>
                                    }


                                </div>
                            </div>
                            {
                                payment === "mpesa" &&
                                <div className="flex flex-col p-4 mt-3">
                                    <div>
                                        M-Pesa Express
                                    </div>
                                    <div className="text-xs py-5 pt-0 text-red-500">
                                        (An STK Prompt will be sent to the phone number provided)
                                    </div>
                                    {
                                        notification.isNotification &&
                                        <div className="my-5 mt-4">
                                            <Message message={notification.message} type={notification.type} />
                                        </div>

                                    }
                                    <div className="flex justify-between">
                                        <div>
                                            <Input name="phoneNumber" type="text" placeholder="Ex: 254729400426" onChange={handleChange} />
                                        </div>
                                        {
                                            phoneValid &&
                                            <div>
                                                <Button onClick={mpesaPay}>Pay Now</Button>
                                            </div>
                                            ||
                                            <div>
                                                <Button disabled>Pay Now</Button>
                                            </div>
                                        }
                                    </div>
                                </div>
                            }
                        </div>
                        <div className="w-full flex flex-col hover:bg-gray-100">
                            <div className="p-4 w-full flex justify-between items-center cursor-pointer ">
                                <div className="w-1/2 tracking-wider font-semibold">
                                    PAYPAL
                                </div>
                                <div className="w-1/2 flex justify-end">
                                    <img src={paypal} className="w-1/6" />
                                </div>
                                <div className="ml-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                    </svg>
                                    {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                    </svg> */}
                                </div>
                            </div>
                        </div>
                        <div className="p-4 w-full flex flex-col hover:bg-gray-100">
                            <div className="w-full flex justify-between items-center cursor-pointer ">
                                <div className="w-1/2 tracking-wider font-semibold">
                                    WIRE TRANSFER
                                </div>
                                <div className="ml-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                    </svg>
                                    {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                    </svg> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button className="w-full sm:w-auto" layout="outline" onClick={closeModal}>
                    Cancel
                </Button>
                <Button className="w-full sm:w-auto">Accept</Button>
            </ModalFooter>
        </Modal>
    )
}

export default PaymentModal