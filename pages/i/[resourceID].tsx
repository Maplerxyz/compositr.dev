import type { GetServerSidePropsContext, NextPage } from "next";
import ImageBox from "../../components/img/display/Image";

const Image: NextPage = (props: any) => {
  const { resourceID } = props;

  return (
    <div className="flex h-screen justify-center items-center">
        <ImageBox resourceID={resourceID as string} />
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
