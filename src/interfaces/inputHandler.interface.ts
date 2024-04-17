export interface InputHandlerInterface {
  handleInput(): Promise<void>;
  validateInput(input: any): boolean;
}
