import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function NavBar() {
  const [hidden, setHidden] = useState(true);
  return (
    <nav className="bg-card-bg">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setHidden(!hidden)}
            >
              <span className="sr-only">Open main menu</span>

              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>

              <svg
                className="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <Image
                className="block lg:hidden h-8 w-auto"
                src="/compositr.png"
                alt="Compositr"
                width={38}
                height={38}
                layout="fixed"
                priority
              />
              <span className="ml-2 font-semibold">Compositr</span>
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <Link href="/" passHref>
                  <span className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Home
                  </span>
                </Link>
                <Link href="/socials" passHref>
                  <span className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Socials
                  </span>
                </Link>
                <Link href="/blog" passHref>
                  <span className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Blog
                  </span>
                </Link>
                <Link href="/hosting" passHref>
                  <span className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Hosting
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"></div>
        </div>
      </div>

      <div className={`sm:hidden ${hidden ? "hidden" : ""}`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-2">
          <Link href="/" passHref>
            <span className="text-gray-300 bg-gray-700 focus:bg-gray-900 hover:text-white px-3 py-2 rounded-md text-base font-medium block text-center">
              Home
            </span>
          </Link>
          <Link href="/socials" passHref>
            <span className="text-gray-300 bg-gray-700 focus:bg-gray-900 hover:text-white px-3 py-2 rounded-md text-base font-medium block text-center">
              Socials
            </span>
          </Link>
          <Link href="/blog" passHref>
            <span className="text-gray-300 bg-gray-700 focus:bg-gray-900 hover:text-white px-3 py-2 rounded-md text-base font-medium block text-center">
              Blog
            </span>
          </Link>
          <Link href="/hosting" passHref>
            <span className="text-gray-300 bg-gray-700 focus:bg-gray-900 hover:text-white px-3 py-2 rounded-md text-base font-medium block text-center">
              Hosting
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
