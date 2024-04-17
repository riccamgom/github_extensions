import { ExtensionsInterface } from "../interfaces/extensions.interface";

export class GetExtensionsService {
  private getExtension(extensionName: string): ExtensionsInterface {
    switch (extensionName) {
      case 'repo':
        return {
          repo: async (repo: string) => {
            console.log(`Clonando repositorio ${repo}`);
          },
          id: async (id: string) => {
            console.log(`Obteniendo información del repositorio ${id}`);
          },
        };
      default:
        throw new Error('Extensión no soportada');
    }
  }

  async processExtension(extensionName: string, repo: string, id: string) {
    const extension = this.getExtension(extensionName);
    await extension.repo(repo);
    await extension.id(id);
  }
}