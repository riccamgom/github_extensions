import axios from 'axios';
import { GitHubApiClient } from '../services/githubApiClient.service';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('GitHubApiClient', () => {
  const baseURL = 'https://api.github.com';
  const owner = 'testOwner';
  const repo = 'testRepo';
  const token = 'testToken';

  describe('constructor', () => {
    it('should throw an error if token is not provided', () => {
      expect(() => new GitHubApiClient(owner, repo)).toThrow(
        'GitHub token not found',
      );
    });
  });

  describe('getTree', () => {
    it('should return data when successful', async () => {
      const mockData = { tree: [{ path: 'test.js', type: 'blob' }] };
      mockedAxios.get.mockResolvedValue({ data: mockData });

      const client = new GitHubApiClient(owner, repo, token);
      const data = await client.getTree();
      expect(data).toEqual(mockData);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        `${baseURL}/repos/${owner}/${repo}/git/trees/HEAD`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
    });
  });
});
