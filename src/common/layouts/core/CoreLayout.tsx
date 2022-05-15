import type CoreProps from "@/common/typings/core/CoreProps";

export default function CoreLayout(props: CoreProps) {
  return <main>{props.children}</main>;
}
