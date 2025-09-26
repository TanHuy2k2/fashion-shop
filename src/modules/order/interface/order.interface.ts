import { Status } from 'src/commons/enums/status.enum';

export interface OrderInterface {
  userId?: string;
  guestName: string | null;
  guestPhone: string | null;
  discountAmount: number;
  finalAmount: number;
  status: Status;
}
