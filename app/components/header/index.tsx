import React from 'react'
import Input from './Input'
import { BiSolidBellRing } from 'react-icons/bi'
import Image from 'next/image'
import man from "@/assets/images/man.png"

const Header = () => {
    return (
        <div className='flex justify-between border p-2'>
            <Input />
            <div className='flex gap-5 items-center'>
                <BiSolidBellRing className='cursor-pointer text-xl' />
                <div className='flex gap-3'>
                    <Image className='object-contain'
                        width={40} height={40} src={man} alt='user' />
                    <div>
                        <h4 className='font-semibold'>Ece ALI</h4>
                        <p>Admin</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
