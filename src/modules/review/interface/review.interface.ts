export interface ReviewInterface {
  id: string;
  product: {
    id: string;
    name: string;
  };
  user: {
    id: string;
    fullName: string;
  };
  rating: number;
  comment: string | null;
}
