export default interface StandardResponse<T = unknown> {
  error?: true;
  message: string;
  data: T;
}
