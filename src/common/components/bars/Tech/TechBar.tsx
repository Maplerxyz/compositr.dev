import type { IconType } from "react-icons";

export default function TechBar({ icons }: Props) {
  return (
    <div className="p-4 mx-1 my-2 flex-row flex-wrap flex w-full justify-center gap-2 gap-y-3 md:justify-evenly border border-compositr/60 rounded-xl shadow-lg shadow-compositr/50">
      {icons.map((icon: IconType, i) => (
        <div key={i} className="inline-block">
          {icon({ className: "h-6 w-6" })}
        </div>
      ))}
    </div>
  );
}

interface Props {
  icons: IconType[];
}
