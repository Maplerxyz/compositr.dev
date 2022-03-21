import sizeOf from "image-size";
import type { GetServerSidePropsContext, NextPage } from "next";
import ImageBox from "../../components/img/display/Image";
import CenterBox from "../../components/utility/container/centerbox";
import ErrorBox from "../../components/utility/infobox/errorbox";
import dbConnect from "../../lib/db";
import ImageFile from "../../schema/ImageFile";

const Image: NextPage = (props: any) => {
  const { resourceID, meta } = props;
  if (!meta)
    return (
      <CenterBox>
        <ErrorBox>404 - Image not found</ErrorBox>
      </CenterBox>
    );

  return (
    <CenterBox>
      <ImageBox resourceID={resourceID as string} meta={meta} />
    </CenterBox>
  );
};

export default Image;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  await dbConnect();
  const { resourceID } = ctx.query;
  const image = await ImageFile.findOne({
    resourceID: resourceID,
  }).exec();

  if (!image)
    return {
      props: {
        resourceID,
      },
    };

  // Image has been found, now we need to get the dimensions of the image

  const { width, height } = sizeOf(image.raw);

  const meta = {
    filename: image.filename,
    owner: image.owner,
    resourceID: image.resourceID,
    width: width || 0,
    height: height || 0,
    size: image.size,
  };

  return {
    props: {
      resourceID,
      meta,
    },
  };
}
