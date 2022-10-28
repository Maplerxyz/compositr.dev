import NavBar from "@/common/components/core/Nav/NavBar";
import type CoreProps from "@/common/typings/core/CoreProps";

export default function CoreLayout(props: CoreProps) {
  return (
    <>
      <div className="bg-page-bg flex flex-row justify-center min-h-screen text-white sm:p-0 px-6 font-sans">
        <NavBar />
        <main className="mt-24">{props.children}</main>
      </div>
    </>
  );
}
