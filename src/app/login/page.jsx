"use client";

import React from "react";
import { getProviders, signIn } from "next-auth/react";
import SinginBtn from "@/components/client";

// export async function getServerSideProps() {
//   const providers = await getProviders();
//   // console.log(providers, "qwertyujhgfdx");

//   return providers;
// }
// const a = await getServerSideProps();

const page = async () => {
  const providers = await getProviders();

  console.log("====================================");
  console.log(providers, "qwertyuio74108520852");
  console.log("====================================");
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-black text-white p-3 rounded-md m-2">LOGIN BUTTON</div>
      {providers ? (
        <>
          <div key={providers.spotify.name}>
            <SinginBtn item={providers.spotify} />
          </div>
        </>
      ) : (
        <>
          <div>Error</div>
        </>
      )}
    </div>
  );
};

export default page;
