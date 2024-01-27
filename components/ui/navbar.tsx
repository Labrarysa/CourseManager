import React from 'react';
import Link from 'next/link'

//Navbar component 
// It could be dynamic later based on different type of users.
// if the user is logged in we could add an icon, remove a button,etc.

interface NavbarProps {
    organizationName: string;
}

const Navbar: React.FC<NavbarProps> = ({ organizationName })  => {
  return (
    <nav className="">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">

            <Link href="/"> {/*This link should route to الصفجة الرئيسية page */}
                <span className= "font-bold text-xl">{organizationName}</span>
            </Link>

            </div>
          </div>
          <div>
            <Link href="/"> {/*This link should route to أنشئ حساب جديد page */}
                <button className="mr-2 bg-gray-700 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded">
                إنشاء حساب 
                </button>
            </Link>
                   
            <Link href="/"> {/*This link should route to تسجيل دخول page */}
                <button className="mr-2 bg-transparent hover:bg-gray-700 font-bold py-2 px-4 border border-gray-700 hover:border-transparent rounded">
                تسجيل دخول
                </button>
            </Link>    

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;