import { ExtensionCounterInterface } from '../interfaces/extensionCounter.interface';
import { GitHubClientInterface } from '../interfaces/githubApiClient.interface';

export class ExtensionCounter implements ExtensionCounterInterface {
  constructor(private gitHubClient: GitHubClientInterface) {}

  async countExtensions(): Promise<{ [key: string]: number }> {
    const extensionsCount: { [key: string]: number } = {};
    await this.processCommits(extensionsCount);
    return extensionsCount;
  }

  async processCommits(extensionsCount: { [key: string]: number }): Promise<void> {
    const commitsSha = await this.gitHubClient.getCommitsSha();
  
    const promises = commitsSha.map((sha:string, index:number) =>
      this.processTree(sha, extensionsCount, index)
    );
  
    const results = await Promise.allSettled(promises);
  
    results.forEach((result, index) => {
      if (result.status === 'rejected') {
        console.log(`Processing failed for commit at index ${index} with error: ${result.reason}`);
      }
    });
  }
  

  async processTree(
    commitSha: string,
    extensionsCount: { [key: string]: number },
    counter: number,
  ): Promise<void> {
    //Incremental delay to avoid rate limit
    await this.gitHubClient.exponentialDelay(counter);

    //Extensions that should be counted only once
    const singleCountExtensions = ['dockerignore', 'gitignore', 'prettierrc'];

    const tree = await this.gitHubClient.getTree(commitSha);

    tree.tree.forEach((item: any) => {
      if (item.type !== 'blob') return;

      const extension = this.extractExtension(item.path);
      if (!extension) return;

      // Single count extensions
      if (singleCountExtensions.includes(extension)) {
        if (extensionsCount.hasOwnProperty(extension)) return;
        extensionsCount[extension] = 1;
        return;
      }

      extensionsCount[extension] = (extensionsCount[extension] || 0) + 1;
    });
  }

  private extractExtension(filePath: string): string | null {
    const parts = filePath.split('.');
    //For files like "log.model.ts"
    return parts.length > 1 ? parts[parts.length - 1] : null;
  }
}
