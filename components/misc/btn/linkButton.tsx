interface Props {
  children?: any;
  onClick?: (e: any) => any;
  colourStyle: string;
  download?: boolean;
  href: string
}

export default function LinkButton(props: Props) {
  return (
    <a
      download={props.download}
      className={`${props.colourStyle} hover:${props.colourStyle.replace(
        /-[0-9]+/,
        "-600"
      )} text-white font-bold py-2 px-4 rounded`}
      onClick={props.onClick}
      href={props.href}
    >
      {props.children}
    </a>
  );
}
