export interface ExtensionsInterface {
    repo(repo: string): Promise<void>;
    id(id: string): Promise<void>;
  }
