import Image from "next/image";
import { useEffect, useState } from "react";
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
      <div className="text-center p-6 rounded-xl">
        <h1 className="text-xl">
          {meta.filename} by {meta.owner}
        </h1>
        <Image
          src={`/api/v1/img/${props.resourceID}`}
          alt={`${meta.filename} by ${meta.owner}`}
          layout="fixed"
          width={meta.width}
          height={meta.height}
        ></Image>
      </div>
    </>
  );
}
