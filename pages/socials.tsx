import { NextPage } from "next";
import Head from "next/head";
import SocialBox from "../components/utility/custom/SocialBox";
import {
  IconBrandDiscord,
  IconBrowser,
  IconBrandGithub,
  IconMail,
  IconBrandTelegram,
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandStackoverflow,
} from "@tabler/icons";
import H1 from "../components/misc/text/H1";

const Socials: NextPage = () => {
  return (
    <>
      <Head>
        <title>Compositr | Socials</title>
      </Head>
      <div className="text-center mt-4">
        <H1>Socials</H1>
      </div>
      <div className="flex flex-row gap-y-6 gap-x-6 p-12 justify-center flex-wrap grow">
        <SocialBox
          social="Discord"
          icon={<IconBrandDiscord width={42} height={42} />}
          account="Compositr#6969"
          href="https://discord.com/users/342539533546422272"
        />
        <SocialBox
          social="Website"
          icon={<IconBrowser width={42} height={42} />}
          account="compositr.dev"
          href="/"
        />
        <SocialBox
          social="GitHub"
          icon={<IconBrandGithub width={42} height={42} />}
          account="Compositr"
          href="https://github.com/Compositr"
        />
        <SocialBox
          social="Email"
          icon={<IconMail width={42} height={42} />}
          account="compositr@compositr.dev"
        />
        <SocialBox
          social="Telegram"
          icon={<IconBrandTelegram width={42} height={42} />}
          account="@Compositr"
          href="https://t.me/Compositr"
        />
        <SocialBox
          social="Twitter"
          icon={<IconBrandTwitter width={42} height={42} />}
          account="@Compositr"
          href="https://twitter.com/Compositr"
        />
        <SocialBox
          social="YouTube"
          icon={<IconBrandYoutube width={42} height={42} />}
          account="Compositr"
        />
        <SocialBox
          social="Stack Overflow"
          icon={<IconBrandStackoverflow width={42} height={42} />}
          account="Compositr"
          href="https://stackoverflow.com/users/17011740/compositr"
        />
      </div>
    </>
  );
};

export default Socials;
