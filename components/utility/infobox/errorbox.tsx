export default function ErrorBox(props: any) {
  return (
    <div className="bg-hex-da5255 border border-[2.5px] border-red-500 p-6 rounded flex flex-row">
      <div className="mr-2">
        <span className="text-5xl">❗</span>
      </div>
      <div className="">
        <p className="font-bold text-left">Something went wrong</p>
        <p className="text-left">{props.children}</p>
      </div>
    </div>
  );
}
