import { Uploaded } from "../../../pages/i/upload";
import Image from "next/image";
import Link from "next/link";

export default function ThumbnailBar(props: { uploaded: Uploaded[] }) {
  const { uploaded } = props;

  if (!uploaded.length) return null;
  return (
    <div className="bg-card-bg rounded-xl p-6 mt-4 border">
      <div className="flex flex-row flex-wrap content-evenly">
        {uploaded.map((upload, i) => {
          if (!upload.resourceID)
            return (
              <div
                key={upload.uuid}
                className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 p-2 animate-pulse text-center"
              >
                <div className="w-24 bg-gray-300 h-24 rounded-md"></div>
              </div>
            );
          return (
            <div
              key={upload.uuid}
              className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 p-2 text-center"
            >
              <Image
                src={`/api/v1/img/${upload.resourceID}`}
                alt={"Uploaded image"}
                className="w-24 h-24 object-cover"
                layout="responsive"
                height={96}
                width={96}
              />
              <p className="text-center justify-center text-blue-500 hover:underline">
                <Link href={`/i/${upload.resourceID}`} >{upload.filename}</Link>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
