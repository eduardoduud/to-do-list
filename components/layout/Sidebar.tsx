import { BsBellFill, BsHouseFill, BsBookmarkDash, BsThreeDots } from 'react-icons/bs'
import { FaUser } from 'react-icons/fa'
import { FiMail, FiSettings } from 'react-icons/fi'
import { BiHash, BiLogOut } from 'react-icons/bi'
import { signOut } from 'next-auth/react';

import SidebarLogo from './SidebarLogo';
import SidebarItem from './SidebarItem';
import SidebarTweetButton from './SidebarTweetButton';

import useCurrentUser from '@/hooks/useCurrentUser';


const Sidebar = () => {
    const { data: currentUser } = useCurrentUser();
    const itemsSigned = [
        {
            key: 0,
            label: 'Home',
            href: '/',
            icon: BsHouseFill,
        },
        {
            key: 1,
            label: 'Explore',
            href: '/',
            icon: BiHash,
        },
        {
            key: 2,
            label: 'Notifications',
            href: '/notifications',
            icon: BsBellFill,
            alert: currentUser?.hasNotification,
        },
        {
            key: 3,
            label: 'Messages',
            href: '/',
            icon: FiMail,
        },
        {
            key: 4,
            label: 'Bookmarks',
            href: '/',
            icon: BsBookmarkDash,
        },
        {
            key: 5,
            label: 'Profile',
            href: `/users/${currentUser?.id}`,
            icon: FaUser,
        },
        {
            key: 6,
            label: 'More',
            icon: BsThreeDots,
        },
        {
            key: 7,
            label: 'Logout',
            icon: BiLogOut,
            onClick: signOut
        }
    ]

    const itemsUnsigned = [
        {
            key: 0,
            label: 'Explore',
            href: '/',
            icon: BiHash,
        },
        {
            key: 1,
            label: 'Settings',
            href: '/',
            icon: FiSettings,
        },
    ]

    return ( 
        <div className='col-span-1 h-full pr-4 md:pr-6'>
            <div className='flex flex-col items-end'>
                <div className='space-y-2 lg:w-[230px]'>
                    <SidebarLogo />
                    {currentUser && itemsSigned.map((item) => (
                        <SidebarItem 
                        key={item.key}
                        href={item.href}
                        label={item.label}
                        icon={item.icon}
                        onClick={item.onClick}
                        alert={item.alert}
                        />
                    ))}
                    {!currentUser && itemsUnsigned.map((item) => (
                        <SidebarItem 
                        key={item.key}
                        href={item.href}
                        label={item.label}
                        icon={item.icon}
                        />
                    ))}
                    <SidebarTweetButton />
                </div>
            </div>
        </div>
     );
}
 
export default Sidebar;