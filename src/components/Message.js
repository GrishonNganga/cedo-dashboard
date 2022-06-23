import React from "react";
export const Message = ({type, message}) => {
    return (
        <div className={` rounded-lg border ${type !== "success"? "border-red-300 bg-red-50": "border-green-300 bg-green-50"} p-3 shadow-lg`}>
            <div className="flex items-center space-x-2">
                <div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-6 w-6 ${type !== "success"? "text-red-500": "text-green-500"}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </div>
                <div className="">
                    <span className="block text-gray-500 text-xs">
                        {message}
                    </span>
                </div>
            </div>
        </div>
    );
}