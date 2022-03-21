import StandardProps, {
  ClassNameExtension,
} from "../../../typings/components/utility/StandardProps";

export default function FlexBox(props: StandardProps & Partial<ClassNameExtension>) {
  return <div className={`flex flex-wrap ${props.className}`}>{props.children}</div>;
}
