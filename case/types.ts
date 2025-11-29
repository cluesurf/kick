export interface Song {
  id: string;
  name: string;
  module: () => Promise<any>;
}
