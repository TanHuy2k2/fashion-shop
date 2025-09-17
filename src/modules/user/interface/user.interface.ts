import { Role } from 'src/commons/enums/role.enum';

export interface UserInterface {
  id: string;
  fullName: string;
  image: string;
  email: string;
  password: string;
  dateOfBirth: Date;
  phone: string;
  address: string;
  role: Role;
}
