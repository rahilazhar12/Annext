'use client'

import React, { useEffect, useState } from 'react'
import DashboardLayout from '../page'

const Page = () => {
    const [username, setUsername] = useState(null)

    useEffect(() => {
        const user = sessionStorage.getItem('user')
        if (user) {
            setUsername(JSON.parse(user).username)
        }
    }, [])

    return (
        <DashboardLayout>
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
                <div className="bg-white shadow-lg rounded-lg p-6 md:p-12 w-full max-w-2xl text-center">
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
                        {username ? `WELCOME ${username}` : 'WELCOME'}
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600">We're glad to have you here.</p>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default Page
