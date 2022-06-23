import React, { useState } from "react"
import { Link } from 'react-router-dom'

import { Label, Input, Button, Dropdown, Textarea } from '@windmill/react-ui'

const OnboardingTwo = () => {

    const [adType, setAdType] = useState(null)

    return (
        <div className="w-full h-screen flex justify-center items-center bg-gray-100">
            <div className="w-3/4 bg-white flex rounded">
                <div className="w-1/2 flex flex-col justify-center pr-2 p-4 px-6">
                    <div className="text-3xl text-gray-700 tracking-wider font-black">
                        Start your first campaign
                    </div>
                    <div className="mt-4">
                        <Label>
                            <span>Campaign Name</span>
                            <Input className="mt-1" type="text" placeholder="Ex: Experience a new Coke" />
                        </Label>
                    </div>
                    <div className="mt-3">
                        <Label>
                            <span>Campaign Description</span>
                            <Textarea rows="5" placeholder="Sweet description of the campaign" />
                        </Label>
                    </div>
                    <div className="mt-3">
                        <Label>
                            <span>Tageted Demographic</span>
                        </Label>
                    </div>
                    <div className="flex gap-x-3 mt-1">
                        <Label check>
                            <Input type="checkbox" />
                            <span className="ml-1">
                                Female
                            </span>
                        </Label>
                        <Label check>
                            <Input type="checkbox" />
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
                        <Input className="mt-1" type="number" placeholder="" />
                        <div>
                            To:
                        </div>
                        <Input className="mt-1" type="number" placeholder="" />
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
                                    adType &&
                                    <div className="flex items-center justify-center    ">
                                        <div className="text-xs">
                                            &#40;{adType}&#41;
                                        </div>
                                        <div className="w-3/4 text-xs flex gap-x-4">
                                            <div className="text-yellow-300 hover:underline flex items-center cursor-pointer" onClick={() => { setAdType(null) }}>
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
                            !adType &&
                            <div className="w-full flex justify-center mt-2">
                                <div className="w-3/4 flex gap-x-3">
                                    <div className="w-1/3 p-8 border rounded-md hover:bg-yellow-100 cursor-pointer flex flex-col items-center justify-center gap-y-1" onClick={() => { setAdType("Survey") }}>
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                            </svg>
                                        </div>
                                        <div className="font-bold tracking-wider">
                                            Survey
                                        </div>
                                    </div>
                                    <div className="w-1/3 p-8 border rounded-md hover:bg-yellow-100 cursor-pointer flex flex-col items-center justify-center gap-y-1" onClick={() => { setAdType("Video") }}>
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
                            adType === "Video" &&
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
                                                <Button className="mt-2" block layout="outline">
                                                    Browse
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                    <div className="flex justify-end w-full mt-8 p-4 px-8 gap-x-4">
                        <div className="">
                            <Button className="px-12" block layout="outline" tag={Link} to="app/dashboard">
                                Cancel
                            </Button>
                        </div>
                        <div className="">
                            <Button className="px-12" block tag={Link} to="/app/dashboard">
                                Finish
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default OnboardingTwo