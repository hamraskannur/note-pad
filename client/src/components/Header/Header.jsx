"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ToastContainers from "../Toast/ToastContainer";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const token = localStorage.getItem("token");

  const logOut=()=>{
    localStorage.clear()
    router.push("/login")
  }
  return (
    <header className="bg-gray-50 dark:bg-gray-900">
              <ToastContainers />
      <div className="mx-auto flex h-20 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <a
          className="block text-slate-700 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <span className="sr-only">Home</span>
          <h1 className=" text-3xl font-bold">
            Note Pad<strong className="dark:text-white text-black">.</strong>
          </h1>
        </a>

        <div className="flex flex-1 items-center justify-end ">
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              {!token ? (
                <>
                  <button
                    className="block  rounded-md bg-slate-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-500"
                    onClick={() => router.push("/login")}
                  >
                    Login
                  </button>

                  <button
                    className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:text-slate-500 sm:block"
                    onClick={() => router.push("/register")}
                  >
                    Register
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => router.push("/page")}
                    className="block   rounded-md bg-slate-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-500"
                  >
                    Create a new note
                  </button>
                  <button
                    className="block  rounded-md bg-slate-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-500"
                    onClick={logOut}
                  >
                    Log out
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
