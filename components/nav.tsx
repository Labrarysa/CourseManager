"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Button } from "./ui/button";
// import ModeToggle from "./modeToggle";

export default function Nav() {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  // Variants for Framer Motion animation
  const navVariants = {
    hidden: { opacity: 0, scale: 0.95, y: "-8%" },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.2 },
    },
  };

  const underlineVariants = {
    hidden: { width: 0 },
    visible: { width: "100%", transition: { duration: 0.3 } },
  };

  return (
    <header
      className="fixed z-50 flex flex-wrap w-full py-8 text-sm sm:justify-start sm:flex-nowrap"
      style={{ backgroundImage: "url('/assets/navBackground.png')" }}
    >
      <nav
        className=" max-w-[80rem] w-full mx-auto md:px-10 px-9 sm:flex sm:items-center sm:justify-between"
        aria-label="Global"
      >
        <div className="flex items-center justify-between">
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: 20 }}
            transition={{ delay: 0.25 }}
          >
            <a
              className="flex items-center justify-center text-xl font-semibold text-center "
              href="/"
            >
              <div className="flex items-center justify-center gap-1 text-center">
                {/* <Image
                  src="/assets/logo.svg"
                  width={50}
                  height={50}
                  className="w-6 h-auto md:w-9"
                  alt="logo"
                /> */}
                <h1 className="text-2xl font-extrabold tracking-tight scroll-m-20 lg:text-3xl rounded-xl">
                  دورة الإمام المنتظر
                </h1>
              </div>
            </a>
          </motion.div>

          <button
            type="button"
            className="sm:hidden"
            aria-label="Toggle navigation"
            onClick={() => setIsNavExpanded(!isNavExpanded)}
          >
            {/* Hamburger Icon */}
            <motion.div
              animate={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -20 }}
              transition={{ delay: 0.25 }}
              onClick={() => setIsNavExpanded((prevToggle) => !prevToggle)}
              className={`burger cursor-pointer space-y-1.5 xl:hidden lg:hidden mr-5
        `}
            >
              <motion.span
                animate={{
                  rotate: isNavExpanded ? 45 : 0, // Rotate the top line 45 degrees to form one leg of the 'X'
                  y: isNavExpanded ? 8.3 : 0, // Adjust the 'y' to move it down to meet the middle line
                }}
                className="block h-0.5 w-6 bg-black"
              ></motion.span>

              <motion.span
                animate={{
                  opacity: isNavExpanded ? 0 : 1, // Hide the middle span by fading it out
                }}
                className="block h-0.5 w-6 bg-black"
              ></motion.span>

              <motion.span
                animate={{
                  rotate: isNavExpanded ? -45 : 0, // Rotate the bottom line -45 degrees to form the other leg of the 'X'
                  y: isNavExpanded ? -8.3 : 0, // Adjust the 'y' to move it up to meet the middle line
                }}
                className="block h-0.5 w-6 bg-black"
              ></motion.span>
            </motion.div>
          </button>
        </div>

        {/* Navigation Links for large screens */}
        <motion.div
          className="relative hidden text-xl sm:flex"
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: -20 }}
          transition={{ delay: 0.24 }}
        >
          {[
            "معدل الأرباح",
            "حاسبة الأسهم",
            "حاسبة القروض",
            "تحويل العملات",
          ].map((item) => (
            <a
              key={item}
              className="relative mx-6 font-bold transition-all duration-200 text-primary delay-50"
              href={`/${item.toLowerCase()}`}
              onMouseEnter={() => setActiveLink(item)}
              onMouseLeave={() => setActiveLink("")}
              onClick={() => setActiveLink(item)}
            >
              {item}
              <motion.span
                className="absolute -bottom-2 left-0 items-center bg-black h-0.5"
                variants={underlineVariants}
                initial="hidden"
                animate={activeLink === item ? "visible" : "hidden"}
              />
            </a>
          ))}
        </motion.div>

        {/* Navigation Links for small screens */}
        <AnimatePresence>
          {isNavExpanded && (
            <motion.div
              variants={navVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="fixed left-0 z-40 flex flex-col items-center justify-center w-3/5 gap-5 py-6 mt-4 ml-5 text-lg text-center shadow-2xl rounded-2xl text-primary"
            >
              <a className="w-5/6 my-2 font-semibold " href="/">
                معدل الأرباح
              </a>
              <a className="w-5/6 my-2 font-semibold" href="/">
                حاسبة الأسهم
              </a>
              <a className="w-5/6 my-2 font-semibold" href="/">
                حاسبة القروض
              </a>
              <a className="w-5/6 my-2 font-semibold" href="/">
                تحويل العملات
              </a>
              <Button className="w-5/6 py-5 font-bold shadow-2xl rounded-xl text-md">
                تسجيل الدخول
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="flex gap-2 max-sm:hidden"
          animate={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -20 }}
          transition={{ delay: 0.25 }}
        >
          <Button className="font-bold bg-black rounded-lg shadow-2xl hover:bg-neutral-800">
            تسجيل الدخول
          </Button>
          {/* <ModeToggle /> */}
        </motion.div>
      </nav>
    </header>
  );
}
