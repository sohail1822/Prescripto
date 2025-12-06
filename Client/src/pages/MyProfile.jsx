import React, { useState } from 'react';
import { assets } from '../assets/assets';

const MyProfile = () => {

    const [userData, setUserData] = useState({
        name: 'Edward Vincent',
        image: assets.profile_pic,
        email: 'richardjameswap@gmail.com',
        phone: '+1 123 456 7890',
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Church Road, London'
        },
        gender: 'Male',
        dob: '2000-01-20'
    });

    const [isEdit, setIsEdit] = useState(false);

    return (
        <div className="max-w-3xl mx-auto p-6">

            {/* Profile Card */}
            <div className="bg-white shadow-md rounded-xl p-6">

                {/* Header */}
                <div className="flex items-center gap-6">
                    <img
                        src={userData.image}
                        alt=""
                        className="w-24 h-24 rounded-full object-cover border shadow-sm"
                    />

                    <div>
                        {isEdit ? (
                            <input
                                type="text"
                                value={userData.name}
                                onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))}
                                className="border p-2 rounded w-full"
                            />
                        ) : (
                            <h2 className="text-2xl font-semibold">{userData.name}</h2>
                        )}
                    </div>
                </div>

                <hr className="my-6" />

                {/* Contact Information */}
                <div className="mb-6">
                    <h3 className="font-semibold text-lg mb-3">Contact Information</h3>

                    <div className="space-y-4">

                        <div>
                            <p className="font-medium">Email:</p>
                            <p className="text-blue-600 font-medium">{userData.email}</p>
                        </div>

                        <div>
                            <p className="font-medium">Phone:</p>
                            {isEdit ? (
                                <input
                                    type="text"
                                    value={userData.phone}
                                    onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                                    className="border p-2 rounded w-full"
                                />
                            ) : (
                                <p className="text-blue-600 font-medium">{userData.phone}</p>
                            )}
                        </div>

                        <div>
                            <p className="font-medium">Address:</p>

                            {isEdit ? (
                                <div className="space-y-2">
                                    <input
                                        type="text"
                                        value={userData.address.line1}
                                        onChange={(e) =>
                                            setUserData(prev => ({
                                                ...prev,
                                                address: { ...prev.address, line1: e.target.value }
                                            }))
                                        }
                                        className="border p-2 rounded w-full"
                                    />

                                    <input
                                        type="text"
                                        value={userData.address.line2}
                                        onChange={(e) =>
                                            setUserData(prev => ({
                                                ...prev,
                                                address: { ...prev.address, line2: e.target.value }
                                            }))
                                        }
                                        className="border p-2 rounded w-full"
                                    />
                                </div>
                            ) : (
                                <p className="text-gray-700">
                                    {userData.address.line1}
                                    <br />
                                    {userData.address.line2}
                                </p>
                            )}
                        </div>

                    </div>
                </div>

                <hr className="my-6" />

                {/* Basic Information */}
                <div className="mb-6">
                    <h3 className="font-semibold text-lg mb-3">Basic Information</h3>

                    <div className="space-y-4">

                        {/* Gender */}
                        <div>
                            <p className="font-medium">Gender:</p>
                            {isEdit ? (
                                <select
                                    value={userData.gender}
                                    onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}
                                    className="border p-2 rounded w-full"
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            ) : (
                                <p className="text-gray-700">{userData.gender}</p>
                            )}
                        </div>

                        {/* DOB */}
                        <div>
                            <p className="font-medium">Birth Date:</p>
                            {isEdit ? (
                                <input
                                    type="date"
                                    value={userData.dob}
                                    onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))}
                                    className="border p-2 rounded w-full"
                                />
                            ) : (
                                <p className="text-gray-700">{userData.dob}</p>
                            )}
                        </div>

                    </div>
                </div>

                {/* Buttons */}
                <div className="text-right">
                    {isEdit ? (
                        <button
                            onClick={() => setIsEdit(false)}
                            className="
                                px-5 py-2 bg-blue-600 text-white rounded-lg
                                hover:bg-blue-700 hover:scale-105 hover:shadow-lg
                                transition-all duration-200
                            "
                        >
                            Save Information
                        </button>
                    ) : (
                        <button
                            onClick={() => setIsEdit(true)}
                            className="
                                px-5 py-2 bg-gray-800 text-white rounded-lg
                                hover:bg-gray-900 hover:scale-105 hover:shadow-lg
                                transition-all duration-200
                            "
                        >
                            Edit Profile
                        </button>
                    )}
                </div>

            </div>
        </div>
    );
};

export default MyProfile;
