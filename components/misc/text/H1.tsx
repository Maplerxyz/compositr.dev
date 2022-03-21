import StandardProps from "../../../typings/components/utility/StandardProps";

export default function H1(props: StandardProps & { className?: string }) {
  return <h1 className={"text-4xl font-semibold " + props.className}>{props.children}</h1>;
}
