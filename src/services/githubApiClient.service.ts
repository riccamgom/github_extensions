import axios from 'axios';
import 'dotenv/config';
import { GitHubClientInterface } from '../interfaces/githubApiClient.interface';

export class GitHubApiClient implements GitHubClientInterface {
  private baseURL: string = 'https://api.github.com';
  private token: string = process.env.GITHUB_TOKEN ?? '';

  constructor(
    private owner: string,
    private repo: string,
  ) {
    if (!this.token) {
      throw new Error('GitHub token not found');
    }
  }

  async getTree(sha: string): Promise<any> {
    const url = `${this.baseURL}/repos/${this.owner}/${this.repo}/git/trees/${sha}`;
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch tree from GitHub:', error);
      throw error;
    }
  }
}
