import React from "react";
import { getProviders, signIn } from "next-auth/react";
import SinginBtn from "@/components/client";

export async function getServerSideProps() {
  const providers = await getProviders();
  // console.log(providers, "qwertyujhgfdx");

  return providers;
}
const a = await getServerSideProps();

const page = async () => {
  // const providers = getProviders();

  // console.log("====================================");
  console.log(a, "qwertyuio74108520852");
  // console.log("====================================");
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-black text-white p-3 rounded-md m-2">LOGIN BUTTON</div>

      {Object.values(await a).map((item) => (
        <>
          <div key={item.name}>
            <SinginBtn item={item} />
          </div>
        </>
      ))}
    </div>
  );
};

export default page;
