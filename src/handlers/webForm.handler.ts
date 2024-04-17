import { InputHandlerInterface } from '../interfaces/inputHandler.interface';

export class WebFormHandler implements InputHandlerInterface {
  async handleInput(): Promise<void> {
    // Transformar la entrada del formulario
  }

  validateInput(input: any): boolean {
    // Validamos la entrada
    return true;
  }
}
