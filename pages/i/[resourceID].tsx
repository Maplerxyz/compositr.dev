import type { GetServerSidePropsContext, NextPage } from "next";
import ImageBox from "../../components/img/display/Image";
import CenterBox from "../../components/utility/container/centerbox";

const Image: NextPage = (props: any) => {
  const { resourceID } = props;

  return (
    <CenterBox>
      <ImageBox resourceID={resourceID as string} />
    </CenterBox>
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
