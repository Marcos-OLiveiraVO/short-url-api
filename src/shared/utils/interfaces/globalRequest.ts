export interface CompareHashInput {
  password: string;
  hash: string;
}

export interface GlobalRequest extends Request {
  user: { profileId: number };
}
