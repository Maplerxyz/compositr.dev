import type { GitHubAPIRepo } from "@/pages/index";
import { GoStar, GoRepoForked } from "react-icons/go";

export default function RepoCard(props: { repo: GitHubAPIRepo }) {
  const { repo } = props;
  return (
    <div
      className="border-slate-500 hover:border-sky-500 delay-75 duration-300 transition-all border not-prose rounded h-full cursor-pointer hover:scale-105 even:hover:-rotate-1 odd:hover:rotate-1 flex flex-col p-3 w-full"
      onClick={() => window.open(repo.html_url, "_blank")?.focus()}
    >
      <h3 className="font-semibold">{repo.name}</h3>
      <span className="text-gray-400 overflow-clip">{repo.description}</span>
      <div className="mt-auto flex flex-row justify-between gap-6">
        <span className="flex flex-row items-center">{repo.language}</span>
        <span>
          <div className="inline-block align-middle">
            <GoStar className="w-5 h-5" />
          </div>{" "}
          <div className="inline-block align-middle">
            {repo.stargazers_count}
          </div>
        </span>
        <span>
          <div className="inline-block align-middle">
            <GoRepoForked className="w-5 h-5" />
          </div>{" "}
          <div className="inline-block align-middle">{repo.forks_count}</div>
        </span>
      </div>
    </div>
  );
}
