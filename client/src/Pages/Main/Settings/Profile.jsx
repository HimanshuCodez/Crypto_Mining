import React, { useEffect, useState } from 'react'
import Navbar from '../../../Sidebar/Sidebar'
import useAuthStore from '../../../store/authStore'
import axios from 'axios';
import { FaUser, FaEnvelope, FaGlobe, FaMobileAlt, FaLock } from 'react-icons/fa'; // Import icons
import { toast } from 'react-toastify'; // Import toast

const Profile = () => {
    const { user, setUser } = useAuthStore(); // Destructure setUser from the store
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState('');
    const [mobile, setMobile] = useState('');
    const [transactionPassword, setTransactionPassword] = useState('Not Available'); // Add transactionPassword state
    const [selectedAvatar, setSelectedAvatar] = useState(''); // State for selected avatar

    // Define avatar images (placeholder URLs)
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
                setUser(response.data); // Update the user in the Zustand store
            } catch (error) {
                console.error('Failed to fetch user profile:', error);
                // Optionally, handle error, e.g., redirect to login or show a message
            }
        };

        if (!user) { // Only fetch if user is not already in the store
            fetchProfile();
        } else { // If user is already in the store, populate form fields
            setName(user.name || '');
            setEmail(user.email || '');
            setCountry(user.country || '');
            setMobile(user.mobile || '');
            setSelectedAvatar(user.avatar || ''); // Set selected avatar from user data
            // transactionPassword is not from user, so it remains "Not Available"
        }
    }, [user, setUser]); // Add setUser to dependency array

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedData = { name, email, country, mobile };
            const response = await axios.put('/api/user/profile', updatedData);
            setUser(response.data); // Update Zustand store with updated user data
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
            setUser(response.data); // Update Zustand store with updated user data
            toast.success('Avatar updated successfully!');
        } catch (error) {
            console.error('Error updating avatar:', error);
            toast.error('Failed to update avatar. Please try again.');
        }
    };

    return (
        <div className='w-full flex flex-col gap-6 p-4 sm:p-6 md:p-10'> {/* Adjusted padding */}

            <div className='flex flex-col justify-start items-start gap-2'>
                <h2 className='text-4xl font-medium capitalize font-[Inter]'>profile</h2>
                <nav className='flex items-center gap-1 capitalize font-light text-sm font-[Inter]'>
                    <a href="/">home</a><span>/</span><a href="/settings">settings</a><span>/</span><a href="/profile" className='text-[#02AC8F]'>profile</a>
                </nav>
            </div>
            <div className='bg-[#FFFFFF] w-full rounded-4xl p-10'> {/* Changed bg-amber-800 to bg-[#FFFFFF] */}
                <div className='flex flex-col justify-center items-center gap-5'>
                    <div className='rounded-full text-xl w-[10rem] h-[10rem] border border-[#31B8A1] overflow-hidden'>
                        {selectedAvatar && <img src={selectedAvatar} alt="User Avatar" className="w-full h-full object-cover" />}
                    </div>
                    <span className='flex flex-col justify-center items-center '>
                        <h2 className=' font-semibold'>{name}</h2>
                        <h2 className='font-medium '>{email}</h2>
                    </span>
                </div>

                <div className='flex flex-col items-center gap-4 mt-5'>
                    <h3 className='text-lg font-medium'>Choose your avatar:</h3>
                    <div className='grid grid-cols-3 sm:grid-cols-6 gap-4'>
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

                <form onSubmit={handleSubmit}> {/* Added onSubmit handler */}
                    <div className='flex flex-col gap-6'>
                        <label htmlFor="name" className='flex flex-col justify-start items-start gap-2'>
                            <span className='text-sm capitalize text-black font-medium'>name</span>
                            <span className='flex w-full'><div className='w-20 p-2 border border-r-[#F4F4F4] bg-[#F4F4F4] rounded-l-full flex items-center justify-center'><FaUser className='text-[#31B8A1]' /></div> <input type="text" className='outline-none w-full border rounded-r-full p-2' name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} /></span>
                        </label>
                        <span className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 items-center w-full gap-6'> {/* Adjusted grid columns */}
                            <label htmlFor="email" className='flex flex-col justify-start items-start gap-2'>
                                <span className='text-sm capitalize text-black font-medium'>Email</span>
                                <span className='flex w-full'><div className='w-20 p-2 border border-r-[#F4F4F4] bg-[#F4F4F4] rounded-l-full flex items-center justify-center'><FaEnvelope className='text-[#31B8A1]' /></div> <input type="email" className='outline-none w-full border rounded-r-full p-2' name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} /></span>
                            </label>
                            <label htmlFor="country" className='flex flex-col justify-start items-start gap-2'>
                                <span className='text-sm capitalize text-black font-medium'>Country</span>
                                <span className='flex w-full'><div className='w-20 p-2 border border-r-[#F4F4F4] bg-[#F4F4F4] rounded-l-full flex items-center justify-center'><FaGlobe className='text-[#31B8A1]' /></div> <input type="text" className='outline-none w-full border rounded-r-full p-2' name="country" id="country" value={country} onChange={(e) => setCountry(e.target.value)} /></span>
                            </label>
                        </span>
                        <span className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 items-center w-full gap-6'> {/* Adjusted grid columns */}
                            <label htmlFor="tel" className='flex flex-col justify-start items-start gap-2'>
                                <span className='text-sm capitalize text-black font-medium'>mobile</span>
                                <span className='flex w-full'><div className='w-20 p-2 border border-r-[#F4F4F4] bg-[#F4F4F4] rounded-l-full flex items-center justify-center'><FaMobileAlt className='text-[#31B8A1]' /></div> <input type="tel" className='outline-none w-full border rounded-r-full p-2' name="mobile" id="mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} /></span>
                            </label>
                            <label htmlFor="transactionPassword" className='flex flex-col justify-start items-start gap-2'>
                                <span className='text-sm capitalize text-black font-medium'>Transaction password</span>
                                <span className='flex w-full'><div className='w-20 p-2 border border-r-[#F4F4F4] bg-[#F4F4F4] rounded-l-full flex items-center justify-center'><FaLock className='text-[#31B8A1]' /></div> <input type="password" className='outline-none w-full border rounded-r-full p-2' name="transactionPassword" id="transactionPassword" value={transactionPassword} readOnly /></span>
                            </label>
                        </span>
                        <div className='flex justify-end'><button type="submit" className='bg-[#31B8A1]  rounded-3xl capitalize text-black font-medium text-lg px-8 py-2 scale-100 hover:scale-105 transition-all ease-in'>update</button></div> {/* Added type="submit" */}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Profile