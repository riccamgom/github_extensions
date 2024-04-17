export interface ExtensionCounterInterface {
  countExtensions(): Promise<{ [key: string]: number }>;
  processCommits(extensionsCount: { [key: string]: number }): Promise<void>;
  processTree(
    commitSha: string,
    extensionsCount: { [key: string]: number },
  ): Promise<void>;
}
