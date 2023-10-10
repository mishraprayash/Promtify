"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession(null);
  const [providers, setProviders] = useState();
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    // setting up the provider for nextauth.
    const connectProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    connectProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Promtify Logo"
          height={30}
          width={30}
        />
        <p className="logo_text">Promptify</p>
      </Link>
      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Prompt
            </Link>
            <button type="button" className="outline_btn" onClick={signOut}>
              SignOut
            </button>
            <Link href="/profile" className="">
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
                <button
                  type="button"
                  onClick={() => signIn('google')}
                  className="mt-5 w-full black_btn"
                >
                  Sign In with Google
                </button>
              }
          </>
        )}
      </div>
      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  className="dropdown_link"
                  href="/create-prompt"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  SignOut
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers && (
              <button
                type="button"
                className="mt-5 w-full black_btn"
                onClick={() => signIn("google")}
              >Sign In with Google</button>
            )}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
