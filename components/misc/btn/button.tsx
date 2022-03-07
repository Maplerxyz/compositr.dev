interface Props {
  children?: any;
  onClick: (e: any) => any;
  colourStyle: string;
}

export default function Button(props: Props) {
  return (
    <button
      className={`${props.colourStyle} hover:${props.colourStyle.replace(
        /-[0-9]+/,
        "-600"
      )} text-white font-bold py-2 px-4 rounded`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}