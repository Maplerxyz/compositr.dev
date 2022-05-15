import NavBarButton from "./NavBarButton";

export default function NavBar() {
  return (
    <nav className="fixed z-[999] w-full sm:w-[80%] lg:w-[50rem] md:rounded-lg bg-slate-600/30 sm:border sm:border-slate-700 bg-opacity-80 backdrop-blur-lg sm:flex flex-row justify-between sm:mt-4 py-4 sm:py-2 px-2">
      <div className="">
        <NavBarButton href="/">Home</NavBarButton>
        <NavBarButton href="/contact">Contact Me</NavBarButton>
      </div>
    </nav>
  );
}
