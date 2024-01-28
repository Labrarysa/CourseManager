/* Navbar
this navbar will be shown when the user is not logged in.
when the user is logged in, the two buttons should be hidden and profile icon is shown (future update).
*/

"use client"
import React, { useState } from 'react';
import Link from 'next/link';

interface NavbarProps {
  organizationName: string;
}

const Navbar: React.FC<NavbarProps> = ({ organizationName }) => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div>
      <nav className="w-full fixed top-0 left-0 right-0 z-10">
        <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
          <div>
            <div className="flex items-center justify-between py-3 md:py-5 md:block">
              {/* ORGANIZATION NAME */}
              <Link href="/">
                <h2 className="text-xl font-bold ">{organizationName}</h2>
              </Link>
              {/* HAMBURGER BUTTON FOR SMALL SCREENS */}
              <div className="md:hidden">
                <button
                  className="p-2 text-gray-700 rounded-md outline-none"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <img src= {`${isMenuOpen ? '/x.png' : '/hamburger-menu.png'}`} alt="menu"
                  className='w-10 h-10'/>

                </button>
              </div>
            </div>
          </div>

          <div>
            <div
              className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                isMenuOpen ? 'p-12 md:p-0 block z-10 bg-white' : 'hidden'
              }`}
            >
              <ul className="h-screen md:h-auto items-center justify-center md:flex ">

                <li className="pb-4 text-lg py-2 md:px-6 text-center hover:text-gray-500">
                  <Link href="#"> {/*This link should go to من نحن section */}
                    من نحن
                  </Link>
                </li>

                <li className="pb-4 text-lg py-2 md:px-6 text-center hover:text-gray-500">
                  <Link href="#"> {/*This link should go to س section */}
                    س
                  </Link>
                </li>

                {/* you can add more <li> here*/}

                <li className="pb-4 text-md py-2 md:px-6 text-center">
                  <Link href="/"> {/*This link should route to أنشئ حساب جديد page */}
                    <button className=" bg-black hover:bg-gray-500 duration-500 text-white font-bold py-2 px-4 rounded">
                    إنشاء حساب
                    </button>
                  </Link>
                </li>

                <li className="pb-4 text-md py-2 md:px-6 text-center md:border-b-0">
                  <Link href="/"> {/*This link should route to تسجيل دخول page */}
                    <button className=" bg-transparent hover:bg-gray-500 duration-500 font-bold py-2 px-4 border border-gray-500 hover:border-transparent rounded">
                    تسجيل دخول
                    </button>
                  </Link>
                </li>
              </ul>
              
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar; 