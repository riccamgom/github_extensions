import { Request, Response } from 'express';
import { GitHubApiClient } from '../services/githubApiClient.service';
import { ExtensionCounter } from '../services/extensionCounter.service';
import { writeLog } from '../services/logging.service';

export class ExtensionController {
  async getExtensions(req: Request, res: Response): Promise<void> {
    const { owner, repo } = req.params;
    const token = req.query.token;
    console.log('Getting data from ' + `Owner: ${owner}, Repo: ${repo}`);
    try {
      await writeLog({
        message: `Log message-> OWNER: ${owner}, REPO: ${repo}`,
        timestamp: new Date(),
        level: 'info',
      });
      const gitHubClient = new GitHubApiClient(owner, repo, token as string);
      const extensionCounter = new ExtensionCounter(gitHubClient);

      const result = await extensionCounter.countExtensions();
      res.json(result);
    } catch (error) {
      res.status(500).send((error as Error).message);
    }
  }
}
