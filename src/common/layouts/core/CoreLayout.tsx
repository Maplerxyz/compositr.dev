import NavBar from "@/common/components/core/Nav/NavBar";
import type CoreProps from "@/common/typings/core/CoreProps";

export default function CoreLayout(props: CoreProps) {
  return (
    <>
      <div className="bg-gradient-to-bl from-black to-[#070a12] flex flex-row justify-center min-h-screen text-white">
        <NavBar />
        <main className="mt-24">{props.children}</main>
      </div>
    </>
  );
}
