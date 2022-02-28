export default interface StandardResponse<Data = unknown> {
  message: string;
  data: Data;
}
