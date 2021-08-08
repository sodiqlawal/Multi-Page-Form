export interface Environment {
  baseUrl: string;
  token: string;
}

const environment: Environment = {
  baseUrl: process.env.REACT_APP_URL as string,
  token: "token",
};

// Shorter for environment to minimize space
export const env = environment;

export default environment;
