import type { NextConfig } from "next";

const githubPagesRepository = "na-yubileynoy-landing";
const isGithubPagesBuild = process.env.GITHUB_PAGES === "true";
const githubPagesBasePath = `/${githubPagesRepository}`;

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isGithubPagesBuild ? githubPagesBasePath : undefined,
  assetPrefix: isGithubPagesBuild ? `${githubPagesBasePath}/` : undefined,
  images: {
    unoptimized: true
  }
};

export default nextConfig;
