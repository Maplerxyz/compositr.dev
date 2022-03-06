import type { GetServerSidePropsContext, NextPage } from "next";
import ImageBox from "../../components/img/display/Image";

const Image: NextPage = (props: any) => {
  const { resourceID } = props;

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="p-6 shadow shadow-xl rounded-xl justify-center text-center bg-hex-323232">
        <ImageBox resourceID={resourceID as string} />
      </div>
    </div>
  );
};

export default Image;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return {
    props: {
      resourceID: ctx.query.resourceID,
    },
  };
}
