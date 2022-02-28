export default interface StandardResponse<Data = any> {
  message: string;
  data: Data;
}
