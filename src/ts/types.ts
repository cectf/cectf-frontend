export interface Challenge {
  id: number;
  title: string;
  category: string;
  body: string;
  hint: string;
  solution: string;
  hinted: boolean;
  solved: boolean;
}
