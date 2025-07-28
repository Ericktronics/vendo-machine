export const ResponseBuilder = {
  success: (
    data: any,
    message: string = "Success",
    statusCode: number = 200
  ) => {
    return {
      statusCode,
      message,
      data,
    };
  },
  error: (message: string, statusCode: number = 500) => {
    return {
      status: "error",
      message,
      statusCode,
    };
  },
  notFound: (message: string = "Not Found", statusCode: number = 404) => {
    return {
      status: "Not Found",
      message,
      statusCode,
    };
  },
  badRequest: (message: string = "Bad Request", statusCode: number = 400) => {
    return {
      status: "Bad Request",
      message,
      statusCode,
    };
  },
};
