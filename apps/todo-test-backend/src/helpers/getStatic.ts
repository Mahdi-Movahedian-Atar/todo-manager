export const getPort = (): string | undefined => {
  return process.env.ROOT_URL_PORT;
};
export const getURL = (): string | undefined => {
  return process.env.DATABASE_URL;
};

export const getSecret = (): string | undefined => {
  return process.env.SECRET_KEY;
};
