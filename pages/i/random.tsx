import type { GetServerSidePropsContext, NextPage } from "next";
import ImageBox from "../../components/img/display/Image";
import CenterBox from "../../components/utility/container/centerbox";
import dbConnect from "../../lib/db";
import ImageFile from "../../schema/ImageFile";

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
  await dbConnect();

  const images = await ImageFile.aggregate([{ $sample: { size: 1 } }]);
  return {
    props: {
      resourceID: images[0].resourceID,
    },
  };
}
