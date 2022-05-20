import type { GitHubAPIRepo } from "@/pages/index";

export default function RepoCard(props: { repo: GitHubAPIRepo }) {
  const { repo } = props;
  return (
    <div
      className="border-slate-500 hover:border-slate-400 border not-prose rounded h-full cursor-pointer transition-colors flex flex-col p-3 w-full"
      onClick={() => window.open(repo.html_url, "_blank")?.focus()}
    >
      <h3 className="font-semibold">{repo.name}</h3>
      <span className="text-gray-400 overflow-clip">{repo.description}</span>
      <div className="mt-auto flex flex-row justify-between gap-6">
        <span className="flex flex-row items-center">{repo.language}</span>
      </div>
    </div>
  );
}
