import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
const API_BASE_URL = import.meta.env.VITE_BASE_URL;
function EnquiryList() {
    const [enquiries, setEnquiries] = useState([])

    const [editId, setEditId] = useState(null)
    const [editData, setEditData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    })
   
    // ================= FETCH =================
    const getEnquiries = async () => {
        try {
            const res = await axios.get(
                `${API_BASE_URL}/enquiryList`
            )
            setEnquiries(
                Array.isArray(res.data.enquiries) ? res.data.enquiries : []
            )
        } catch (err) {
            console.log('failed in fetching enquiries', err)
        }
    }

    useEffect(() => {
        getEnquiries()
    }, [])

    // ================= DELETE =================
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            'Are you sure you want to delete this enquiry?'
        )
        if (!confirmDelete) return

        try {
            const res = await axios.delete(
                `${API_BASE_URL}/enquiryDelete/${id}`
            )

            if (res.data.status === 1) {
                setEnquiries(prev =>
                    prev.filter(item => item._id !== id)
                )
            }
        } catch (err) {
            console.log('delete failed', err)
        }
    }

    // ================= EDIT =================
    const handleEdit = (item) => {
        setEditId(item._id)
        setEditData({
            name: item.name,
            email: item.email,
            phone: item.phone,
            message: item.message
        })
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setEditData(prev => ({ ...prev, [name]: value }))
    }

    const handleUpdate = async (Id) => {
        try {
            const res = await axios.put(
                `${API_BASE_URL}/enquiryUpdate/${editId}`,
                editData
            )

            if (res.data.status === 1) {
                setEditId(null)
                getEnquiries()
            }
        } catch (err) {
            console.log('update failed', err)
        }
    }

    const handleCancel = () => {
        setEditId(null)
    }

    // ================= UI =================
    return (
        <div className='m-10'>
            <h2 className='text-[20px] font-bold mb-3'>Enquiry List</h2>

            <table className='w-full border border-gray-300'>
                <thead className='bg-gray-300'>
                    <tr>
                        <th className='border p-2'>Name</th>
                        <th className='border p-2'>Email</th>
                        <th className='border p-2'>Phone</th>
                        <th className='border p-2'>Message</th>
                        <th className='border p-2'>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {enquiries.length === 0 ? (
                        <tr>
                            <td colSpan="5" className='text-center p-4'>
                                No enquiries found
                            </td>
                        </tr>
                    ) : (
                        enquiries.map(item => (
                            <tr key={item._id}>
                                {/* NAME */}
                                <td className='border p-2'>
                                    {editId === item._id ? (
                                        <input
                                            type='text'
                                            name='name'
                                            value={editData.name}
                                            onChange={handleChange}
                                            className='border p-1 w-full'
                                        />
                                    ) : (
                                        item.name
                                    )}
                                </td>

                                {/* EMAIL */}
                                <td className='border p-2'>
                                    {editId === item._id ? (
                                        <input
                                            type='email'
                                            name='email'
                                            value={editData.email}
                                            onChange={handleChange}
                                            className='border p-1 w-full'
                                        />
                                    ) : (
                                        item.email
                                    )}
                                </td>

                                {/* PHONE */}
                                <td className='border p-2'>
                                    {editId === item._id ? (
                                        <input
                                            type='text'
                                            name='phone'
                                            value={editData.phone}
                                            onChange={handleChange}
                                            className='border p-1 w-full'
                                        />
                                    ) : (
                                        item.phone
                                    )}
                                </td>

                                {/* MESSAGE */}
                                <td className='border p-2'>
                                    {editId === item._id ? (
                                        <input
                                            type='text'
                                            name='message'
                                            value={editData.message}
                                            onChange={handleChange}
                                            className='border p-1 w-full'
                                        />
                                    ) : (
                                        item.message
                                    )}
                                </td>

                                {/* ACTION */}
                                <td className='border p-2 text-center'>
                                    {editId === item._id ? (
                                        <>
                                            <button
                                                onClick={() =>
                                                    handleUpdate(item._id)
                                                }
                                                className='text-green-600 mr-3'
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={handleCancel}
                                                className='text-gray-600'
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                className='text-blue-600 mr-3'
                                                onClick={() =>
                                                    handleEdit(item)
                                                }
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDelete(item._id)
                                                }
                                                className='text-red-600'
                                            >
                                                <FaTrash />
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default EnquiryList
