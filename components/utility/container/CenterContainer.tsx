import StandardProps from "../../../typings/components/utility/StandardProps";

export default function CenterContainer(props: StandardProps) {
  return (
    <div className="py-12 overflow-y-hidden">
      <div className="w-full px-6">{props.children}</div>
    </div>
  );
}
