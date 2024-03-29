import NavBarButton from "./NavBarButton";

export default function NavBar() {
  return (
    <nav className="fixed z-[999] w-full sm:w-[80%] lg:w-[50rem] md:rounded-lg bg-nord1/50 sm:border sm:border-nord0 bg-opacity-80 backdrop-blur-lg flex justify-center sm:justify-evenly sm:mt-4 py-4 sm:py-2 px-2">
      <div className="">
        <NavBarButton href="/">Home</NavBarButton>
        <NavBarButton href="/contact">Contact Me</NavBarButton>
        {/* <NavBarButton href="https://blog.compositr.dev">Blog</NavBarButton> */}
      </div>
    </nav>
  );
}
