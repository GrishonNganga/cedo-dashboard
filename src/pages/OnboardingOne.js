import React, { useEffect, useState, useRef } from "react"
import { Link, useHistory } from 'react-router-dom'

import { userStore } from '../stores'

import { Label, Input, Button } from '@windmill/react-ui'
import welcome from '../assets/img/welcome.png'

import { firebaseUploadImg, updateUserFields } from '../api/endpoints'
import { getDownloadURL } from 'firebase/storage';

const OnboardingOne = () => {
    const initialDetails = {
        company_name: "",
        location: "",
        logo: ""
    }
    const initialUploadDetails = {
        uploadProgress: 0,
        isUploading: false,
        uploadingComplete: false,
    }
    const history = useHistory();
    const user = userStore(state => state.user)
    const storeUser = userStore(state => state.storeUser)
    const [updateFields, setUpdateFields] = useState(initialDetails)
    const [uploadDetails, setUploadDetails] = useState(initialUploadDetails)
    const [fieldsFilled, setFieldsFilled] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        console.log(user)
        if(user?.company_name !== "" && user?.location !== "" && user?.logo !== ""){
            history.push('/app/dashboard')
        }
    })
    useEffect(() => {
        checkFieldsFilled()
    }, [updateFields])

    const logoRef = useRef(null)

    const handleChange = (e) => {
        e.persist()
        setUpdateFields(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
    }

    const clickLogoRef = () => {
        logoRef.current.click()
    }

    const checkFieldsFilled = () => {
        if (updateFields.company_name !== "" && updateFields.location !== "" && updateFields.logo !== "") {
            setFieldsFilled(true)
            return true
        } else {
            if (fieldsFilled) {
                setFieldsFilled(false)
            }
            return false
        }
    }

    const handleSubmit = () => {
        if (checkFieldsFilled()) {
            setLoading(true)
            updateUserFields(updateFields).then((response) => {
                if (response?.status === 200) {
                    storeUser(response.data.user)
                    history.push("/onboarding/step-2")
                }
            })

        }
    }

    const handleUpload = (e) => {
        setUploadDetails(prevState => ({ ...prevState, "isUploading": true }))
        const uploadTask = firebaseUploadImg(e.target.files[0])
        uploadTask.on("state_changed", (snapshot) => {
            const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
            setUploadDetails(prevState => ({ ...prevState, "uploadProgress": prog }))
        }, (err) => {
        }, () => {
            getDownloadURL(uploadTask.snapshot.ref).then(url => {
                setUploadDetails(prevState => ({ ...prevState, "isUploading": false, "uploadingComplete": true }))
                setUpdateFields(prevState => ({ ...prevState, "logo": url }))
            })
        })
    }

    return (
        <div className="w-full h-screen flex justify-center items-center bg-gray-100">
            <div className="w-full p-4 md:p-0 md:w-3/4 bg-white flex rounded">
                <div className="hidden md:flex md:w-1/2 items-center justify-center md:-mr-4">
                    <div className="">
                        <img src={welcome} loading="lazy" className="w-full object-fit" />
                    </div>
                </div>
                <div className="w-full md:w-1/2 flex flex-col justify-center md:pr-2 md:py-4">
                    <div className="text-4xl text-gray-700 tracking-wider font-black">
                        Welcome to Cedo
                    </div>
                    <div className="text-gray-600 mt-3">
                        We connect brands like yours to consumers who give a f***...
                    </div>
                    <div className="text-gray-600 mb-5">
                        Let's get you started.
                    </div>
                    <div className="flex flex-col md:flex-row justify-between gap-x-3">
                        <div>
                            <Label>
                                <span>Company Name</span>
                                <Input name="company_name" className="mt-1" type="text" placeholder="Coca Cola" onChange={handleChange} />
                            </Label>
                        </div>
                        <div>
                            <Label>
                                <span>Company Location</span>
                                <Input name="location" className="mt-1" type="text" placeholder="Nairobi, Kenya" onChange={handleChange} />
                            </Label>
                        </div>
                    </div>
                    <div className="mt-3 text-gray-700 text-sm">
                        Upload company logo
                    </div>
                    {
                        !uploadDetails?.isUploading && !uploadDetails.uploadingComplete &&
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
                                    <Button className="mt-2" block layout="outline" onClick={clickLogoRef}>
                                        Browse
                                    </Button>
                                    <input type="file" className="hidden" ref={logoRef} onChange={handleUpload} />
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
                            <div className="h-3 bg-yellow-400 rounded-full" style={{ width: `${uploadDetails.uploadProgress}%` }}>

                            </div>
                        </div>
                    }
                    {
                        uploadDetails.uploadingComplete &&
                        <div className="w-1/5 mt-3">
                            <img src={updateFields.logo} />
                        </div>
                    }
                    <div className="flex justify-center w-full mt-8">
                        <div className="w-3/4">
                            {
                                fieldsFilled && !loading &&
                                <Button block onClick={handleSubmit}>
                                    Update
                                </Button>
                            }
                            {
                                (!fieldsFilled || loading) &&
                                <Button block onClick={handleSubmit} disabled>
                                    Update
                                </Button>
                            }

                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default OnboardingOne