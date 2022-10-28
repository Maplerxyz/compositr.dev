import TechBar from "@/common/components/bars/Tech/TechBar";
import RepoCard from "@/common/components/cards/Repo/RepoCard";
import Link from "next/link";
import {
  SiDeno,
  SiDocker,
  SiEthereum,
  SiExpress,
  SiFastify,
  SiGit,
  SiGitea,
  SiGithub,
  SiJavascript,
  SiLinux,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiNpm,
  SiPostman,
  SiRailway,
  SiReact,
  SiRedis,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVisualstudiocode,
  SiYarn,
} from "react-icons/si";

export default function Index(props: {
  stars: number;
  forks: number;
  topRepos: [GitHubAPIRepo, GitHubAPIRepo, GitHubAPIRepo, GitHubAPIRepo];
}) {
  return (
    <div className="prose prose-white text-white">
      <h1>
        Hello World! I&apos;m <span className="text-compositr">Compositr</span>{" "}
        👋
      </h1>
      <p>
        I am a self-taught (mostly!) coder and crypto enthusiast. I enjoy
        working with code and computers in general, and I use TypeScript as my
        main language. This is my little corner of the web, where you can see
        what I&apos;m currently working on, or{" "}
        <Link href="/contact">contact me.</Link>
      </p>

      <h2>What I work with</h2>
      <p>
        Shown below is a list of technologies and languages I&apos;ve had
        experience with in the past, or use currently.
      </p>
      <TechBar
        icons={[
          SiReact,
          SiTypescript,
          SiYarn,
          SiNpm,
          SiNextdotjs,
          SiTailwindcss,
          SiExpress,
          SiVisualstudiocode,
          SiNodedotjs,
          SiGit,
          SiGithub,
          SiJavascript,
          SiVercel,
          SiMongodb,
          SiEthereum,
          SiRedis,
          SiDocker,
          SiDeno,
          SiLinux,
          SiRailway,
          SiFastify,
          SiPostman,
          SiGitea,
        ]}
      />
      <h2>What I am working on</h2>
      <p>
        Below is a small sample of my most popular open-source projects which I
        am currently working on. See my full list of projects over on{" "}
        <a
          href="https://github.com/compositr"
          target={"_blank"}
          rel="noreferrer"
        >
          GitHub
        </a>{" "}
        page. So far, these projects have earnt me{" "}
        <strong>{props.stars}</strong> stars and <strong>{props.forks}</strong>{" "}
        forks.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-2 w-full mb-24 gap-2">
        {props.topRepos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const { stars, forks } = await fetch(
    `https://api.github-star-counter.workers.dev/user/compositr`
  ).then((res) => res.json());
  const repos: GitHubAPIRepo[] = await fetch(
    `https://api.github.com/users/compositr/repos?type=owner&per_page=10&sort=updated`
  ).then((res) => res.json());

  // Get top 4 by stargazers
  const topRepos = repos
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 4);
  return {
    props: {
      stars,
      forks,
      topRepos,
    },
    // Revalidate minute
    revalidate: 60,
  };
}
export interface GitHubAPIRepo {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: Owner;
  html_url: string;
  description: null | string;
  fork: boolean;
  url: string;
  forks_url: string;
  keys_url: string;
  collaborators_url: string;
  teams_url: string;
  hooks_url: string;
  issue_events_url: string;
  events_url: string;
  assignees_url: string;
  branches_url: string;
  tags_url: string;
  blobs_url: string;
  git_tags_url: string;
  git_refs_url: string;
  trees_url: string;
  statuses_url: string;
  languages_url: string;
  stargazers_url: string;
  contributors_url: string;
  subscribers_url: string;
  subscription_url: string;
  commits_url: string;
  git_commits_url: string;
  comments_url: string;
  issue_comment_url: string;
  contents_url: string;
  compare_url: string;
  merges_url: string;
  archive_url: string;
  downloads_url: string;
  issues_url: string;
  pulls_url: string;
  milestones_url: string;
  notifications_url: string;
  labels_url: string;
  releases_url: string;
  deployments_url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  git_url: string;
  ssh_url: string;
  clone_url: string;
  svn_url: string;
  homepage: null | string;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: null | string;
  has_issues: boolean;
  has_projects: boolean;
  has_downloads: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  forks_count: number;
  mirror_url: null;
  archived: boolean;
  disabled: boolean;
  open_issues_count: number;
  license: License | null;
  allow_forking: boolean;
  is_template: boolean;
  topics: string[];
  visibility: Visibility;
  forks: number;
  open_issues: number;
  watchers: number;
  default_branch: DefaultBranch;
}

export enum DefaultBranch {
  Main = "main",
  Master = "master",
}

export interface License {
  key: string;
  name: string;
  spdx_id: string;
  url: string;
  node_id: string;
}

export interface Owner {
  login: Login;
  id: number;
  node_id: NodeID;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: FollowingURL;
  gists_url: GistsURL;
  starred_url: StarredURL;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: EventsURL;
  received_events_url: string;
  type: Type;
  site_admin: boolean;
}

export enum EventsURL {
  HTTPSAPIGithubCOMUsersCompositrEventsPrivacy = "https://api.github.com/users/Compositr/events{/privacy}",
}

export enum FollowingURL {
  HTTPSAPIGithubCOMUsersCompositrFollowingOtherUser = "https://api.github.com/users/Compositr/following{/other_user}",
}

export enum GistsURL {
  HTTPSAPIGithubCOMUsersCompositrGistsGistID = "https://api.github.com/users/Compositr/gists{/gist_id}",
}

export enum Login {
  Compositr = "Compositr",
}

export enum NodeID {
  MDQ6VXNlcjQzNDA1MDUw = "MDQ6VXNlcjQzNDA1MDUw",
}

export enum StarredURL {
  HTTPSAPIGithubCOMUsersCompositrStarredOwnerRepo = "https://api.github.com/users/Compositr/starred{/owner}{/repo}",
}

export enum Type {
  User = "User",
}

export enum Visibility {
  Public = "public",
}
