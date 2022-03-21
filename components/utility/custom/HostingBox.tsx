import Link from "next/link";
import { ReactNode } from "react";
import StandardProps from "../../../typings/components/utility/StandardProps";
import Box from "../container/Box";

interface Props {
  title: string;
  icon: Element | ReactNode;
  description: string;
  href?: string;
  hrefString?: string
}

export default function HostingBox(props: Props & Partial<StandardProps>) {
  return (
    <Box className="flex-auto">
      <div className="text-center items-center flex flex-col items-center justify-center p-3 grow gap-y-3">
        {props.icon}
        <h1 className="text-xl font-semibold mb-3">{props.title}</h1>
        <span>{props.description}</span>
        {props.href ? <Link href={props.href} passHref><span className="text-sky-300 hover:underline">
          {props.hrefString}</span></Link> : null}
      </div>
    </Box>
  );
}
