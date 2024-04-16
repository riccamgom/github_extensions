export interface ExtensionCounterInterface {
  countExtensions(sha: string): Promise<{ [key: string]: number }>;
}
