import { IconFile, IconLink, IconNews, IconPhoto, IconServer } from "@tabler/icons";
import { NextPage } from "next";
import H1 from "../../components/misc/text/H1";
import HostingBox from "../../components/utility/custom/HostingBox";

const Hosting: NextPage = () => {
  return (
    <>
      <H1 className="text-center mt-4">Compositr&apos;s Hosting</H1>
      <p className="text-center text-xl">
        Invite-only hosting services, by Compositr. Once you get an invite,
        hosting is free of charge! Check out some of our services below.
      </p>
      <div className="flex flex-wrap flex-row p-6 justify-center gap-6 mt-5">
        <HostingBox
          title="Image Hosting"
          icon={<IconPhoto height={32} width={32} />}
          description="Public image hosting with unlimited storage. Upload GIF, PNG, JPG, and more."
          href="/i/rules"
          hrefString="Image Rules"
        />
        <HostingBox
          title="Static Website Hosting"
          icon={<IconLink height={32} width={32} />}
          description="Static website hosting with no bandwidth or size limits. You'll get a custom path, like compositr.dev/h/example."
          href="/socials"
          hrefString="Reach out via Discord to arrange"
        />
        <HostingBox
          title="Private File Storage"
          icon={<IconFile height={32} width={32} />}
          description="Coming soon..."
        />
        <HostingBox
          title="Private Backup"
          icon={<IconServer height={32} width={32} />}
          description="Coming soon..."
        />
        <HostingBox
          title="Blog"
          icon={<IconNews height={32} width={32} />}
          description="We're building this right now! Get your own blog with us, and post articles on this site"
        />
      </div>
    </>
  );
};

export default Hosting;
