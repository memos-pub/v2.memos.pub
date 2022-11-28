import { Octokit } from "octokit";

const auth = process.env.GITHUB_TOKEN ?? "";

if (auth === "") console.warn("No GITHUB_TOKEN");

export const octokit = new Octokit({ auth });
