import { ExtensionsInterface } from '../interfaces/extensionCounter.interface';

export class ExtensionsHandler implements ExtensionsInterface {
  async repo(repo: string): Promise<void> {
    console.log(`Clonando repositorio ${repo}`);
  }

  async id(id: string): Promise<void> {
    console.log(`Obteniendo información del repositorio ${id}`);
  }
}
