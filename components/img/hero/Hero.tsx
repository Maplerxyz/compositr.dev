import Link from "next/link";
import React, { useState } from "react";
import CenterContainer from "../../utility/container/CenterContainer";

function Index() {
  const [show, setShow] = useState(false);
  return (
    <CenterContainer>
      <div className="mt-8 relative rounded-lg bg-compositr bg-opacity-80 container mx-auto flex flex-col items-center pt-12 sm:pt-24 pb-24 sm:pb-12 lg:(pb-24 pb-24) xl:(pb-48 pt-48)">
        <div className="w-11/12 sm:w-2/3 mb-5 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center text-white font-bold leading-tight">
            Compositr
          </h1>
        </div>
        <div className="flex justify-center items-center mb-10 sm:mb-20">
          <h2 className="text-md sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-center text-white font-bold">
            Developer, Crypto Backer and Human
          </h2>
        </div>
        <div className="flex justify-center items-center mb-10 sm:mb-20 flex-col md:flex-row gap-y-3">
          <Link passHref href="https://github.com/compositr">
            <span className="hover:bg-white hover:text-compositr lg:text-xl hover:border-compositr ml-3 sm:ml-6 bg-transparent transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 ring-offset-indigo-700 focus:ring-white hover:bg-indigo-700-800 rounded border border-white text-white px-4 sm:px-8 py-1 sm:py-3 text-sm">
              My GitHub
            </span>
          </Link>
          <Link passHref href="/socials">
            <span className="hover:bg-white hover:text-compositr lg:text-xl hover:border-compositr ml-3 sm:ml-6 bg-transparent transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 ring-offset-indigo-700 focus:ring-white hover:bg-indigo-700-800 rounded border border-white text-white px-4 sm:px-8 py-1 sm:py-3 text-sm">
              My Socials
            </span>
          </Link>
        </div>
      </div>
    </CenterContainer>
  );
}

export default Index;
