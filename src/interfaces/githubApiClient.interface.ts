export interface GitHubClientInterface {
  getTree(sha: string): Promise<any>;
  getCommitsSha(): Promise<any>;
  exponentialDelay(attempt: number): Promise<void>;
}
