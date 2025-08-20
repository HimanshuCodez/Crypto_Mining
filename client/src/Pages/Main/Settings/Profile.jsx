import React, { useEffect, useState } from 'react'
import Sidebar from '../../../Sidebar/Sidebar' // ✅ renamed to Sidebar for clarity
import useAuthStore from '../../../store/authStore'
import axios from 'axios';
import { FaUser, FaEnvelope, FaGlobe, FaMobileAlt, FaLock } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Profile = () => {
    const { user, setUser } = useAuthStore();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState('');
    const [mobile, setMobile] = useState('');
    const [transactionPassword, setTransactionPassword] = useState('Not Available');
    const [selectedAvatar, setSelectedAvatar] = useState('');

    const avatars = [
        'https://i.pinimg.com/736x/8c/6d/db/8c6ddb5fe6600fcc4b183cb2ee228eb7.jpg',
        'https://i.pinimg.com/736x/2c/85/25/2c85255a895e07476af7010c765dc21d.jpg',
        'https://i.pinimg.com/736x/c2/ee/3d/c2ee3d3c8d1c91c21fb796750dc042ae.jpg',
        'https://i.pinimg.com/736x/41/83/7d/41837deb45987e224ba518b6bad4e48c.jpg',
        'https://i.pinimg.com/736x/20/66/99/206699b44b5cbe16450c19da611d73c7.jpg',
        'https://i.pinimg.com/736x/0b/8c/1e/0b8c1efc356dcca61f6a46657e8e0f95.jpg',
        'https://i.pinimg.com/736x/be/09/81/be0981c4652679ab4db74f764d405132.jpg',
        'https://i.pinimg.com/1200x/33/68/c4/3368c4cf650b851ed3f13b87bc882db9.jpg',
        'https://i.pinimg.com/736x/3b/de/a5/3bdea5f546bb0eae992501ddbbb71394.jpg',
        'https://i.pinimg.com/736x/41/fe/f5/41fef57b408c18bf2229b382b4562df4.jpg',
        'https://i.pinimg.com/736x/e5/59/43/e5594307621cc83a9eb1e5f15cb957e0.jpg',
        'https://i.pinimg.com/736x/52/33/20/5233204aae9643a84ce2ca4407299c2a.jpg',
    ];

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('/api/user/profile');
                setUser(response.data);
            } catch (error) {
                console.error('Failed to fetch user profile:', error);
            }
        };

        if (!user) {
            fetchProfile();
        } else {
            setName(user.name || '');
            setEmail(user.email || '');
            setCountry(user.country || '');
            setMobile(user.mobile || '');
            setSelectedAvatar(user.avatar || '');
        }
    }, [user, setUser]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedData = { name, email, country, mobile };
            const response = await axios.put('/api/user/profile', updatedData);
            setUser(response.data);
            toast.success('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Failed to update profile. Please try again.');
        }
    };

    const handleAvatarSelect = async (avatarUrl) => {
        setSelectedAvatar(avatarUrl);
        try {
            const response = await axios.put('/api/user/avatar', { avatar: avatarUrl });
            setUser(response.data);
            toast.success('Avatar updated successfully!');
        } catch (error) {
            console.error('Error updating avatar:', error);
            toast.error('Failed to update avatar. Please try again.');
        }
    };

    return (
        <div className="flex min-h-screen">
            {/* Sidebar fixed on the left */}
            <Sidebar />

            {/* Main Content */}
            <div className=" w-[78vw] flex flex-col gap-6 p-6 md:p-10  bg-[#F7F7F7]">
                <div className="flex flex-col justify-start items-start gap-2">
                    <h2 className="text-4xl font-medium capitalize font-[Inter]">Profile</h2>
                    <nav className="flex items-center gap-1 capitalize font-light text-sm font-[Inter]">
                        <a href="/">home</a><span>/</span>
                        <a href="/settings">settings</a><span>/</span>
                        <a href="/profile" className="text-[#02AC8F]">profile</a>
                    </nav>
                </div>

                <div className="bg-white w-full rounded-3xl p-10 shadow">
                    {/* Avatar Section */}
                    <div className="flex flex-col justify-center items-center gap-5">
                        <div className="rounded-full text-xl w-[10rem] h-[10rem] border border-[#31B8A1] overflow-hidden">
                            {selectedAvatar && (
                                <img src={selectedAvatar} alt="User Avatar" className="w-full h-full object-cover" />
                            )}
                        </div>
                        <span className="flex flex-col justify-center items-center">
                            <h2 className="font-semibold">{name}</h2>
                            <h2 className="font-medium">{email}</h2>
                        </span>
                    </div>

                    {/* Avatar Selection */}
                    <div className="flex flex-col items-center gap-4 mt-5">
                        <h3 className="text-lg font-medium">Choose your avatar:</h3>
                        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
                            {avatars.map((avatarUrl, index) => (
                                <img
                                    key={index}
                                    src={avatarUrl}
                                    alt={`Avatar ${index + 1}`}
                                    className={`w-16 h-16 rounded-full cursor-pointer border-2 ${selectedAvatar === avatarUrl ? 'border-[#31B8A1]' : 'border-transparent'}`}
                                    onClick={() => handleAvatarSelect(avatarUrl)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Profile Form */}
                    <form onSubmit={handleSubmit} className="mt-6">
                        <div className="flex flex-col gap-6">
                            <label htmlFor="name" className="flex flex-col justify-start items-start gap-2">
                                <span className="text-sm capitalize text-black font-medium">Name</span>
                                <span className="flex w-full">
                                    <div className="w-20 p-2 border border-r-[#F4F4F4] bg-[#F4F4F4] rounded-l-full flex items-center justify-center">
                                        <FaUser className="text-[#31B8A1]" />
                                    </div>
                                    <input type="text" className="outline-none w-full border rounded-r-full p-2"
                                        name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                                </span>
                            </label>

                            <span className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <label htmlFor="email" className="flex flex-col justify-start items-start gap-2">
                                    <span className="text-sm capitalize text-black font-medium">Email</span>
                                    <span className="flex w-full">
                                        <div className="w-20 p-2 border border-r-[#F4F4F4] bg-[#F4F4F4] rounded-l-full flex items-center justify-center">
                                            <FaEnvelope className="text-[#31B8A1]" />
                                        </div>
                                        <input type="email" className="outline-none w-full border rounded-r-full p-2"
                                            name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </span>
                                </label>
                                <label htmlFor="country" className="flex flex-col justify-start items-start gap-2">
                                    <span className="text-sm capitalize text-black font-medium">Country</span>
                                    <span className="flex w-full">
                                        <div className="w-20 p-2 border border-r-[#F4F4F4] bg-[#F4F4F4] rounded-l-full flex items-center justify-center">
                                            <FaGlobe className="text-[#31B8A1]" />
                                        </div>
                                        <input type="text" className="outline-none w-full border rounded-r-full p-2"
                                            name="country" id="country" value={country} onChange={(e) => setCountry(e.target.value)} />
                                    </span>
                                </label>
                            </span>

                            <span className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <label htmlFor="mobile" className="flex flex-col justify-start items-start gap-2">
                                    <span className="text-sm capitalize text-black font-medium">Mobile</span>
                                    <span className="flex w-full">
                                        <div className="w-20 p-2 border border-r-[#F4F4F4] bg-[#F4F4F4] rounded-l-full flex items-center justify-center">
                                            <FaMobileAlt className="text-[#31B8A1]" />
                                        </div>
                                        <input type="tel" className="outline-none w-full border rounded-r-full p-2"
                                            name="mobile" id="mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} />
                                    </span>
                                </label>
                                <label htmlFor="transactionPassword" className="flex flex-col justify-start items-start gap-2">
                                    <span className="text-sm capitalize text-black font-medium">Transaction password</span>
                                    <span className="flex w-full">
                                        <div className="w-20 p-2 border border-r-[#F4F4F4] bg-[#F4F4F4] rounded-l-full flex items-center justify-center">
                                            <FaLock className="text-[#31B8A1]" />
                                        </div>
                                        <input type="password" className="outline-none w-full border rounded-r-full p-2"
                                            name="transactionPassword" id="transactionPassword" value={transactionPassword} readOnly />
                                    </span>
                                </label>
                            </span>

                            <div className="flex justify-end">
                                <button type="submit"
                                    className="bg-[#31B8A1] rounded-3xl capitalize text-black font-medium text-lg px-8 py-2 hover:scale-105 transition-all ease-in">
                                    Update
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
