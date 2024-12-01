export interface ResponseStatus {
  code: number;
  systemMessage: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  displayMessage: any;
  t: string;
}
