"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Nav = () => {
    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false);
    const {data: session} = useSession();

    useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders();

            setProviders(response);
        }
        setUpProviders();
    }, [])
    return (
        <nav className="flex-between w-full mb-16 pt-3">
            <Link className="flex gap-2 flex-center" href='/'>
                <Image
                    src="/assets/images/logo.svg"
                    alt='promtopia logo'
                    width={30}
                    height={30}
                    className='object-contain'
                />
                <p className='logo_text'>Promtopia</p>
            </Link>
            {/* desktop navigation */}
            <div className="sm:flex hidden">
                {session?.user ?
                    (
                        <div className='flex gap-3 md:gap-5'>
                            <Link
                                href='/create-prompt'
                                className='black_btn'>
                                Create Post
                            </Link>
                            <button
                                type='button'
                                onClick={signOut}
                                className='outline_btn'
                            >
                                SignOut
                            </button>
                            <Link href="/profile">
                                <Image
                                    src="/assets/images/logo.svg"
                                    alt='profile'
                                    width={37}
                                    height={37}
                                    className='rounded-full'
                                />
                            </Link>
                        </div>
                    ) : (
                        <>
                            {
                                providers && Object.values(providers).map(
                                    (provider:any) => {
                                        (
                                            <button
                                                type='button'
                                                key={provider.name}
                                                onClick={() => signIn(provider.id)}
                                                className='black_btn'
                                            >
                                                SignIn
                                            </button>
                                        )
                                    }
                                )
                            }
                        </>
                    )
                }
            </div>
            {/* mobile navigation */}
            <div className="sm:hidden flex relative">
                {
                    session?.user ? (
                        <div className="flex">
                            <Image
                                src="/assets/images/logo.svg"
                                alt='profile'
                                width={37}
                                height={37}
                                className='rounded-full'
                                onClick={() => { setToggleDropdown((prev) => !prev) }}
                            />
                            {
                                toggleDropdown && (
                                    <div className="dropdown">
                                        <Link
                                            href='/profile'
                                            className='dropdown_link'
                                            onClick={() => setToggleDropdown(false)}
                                        >
                                            My Profile
                                        </Link>
                                        <Link
                                            href='/create-prompt'
                                            className='dropdown_link'
                                            onClick={() => setToggleDropdown(false)}
                                        >
                                            Create Prompt
                                        </Link>
                                        <button
                                            type='button'
                                            onClick={()=>{
                                                setToggleDropdown(false);
                                                signOut();
                                            }}
                                            className='mt-5 w-full black_btn'
                                        >
                                            SignOut
                                        </button>
                                    </div>
                                )
                            }
                        </div>
                    ) : (
                        <>
                            {
                                providers && Object.values(providers).map(
                                    (provider:any) => {
                                        (
                                            <button
                                                type='button'
                                                key={provider.name}
                                                onClick={() => signIn(provider.id)}
                                                className='black_btn'
                                            >
                                                SignIn
                                            </button>
                                        )
                                    }
                                )
                            }
                        </>
                    )
                }
            </div>
        </nav>
    )
}

export default Nav
