import type CoreProps from "@/common/typings/core/CoreProps";
import Link from "next/link";
import { useRouter } from "next/router";

export default function NavBarButton(props: CoreProps & { href: string }) {
  const router = useRouter();
  return (
    <Link passHref href={props.href}>
      <button
        role={"link"}
        type="button"
        className={`p-2 hover:text-white rounded-md text-gray-400 mr-2 ${
          router.pathname === props.href
            ? "bg-slate-600/50 border-compositr border"
            : "hover:bg-slate-600/10"
        }`}
      >
        {props.children}
      </button>
    </Link>
  );
}
