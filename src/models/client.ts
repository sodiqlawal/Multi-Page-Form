export interface ApiHeader {
  Authorization?: string;
  "Content-type": string;
}

export type Body = Record<string, unknown>;
export type DefaultResponse = Record<string, unknown>;

export interface OptionsArgs extends Record<string, unknown> {
  body?: Body | unknown;
  del?: boolean;
  patch?: boolean;
  header?: Record<string, unknown>;
}
