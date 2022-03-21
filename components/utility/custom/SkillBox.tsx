import Link from "next/link";
import { ReactNode } from "react";
import StandardProps from "../../../typings/components/utility/StandardProps";

interface Props {
  href: string;
  skill: string;
  icon?: Element | ReactNode;
}
export default function SkillBox(props: StandardProps & Props) {
  return (
    <a href={props.href} target="_blank" rel="noreferrer">
      <>
        <div className="bg-black rounded rounded-full border border-white p-3 text-center hover:(text-black bg-white) duration-300 transition-colors">
          {props.icon ? (
            <div className="inline-block mr-2 align-middle">{props.icon}</div>
          ) : null}
          <span className="align-middle">{props.skill}</span>
        </div>
      </>
    </a>
  );
}
