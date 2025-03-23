import Block from "./Block";

export interface IRoute {
  path: string;
  component: typeof Block;
}
export type Indexed<T = any> = {
  [key in string]: T;
};
