import StandardProps, { ClassNameExtension } from "../../../typings/components/utility/StandardProps";

export default function Container(props: StandardProps & Partial<ClassNameExtension>) {
  return <div className={`container ${props.className ?? ""}`}>{props.children}</div>;
}
