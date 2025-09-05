import React, { useEffect, useState } from 'react';
import useAuthStore from '../../../store/authStore';
import axios from '../../../api/axios'; // Corrected import
import { FaUser, FaEnvelope, FaGlobe, FaMobileAlt, FaLock } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Profile = () => {
    const { user, setUser } = useAuthStore();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState('');
    const [mobile, setMobile] = useState('');
    const [transactionPassword] = useState('Not Available'); // It's read-only, so no setter needed
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
        // The user object is already in the store, no need to fetch again unless necessary
        if (user) {
            setName(user.name || '');
            setEmail(user.email || '');
            setCountry(user.country || '');
            setMobile(user.mobile || '');
            setSelectedAvatar(user.avatar || avatars[0]); // Default to first avatar if none is set
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedData = { name, email, country, mobile };
            const response = await axios.put('/user/profile', updatedData);
            setUser(response.data);
            toast.success('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error(error.response?.data?.message || 'Failed to update profile.');
        }
    };

    const handleAvatarSelect = async (avatarUrl) => {
        setSelectedAvatar(avatarUrl);
        try {
            const response = await axios.put('/user/avatar', { avatar: avatarUrl });
            setUser(response.data);
            toast.success('Avatar updated successfully!');
        } catch (error) {
            console.error('Error updating avatar:', error);
            toast.error(error.response?.data?.message || 'Failed to update avatar.');
        }
    };

    return (
        <div className="w-full flex flex-col gap-6 p-4 md:p-10">
            <div className="flex flex-col justify-start items-start gap-2">
                <h2 className="text-3xl md:text-4xl font-medium capitalize font-[Inter]">Profile</h2>
                <nav className="flex items-center gap-1 capitalize font-light text-sm font-[Inter]">
                    <a href="/">home</a><span>/</span>
                    <a href="/profile" className="text-[#02AC8F]">profile</a>
                </nav>
            </div>

            <div className="bg-white w-full rounded-3xl p-6 md:p-10 shadow-lg">
                {/* Avatar Section */}
                <div className="flex flex-col justify-center items-center gap-4">
                    <div className="rounded-full w-28 h-28 md:w-40 md:h-40 border-2 border-[#31B8A1] overflow-hidden">
                        {selectedAvatar && (
                            <img src={selectedAvatar} alt="User Avatar" className="w-full h-full object-cover" />
                        )}
                    </div>
                    <div className="text-center">
                        <h2 className="font-semibold text-lg md:text-xl">{name}</h2>
                        <h2 className="font-medium text-gray-600">{email}</h2>
                    </div>
                </div>

                {/* Avatar Selection */}
                <div className="flex flex-col items-center gap-4 mt-8">
                    <h3 className="text-lg font-medium">Choose your avatar:</h3>
                    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-3">
                        {avatars.map((avatarUrl, index) => (
                            <img
                                key={index}
                                src={avatarUrl}
                                alt={`Avatar ${index + 1}`}
                                className={`w-14 h-14 md:w-16 md:h-16 rounded-full cursor-pointer border-2 transition-all ${selectedAvatar === avatarUrl ? 'border-[#31B8A1] scale-110' : 'border-transparent'}`}
                                onClick={() => handleAvatarSelect(avatarUrl)}
                            />
                        ))}
                    </div>
                </div>

                {/* Profile Form */}
                <form onSubmit={handleSubmit} className="mt-10">
                    <div className="flex flex-col gap-6">
                        <label htmlFor="name" className="flex flex-col justify-start items-start gap-2">
                            <span className="text-sm capitalize text-black font-medium">Name</span>
                            <div className="flex w-full">
                                <div className="w-16 p-2 border border-r-0 bg-gray-100 rounded-l-full flex items-center justify-center">
                                    <FaUser className="text-[#31B8A1]" />
                                </div>
                                <input type="text" className="outline-none w-full border rounded-r-full p-2" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                        </label>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <label htmlFor="email" className="flex flex-col justify-start items-start gap-2">
                                <span className="text-sm capitalize text-black font-medium">Email</span>
                                <div className="flex w-full">
                                    <div className="w-16 p-2 border border-r-0 bg-gray-100 rounded-l-full flex items-center justify-center">
                                        <FaEnvelope className="text-[#31B8A1]" />
                                    </div>
                                    <input type="email" className="outline-none w-full border rounded-r-full p-2" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                            </label>
                            <label htmlFor="country" className="flex flex-col justify-start items-start gap-2">
                                <span className="text-sm capitalize text-black font-medium">Country</span>
                                <div className="flex w-full">
                                    <div className="w-16 p-2 border border-r-0 bg-gray-100 rounded-l-full flex items-center justify-center">
                                        <FaGlobe className="text-[#31B8A1]" />
                                    </div>
                                    <input type="text" className="outline-none w-full border rounded-r-full p-2" name="country" id="country" value={country} onChange={(e) => setCountry(e.target.value)} />
                                </div>
                            </label>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <label htmlFor="mobile" className="flex flex-col justify-start items-start gap-2">
                                <span className="text-sm capitalize text-black font-medium">Mobile</span>
                                <div className="flex w-full">
                                    <div className="w-16 p-2 border border-r-0 bg-gray-100 rounded-l-full flex items-center justify-center">
                                        <FaMobileAlt className="text-[#31B8A1]" />
                                    </div>
                                    <input type="tel" className="outline-none w-full border rounded-r-full p-2" name="mobile" id="mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} />
                                </div>
                            </label>
                            <label htmlFor="transactionPassword" className="flex flex-col justify-start items-start gap-2">
                                <span className="text-sm capitalize text-black font-medium">Transaction password</span>
                                <div className="flex w-full">
                                    <div className="w-16 p-2 border border-r-0 bg-gray-100 rounded-l-full flex items-center justify-center">
                                        <FaLock className="text-[#31B8A1]" />
                                    </div>
                                    <input type="password" className="outline-none w-full border rounded-r-full p-2 bg-gray-50" name="transactionPassword" id="transactionPassword" value={transactionPassword} readOnly />
                                </div>
                            </label>
                        </div>

                        <div className="flex justify-end mt-4">
                            <button type="submit"
                                className="bg-[#31B8A1] rounded-full capitalize text-white font-medium text-base md:text-lg px-8 py-2 hover:bg-[#2aa894] transition-all ease-in">
                                Update Profile
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;
