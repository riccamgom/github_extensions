import { Request, Response } from 'express';
import { GitHubApiClient } from '../services/githubApiClient.service';
import { ExtensionCounter } from '../services/extensionCounter.service';

export class ExtensionController {
  async getExtensions(req: Request, res: Response): Promise<void> {
    const { owner, repo } = req.params;
    console.log('Getting data from ' + `Owner: ${owner}, Repo: ${repo}`);
    try {
      const gitHubClient = new GitHubApiClient(owner, repo);
      const extensionCounter = new ExtensionCounter(gitHubClient);

      const result = await extensionCounter.countExtensions();
      res.json(result);
    } catch (error) {
      res.status(500).send((error as Error).message);
    }
  }
}
