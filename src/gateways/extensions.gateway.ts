import { ExtensionsInterface } from "../interfaces/extensions.interface";

export class ExtensionsGateway implements ExtensionsInterface {
  async repo(repo: string): Promise<void> {
    console.log(`Clonando repositorio ${repo}`);
  }

  async id(id: string): Promise<void> {
    console.log(`Obteniendo información del repositorio ${id}`);
  }
}