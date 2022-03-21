import StandardProps from "../../../typings/components/utility/StandardProps";

export default function Box(props: StandardProps & {className?: string}) {
  return (
    <div className={"p-6 shadow shadow-xl rounded-xl justify-center text-center bg-hex-323232 " + props.className}>
      {props.children}
    </div>
  );
}
