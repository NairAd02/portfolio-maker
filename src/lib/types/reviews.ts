import { User } from "./users";

export interface Review {
  id: string;
  review: string;
  grade: number;
  user: User;
}
