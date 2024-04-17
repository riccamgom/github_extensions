import { ExtensionCounterInterface } from '../interfaces/extensionCounter.interface';
import { GitHubClientInterface } from '../interfaces/githubApiClient.interface';

export class ExtensionCounter implements ExtensionCounterInterface {
  constructor(private gitHubClient: GitHubClientInterface) {}

  async countExtensions(): Promise<{ [key: string]: number }> {
    const extensionsCount: { [key: string]: number } = {};
    await this.processCommits(extensionsCount);
    return extensionsCount;
  }

  async processCommits(extensionsCount: {
    [key: string]: number;
  }): Promise<void> {
    const commitsSha = await this.gitHubClient.getCommitsSha();
    await Promise.allSettled(
      commitsSha.map((sha: string) => this.processTree(sha, extensionsCount)),
    );
  }

  async processTree(
    commitSha: string,
    extensionsCount: { [key: string]: number },
  ): Promise<void> {
    //Simulate a delay of 5 seconds
    await new Promise(resolve => setTimeout(resolve, 5000));

    const tree = await this.gitHubClient.getTree(commitSha);
    tree.tree.forEach((item: any) => {
      if (item.type === 'blob') {
        const extension = this.extractExtension(item.path);
        if (extension) {
          extensionsCount[extension] = (extensionsCount[extension] || 0) + 1;
        }
      }
    });
  }

  private extractExtension(filePath: string): string | null {
    const parts = filePath.split('.');
    //For files like "log.model.ts"
    return parts.length > 1 ? parts[parts.length - 1] : null;
  }
}
