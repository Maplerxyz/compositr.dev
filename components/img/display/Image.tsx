import Image from "next/image";
import { useEffect, useState } from "react";
import LinkButton from "../../misc/btn/linkButton";
import ErrorBox from "../../utility/infobox/errorbox";

interface Props {
  resourceID: string;
}

export default function ImageBox(props: Props) {
  const [meta, setMeta] = useState<Record<string, any>>({});
  useEffect(() => {
    fetch(`/api/v1/img/meta/${props.resourceID}`)
      .then((res) => res.json())
      .then(({ data }) => setMeta(data))
      .catch((err) => setMeta({ error: err }));
  }, [props.resourceID]);

  if (!meta) return <ErrorBox>404 - Image not found</ErrorBox>;
  if (meta.error) return <span>{meta.error}</span>;
  if (!meta.width) return <span>Loading</span>;
  return (
    <>
      <div className="text-center p-6 rounded-xl object-scale-down">
        <h1 className="text-xl">
          {meta.filename} by {meta.owner}
        </h1>
        <Image
          src={`/api/v1/img/${props.resourceID}`}
          alt={`${meta.filename} by ${meta.owner}`}
          layout="fixed"
          width={1280 > meta.width ? meta.width : 1280}
          height={720 > meta.height ? meta.height : 720}
          priority
          className="object-scale-down"
        ></Image>
        <div className="items-center">
          <LinkButton
            colourStyle="bg-green-500"
            href={`/api/v1/img/${props.resourceID}${
              meta.filename.match(/\.[0-9a-z]+$/i)[0]
            }`}
            download
          >
            Download
          </LinkButton>{" "}
          <LinkButton
            colourStyle="bg-sky-500"
            href={`/api/v1/img/${props.resourceID}${
              meta.filename.match(/\.[0-9a-z]+$/i)[0]
            }`}
          >
            Direct Link
          </LinkButton>
        </div>
      </div>
    </>
  );
}
