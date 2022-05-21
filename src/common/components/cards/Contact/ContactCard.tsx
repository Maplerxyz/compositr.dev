import type { ReactElement } from "react";

export default function ContactCard({ icon, name, href }: Props) {
  return (
    <div
      className="items-center flex cursor-pointer border hover:border-sky-500 border-slate-500 hover:scale-110 even:hover:rotate-1 odd:hover:-rotate-1 transition-transform delay-75 duration-300 rounded-xl p-3 mt-4 first:mt-0"
      onClick={() => {
        if (href) window.open(href, "_blank")?.focus();
      }}
    >
      <div className="inline-block align-middle mr-2">{icon}</div>
      <div className="inline-block align-middle not-prose text-white mr-3">
        {name}
      </div>
    </div>
  );
}

interface Props {
  icon: ReactElement;
  name: string;
  href?: string;
}
