import { ExtensionCounter } from '../services/extensionCounter.service';
import { GitHubClientInterface } from '../interfaces/githubApiClient.interface';

const mockGitHubClient: GitHubClientInterface = {
  getCommitsSha: jest.fn(),
  getTree: jest.fn(),
  exponentialDelay: jest.fn(),
};

const mockCommitsSha = ['commit1', 'commit2'];
const mockTree = {
  tree: [
    { type: 'blob', path: 'index.js' },
    { type: 'blob', path: 'readme.md' },
    { type: 'blob', path: '.gitignore' },
  ],
};

describe('ExtensionCounter', () => {
  it('should count file extensions correctly', async () => {
    (mockGitHubClient.getCommitsSha as jest.Mock).mockResolvedValue(
      mockCommitsSha,
    );
    (mockGitHubClient.getTree as jest.Mock).mockResolvedValue(mockTree);

    const extensionCounter = new ExtensionCounter(mockGitHubClient);
    const result = await extensionCounter.countExtensions();

    expect(result).toEqual({ js: 2, md: 2, gitignore: 1 });
  });
});
