import ExifReader from "exifreader";
import type { GetServerSidePropsContext, NextPage } from "next";
import ImageBox from "../../components/img/display/Image";
import CenterBox from "../../components/utility/container/centerbox";
import dbConnect from "../../lib/db";
import ImageFile from "../../schema/ImageFile";
import sizeOf from "image-size";

const Image: NextPage = (props: any) => {
  const { resourceID, meta } = props;

  return (
    <CenterBox>
      <ImageBox resourceID={resourceID as string} meta={meta} />
    </CenterBox>
  );
};

export default Image;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  await dbConnect();
  const images = await ImageFile.aggregate([{ $sample: { size: 1 } }]).exec();
  const image = await ImageFile.findById(images[0]._id).exec();

  // Image has been found, now we need to get the dimensions of the image
  // Also extract EXIF data from image

  const { width, height } = sizeOf(image.raw);
  const exif = ExifReader.load(image.raw, {
    expanded: true,
  });
  const meta = {
    filename: image.filename,
    owner: image.owner,
    resourceID: image.resourceID,
    width: width || 0,
    height: width || 0,
    exif,
    size: image.size,
  };

  return {
    props: {
      meta,
      resourceID: image.resourceID,
    },
  };
}
