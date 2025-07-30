import bcrypt from 'bcrypt';
import { CompareHashInput } from '../interfaces/globalRequest';

export class Hash {
  generateHash(password: string): string {
    const salt = bcrypt.genSaltSync(10);

    return bcrypt.hashSync(password, salt);
  }

  compareHash(data: CompareHashInput): boolean {
    return bcrypt.compareSync(data.password, data.hash);
  }
}
