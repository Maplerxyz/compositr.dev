import {
  IconAtom,
  IconAtom2,
  IconBox,
  IconBrandDiscord,
  IconBrandJavascript,
  IconBrandReactNative,
  IconBrandUbuntu,
  IconBrandVercel,
  IconCode,
  IconPackage,
} from "@tabler/icons";
import type { NextPage } from "next";
import Head from "next/head";
import Hero from "../components/img/hero/Hero";
import H1 from "../components/misc/text/H1";
import CenterContainer from "../components/utility/container/CenterContainer";
import Container from "../components/utility/container/Container";
import FlexBox from "../components/utility/container/FlexBox";
import SkillBox from "../components/utility/custom/SkillBox";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Compositr</title>
      </Head>

      <Hero />

      <CenterContainer>
        <Container className="bg-card-bg rounded-lg mx-auto relative flex flex-col items-start p-12">
          <div className="ml-2">
            <H1 className="mb-2">Skills</H1>
            <FlexBox className="gap-4">
              <SkillBox
                href="https://discord.js.org"
                skill="discord.js"
                icon={<IconBrandDiscord />}
              />
              <SkillBox
                href="https://reactjs.org"
                skill="React"
                icon={<IconAtom />}
              />
              <SkillBox href="https://nodejs.org" skill="Node.js" />
              <SkillBox
                href="https://javascript.com"
                skill="JavaScript"
                icon={<IconBrandJavascript />}
              />
              <SkillBox
                href="https://nextjs.org"
                skill="Next.js"
                icon={<IconBrandVercel />}
              />
              <SkillBox
                href="https://typescriptlang.org"
                skill="TypeScript"
                icon={<IconCode />}
              />
              <SkillBox
                href="https://yarnpkg.com"
                skill="Yarn"
                icon={<IconPackage />}
              />
              <SkillBox
                href="https://npmjs.com"
                skill="NPM"
                icon={<IconBox />}
              />
              <SkillBox
                href="https://linux.org"
                skill="Linux (Ubuntu &amp; Arch)"
                icon={<IconBrandUbuntu />}
              />
            </FlexBox>
          </div>
        </Container>
      </CenterContainer>
    </>
  );
};

export default Home;
