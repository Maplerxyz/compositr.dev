import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Compositr</title>
      </Head>
      <div className="flex h-screen justify-center items-center">
        <div className="text-center p-6 rounded-xl border-gray-200 border shadow-inner">
          <h1 className="text-3xl">Hol&apos;up</h1>
          <p className="text-xl">We&apos;re not done yet!</p>
          <p className="text-xl">Website under construction</p>
        </div>
      </div>
    </>
  );
};

export default Home;
