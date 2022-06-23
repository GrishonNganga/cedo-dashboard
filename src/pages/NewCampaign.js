import React, { useState, useEffect, useRef, lazy, Suspense } from "react"
import { Link , useHistory} from 'react-router-dom'

import { Label, Input, Button, Dropdown, Textarea } from '@windmill/react-ui'

import { firebaseUploadVideo, updateUserFields } from '../api/endpoints'
import { getDownloadURL } from 'firebase/storage';

const NewCampaign = () => {
    const PaymentModal = lazy(() => import('../components/PaymentModal'))

    const initialDetails = {
        name: "",
        description: "",
        demographicMale: false,
        demographicFemale: false,
        ageFrom: 0,
        ageTo: 0,
        format: null,
        link: "",
        amount: 0
    }
    const initialUploadDetails = {
        uploadProgress: 0,
        isUploading: false,
        uploadingComplete: false,
    }

    const videoRef = useRef(null)
    const amountRef = useRef(null)

    const history = useHistory();

    const [formDetails, setFormDetails] = useState(initialDetails)
    const [uploadDetails, setUploadDetails] = useState(initialUploadDetails)
    const [fieldsFilled, setFieldsFilled] = useState(false)
    const [loading, setLoading] = useState(false)
    const [paid, setPaid] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const clickVideoRef = () => {
        videoRef.current.click()
    }

    useEffect(() => {
        checkFieldsFilled()
    }, [formDetails])

    useEffect(() => {
        if(paid){
            history.push("/app/dashboard")
        }
    }, [paid])

    const handleChange = (e) => {
        e.persist()
        if(e.target.name === "amount" && e.target.value < 500000){
            setFormDetails(prevState => ({ ...prevState, "amount": 0}))
            return;
        }
        setFormDetails(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
    }

    const checkFieldsFilled = () => {
        if (formDetails.name !== "" && formDetails.description !== "" && (formDetails.demographicMale !== "" || formDetails.demographicFemale !== "") && formDetails.ageFrom !== 0 && formDetails.ageTo !== 0 && formDetails.link !== "" && formDetails.amount !== 0) {
            setFieldsFilled(true)
            return true
        } else {
            if (fieldsFilled) {
                setFieldsFilled(false)
            }
            return false
        }
    }

    const handleUpload = (e) => {
        setUploadDetails(prevState => ({ ...prevState, "isUploading": true }))
        const uploadTask = firebaseUploadVideo(e.target.files[0])
        uploadTask.on("state_changed", (snapshot) => {
            const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
            setUploadDetails(prevState => ({ ...prevState, "uploadProgress": prog }))
        }, (err) => {
        }, () => {
            getDownloadURL(uploadTask.snapshot.ref).then(url => {
                setUploadDetails(prevState => ({ ...prevState, "isUploading": false, "uploadingComplete": true }))
                setFormDetails(prevState => ({ ...prevState, "link": url }))
            })
        })
    }

    const changeBudget = (amount) => {
        setFormDetails(prevState => ({ ...prevState, "amount": amount}))
        amountRef.current.value = amount
    }
    return (
        <div className="w-full flex bg-gray-100">
            <div className="w-full bg-white flex rounded pl-6 -ml-4 py-4 pb-12">
                <div className="w-1/2 flex flex-col">
                    <div className="text-2xl text-gray-700 tracking-wider font-black">
                        New Campaign
                    </div>
                    <div className="mt-4">
                        <Label>
                            <span>Campaign Name</span>
                            <Input name="name" className="mt-1" type="text" placeholder="Ex: Experience a new Coke" onChange={handleChange} />
                        </Label>
                    </div>
                    <div className="mt-3">
                        <Label>
                            <span>Campaign Description</span>
                            <Textarea name="description" rows="5" placeholder="Sweet description of the campaign" onChange={handleChange} />
                        </Label>
                    </div>
                    <div className="mt-3">
                        <Label>
                            <span>Tageted Demographic</span>
                        </Label>
                    </div>
                    <div className="flex gap-x-3 mt-1">
                        <Label check>
                            <Input name="demographicFemale" type="checkbox" onChange={handleChange} />
                            <span className="ml-1">
                                Female
                            </span>
                        </Label>
                        <Label check>
                            <Input name="demographicMale" type="checkbox" onChange={handleChange} />
                            <span className="ml-1">
                                Male
                            </span>
                        </Label>
                    </div>
                    <div className="mt-4">
                        <Label>
                            <span>Tageted Ages</span>
                        </Label>
                    </div>
                    <div className="flex items-center gap-x-3 w-1/2">
                        <div>
                            From:
                        </div>
                        <Input name="ageFrom" className="mt-1" type="number" placeholder="" onChange={handleChange} />
                        <div>
                            To:
                        </div>
                        <Input name="ageTo" className="mt-1" type="number" placeholder="" onChange={handleChange}/>
                    </div>
                </div>
                <div className="w-1/2 flex flex-col justify-between">
                    <div className="flex flex-col mt-16">
                        <div className="w-full flex justify-center">
                            <div className="w-3/4 text-sm font rounded text-gray-700 flex gap-x-3">
                                <div>
                                    Campaign Format
                                </div>
                                {
                                    formDetails.format &&
                                    <div className="flex items-center justify-center    ">
                                        <div className="text-xs">
                                            &#40;{formDetails.format}&#41;
                                        </div>
                                        <div className="w-3/4 text-xs flex gap-x-4">
                                            <div className="text-yellow-300 hover:underline flex items-center cursor-pointer" onClick={() => { setFormDetails(prevState => ({ ...prevState, "format": null })) }}>
                                                <div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    Change
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                        {
                            !formDetails.format &&
                            <div className="w-full flex justify-center mt-2">
                                <div className="w-3/4 flex gap-x-3">
                                    <div className="w-1/3 p-8 border rounded-md hover:bg-yellow-100 cursor-pointer flex flex-col items-center justify-center gap-y-1" onClick={() => { setFormDetails(prevState => ({ ...prevState, "format": "survey" })) }}>
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                            </svg>
                                        </div>
                                        <div className="font-bold tracking-wider">
                                            Survey
                                        </div>
                                    </div>
                                    <div className="w-1/3 p-8 border rounded-md hover:bg-yellow-100 cursor-pointer flex flex-col items-center justify-center gap-y-1" onClick={() => { setFormDetails(prevState => ({ ...prevState, "format": "video" })) }}>
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                                            </svg>
                                        </div>
                                        <div className="font-bold tracking-wider">
                                            Video
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                        {
                            formDetails.format === "video" &&
                            <>
                                {!uploadDetails?.isUploading && !uploadDetails.uploadingComplete &&
                                    <div className="mt-3 w-full flex justify-center">
                                        <div className="w-3/4">
                                            <div className="flex flex-col items-center mt-1 w-full border-4 border-dashed p-5 rounded-md">
                                                <div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                                    </svg>
                                                </div>
                                                <div className="text-sm mt-2 text-gray-600">
                                                    Drag and Drop file
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    or
                                                </div>
                                                <div className="flex w-full justify-center">
                                                    <div className="w-1/2">
                                                        <Button className="mt-2" block layout="outline" onClick={clickVideoRef}>
                                                            Browse
                                                        </Button>
                                                        <input type="file" className="hidden" ref={videoRef} onChange={handleUpload} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                                {
                                    uploadDetails?.isUploading &&
                                    <div className="flex flex-col p-5 rounded-md">
                                        <div>
                                            Uploading
                                        </div>
                                        <div className="h-1 bg-yellow-400 rounded-full" style={{ width: `${uploadDetails.uploadProgress}%` }}>

                                        </div>
                                    </div>
                                }
                                {
                                    uploadDetails.uploadingComplete &&
                                    <div className="w-full flex justify-center">
                                        <div className="w-1/2 mt-3 bg-black">
                                            <video controls controlsList="nodownload">
                                                <source src={formDetails.link}></source>
                                            </video>
                                        </div>
                                    </div>
                                }
                            </>
                        }
                    </div>
                    <div className="w-full flex justify-center">
                        <div className="flex flex-col w-3/4 ">
                            <div className="mt-4 mb-2">
                                <Label>
                                    Campaign Budget (KES)
                                </Label>
                            </div>
                            <div className="flex items-center border rounded mb-3 text-md">
                                <div className={`border-r w-1/4 hover:bg-yellow-100 cursor-pointer ${formDetails.amount === 50000 && "bg-yellow-100"}`} onClick={()=>{ changeBudget(50000)}}>
                                    <div className="px-4 py-3">
                                        50,000
                                    </div>
                                </div>
                                <div className={`border-r w-1/4 hover:bg-yellow-100 cursor-pointer ${formDetails.amount === 150000 && "bg-yellow-100"}`} onClick={()=>{ changeBudget(150000)}}>
                                    <div className="px-4 py-3">
                                        150,000
                                    </div>
                                </div>
                                <div className={`border-r w-1/4 hover:bg-yellow-100 cursor-pointer ${formDetails.amount === 300000 && "bg-yellow-100"}`} onClick={()=>{ changeBudget(300000)}}>
                                    <div className="px-4 py-3">
                                        300,000
                                    </div>
                                </div>
                                <div className={`w-1/4 hover:bg-yellow-100 cursor-pointer ${formDetails.amount === 500000 && "bg-yellow-100"}`} onClick={()=>{ changeBudget(500000)}}>
                                    <div className="px-4 py-3">
                                        500,000
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center mb-3">
                                or
                            </div>
                            <div className="">
                                <Label>
                                    <Input name="amount" ref={amountRef} type="text" placeholder="KES 1,000,000" onChange={handleChange} />
                                </Label>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center w-full mt-8 p-4 px-8 gap-x-4">
                        <div className="">
                            <Button className="px-12" block layout="outline" tag={Link} to="app/dashboard">
                                Cancel
                            </Button>
                        </div>
                        <div className="">
                            {
                                fieldsFilled && !loading && !paid &&
                                <Button className="px-12" block onClick={() => { setIsModalOpen(true) }}>
                                    Proceed to Payment
                                </Button>
                            }
                            {
                                (!fieldsFilled || loading) && !paid &&
                                <Button className="px-12" block disabled>
                                    Proceed to Payment
                                </Button>
                            }
                            {
                                fieldsFilled && !loading && paid &&
                                <Button className="px-12" block>
                                    Create campaign
                                </Button>
                            }
                        </div>
                    </div>
                </div>
            </div>
            {
                isModalOpen &&
                <Suspense fallback={<>Loading</>}>
                    <PaymentModal className="w-full" isModalOpen={isModalOpen} closeModal={() => { setIsModalOpen(false) }} formDetails={formDetails} payCallback={()=>{ setPaid(true)}}/>
                </Suspense>
            }
        </div>
    )
}
export default NewCampaign