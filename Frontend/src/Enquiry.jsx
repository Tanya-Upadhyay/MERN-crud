import React, { useState } from 'react'
import axios from 'axios'
import EnquiryList from './EnquiryList'
const API_BASE_URL = import.meta.env.VITE_BASE_URL;
function Enquiry() {


    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const saveEnquiry = async (e) => {
        e.preventDefault()

        try {
            await axios.post(
                `${API_BASE_URL}/insert`,
                formData
            )
            setFormData({
                name: '',
                email: '',
                phone: '',
                message: ''
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <h1 className='text-[40px] text-center font-bold'>User Enquiry</h1>

            <div className='grid grid-cols-[40%_auto] gap-5'>
                
                <div className='bg-gray-200 p-5 m-10 rounded-md'>
                    <h2 className='text-[20px] font-bold text-center mb-5'>
                        Enquiry Form
                    </h2>

                    <form className='space-y-4' onSubmit={saveEnquiry}>
                        <input
                            type='text'
                            name='name'
                            value={formData.name}
                            onChange={handleChange}
                            placeholder='Name'
                            className='w-full p-2 border rounded-md'
                        />

                        <input
                            type='email'
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            placeholder='Email'
                            className='w-full p-2 border rounded-md'
                        />

                        <input
                            type='text'
                            name='phone'
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder='Phone'
                            className='w-full p-2 border rounded-md'
                        />

                        <textarea
                            name='message'
                            value={formData.message}
                            onChange={handleChange}
                            placeholder='Message'
                            className='w-full p-2 border rounded-md'
                        ></textarea>

                        <button className='bg-blue-500 text-white p-2 rounded-md'>
                            Submit
                        </button>
                    </form>
                </div>

                <EnquiryList />
            </div>
        </div>
    )
}

export default Enquiry
