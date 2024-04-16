import { ExtensionCounterInterface } from '../interfaces/extensionCounter.interface';
import { GitHubClientInterface } from '../interfaces/githubApiClient.interface';

export class ExtensionCounter implements ExtensionCounterInterface {
  constructor(private gitHubClient: GitHubClientInterface) {}

  async countExtensions(
    sha: string = 'HEAD',
  ): Promise<{ [key: string]: number }> {
    const extensionsCount: { [key: string]: number } = {};
    await this.processTree(sha, extensionsCount);
    return extensionsCount;
  }

  async processTree(
    sha: string,
    extensionsCount: { [key: string]: number },
  ): Promise<void> {
    const tree = await this.gitHubClient.getTree(sha);
    for (const item of tree.tree) {
      console.log(item);
      if (item.type === 'blob') {
        const ext = item.path.split('.').pop();
        extensionsCount[ext] = (extensionsCount[ext] || 0) + 1;
      }
      if (item.type === 'tree') {
        await this.processTree(item.sha, extensionsCount);
      }
    }
  }
}
