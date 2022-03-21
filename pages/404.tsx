import LinkButton from "../components/misc/btn/linkButton";
import H1 from "../components/misc/text/H1";
import CenterBox from "../components/utility/container/centerbox";

export default function NotFound() {
  return (
    <CenterBox>
      <H1>404 - Page Not Found</H1>
      <p className="mt-2 mb-4">
        The page you were looking for couldn&apos;t be found.
      </p>
      <LinkButton href={"/"} colourStyle={"bg-compositr mr-3"}>
        Home
      </LinkButton>
      <LinkButton href={"/socials"} colourStyle={"bg-emerald-500"}>
        Socials
      </LinkButton>
    </CenterBox>
  );
}
