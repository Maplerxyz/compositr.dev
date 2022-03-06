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
      <h1 className="text-2xl mb-3 font-semibold">{meta.filename}</h1>
      <h2 className="text-xl mb-3">
        ID: {meta.resourceID}{" "}
        <span className="text-gray-500">
          ({meta.width} x {meta.height})
        </span>
      </h2>
      <Image
        src={`/api/v1/img/${props.resourceID}`}
        alt={`${meta.filename} by ${meta.owner}`}
        layout="responsive"
        width={1280 > meta.width ? meta.width : 1280}
        height={720 > meta.height ? meta.height : 720}
        priority
        className="shadow rounded max-w-full h-auto align-middle border-none object-scale-down"
      />
      <div className="items-center mt-2">
        <p className="mb-4">Uploaded by {meta.owner}</p>
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
          Full Image
        </LinkButton>
      </div>
    </>
  );
}
