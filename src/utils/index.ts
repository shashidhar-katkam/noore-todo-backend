export const formatResponse = (
  message: string,
  status: boolean,
  data?: any
) => ({
  message,
  data,
  status,
});
