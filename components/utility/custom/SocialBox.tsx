import Link from "next/link";
import { ReactNode } from "react";
import StandardProps from "../../../typings/components/utility/StandardProps";
import Box from "../container/Box";

interface Props {
  social: string;
  icon: Element | ReactNode;
  href?: string;
  account: string;
}

export default function SocialBox(props: Props & Partial<StandardProps>) {
  return (
    <Box className="flex-auto">
      <div className="text-center items-center flex flex-col items-center justify-center p-4 grow gap-y-3">
        {props.icon}
        <h1 className="text-2xl font-semibold mb-3">{props.social}</h1>
        {props.href ? (
          <a href={props.href} target="_blank" rel="noreferrer">
            <span className="text-sky-300 hover:underline">{props.account}</span>
          </a>
        ) : (
          <span>
            {props.account}
          </span>
        )}
      </div>
    </Box>
  );
}
