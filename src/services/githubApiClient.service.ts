import axios from 'axios';
import 'dotenv/config';
import { GitHubClientInterface } from '../interfaces/githubApiClient.interface';

export class GitHubApiClient implements GitHubClientInterface {
  private baseURL: string =
    process.env.GITHUB_API_URL ?? 'https://api.github.com';
  private token: string = process.env.GITHUB_TOKEN ?? '';
  constructor(
    private owner: string,
    private repo: string,
  ) {
    if (!this.token) {
      throw new Error('GitHub token not found');
    }
  }
  exponentiaDelayl(attempt: number): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async getTree(sha: string = 'HEAD'): Promise<any> {
    // We can use sha = HEAD to get the latest commit
    const url = `${this.baseURL}/repos/${this.owner}/${this.repo}/git/trees/${sha}`;
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
      console.log('Response tree:', response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch tree from GitHub:', error);
      throw error;
    }
  }

  async getCommitsSha(): Promise<any> {
    const url = `${this.baseURL}/repos/${this.owner}/${this.repo}/commits`;
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
      //Get the sha of each commit
      return response.data.map((commit: any) => commit.sha);
    } catch (error) {
      console.error('Failed to fetch commits from GitHub:', error);
      throw error;
    }
  }

  // To aviod rate limit
  async exponentialDelay(attempt: number): Promise<void> {
    const baseDelay = 5000;
    const delay = baseDelay * Math.pow(2, attempt);
    return new Promise(resolve => setTimeout(resolve, delay));
  }
}
