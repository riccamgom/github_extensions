export interface GitHubClientInterface {
  getTree(sha: string): Promise<any>;
}
