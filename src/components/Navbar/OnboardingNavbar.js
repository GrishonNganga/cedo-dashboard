import React from "react"
export const Navbar = () => {
    return (
        <div className="w-full flex justify-center bg-yellow-300 p-5 ">
            <div className="w-full md:w-3/4 flex justify-between items-center">
                <div className="text-2xl text-white font-black tracking-wider">
                    Cedo
                </div>
                <div className="flex gap-x-3 items-center">
                    <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center font-gray-700 font-black">
                        K
                    </div>
                    <div className="hidden md:block text-sm text-white">
                        kishy.gikish@gmail.com
                    </div>
                    <div className="text-white ">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}