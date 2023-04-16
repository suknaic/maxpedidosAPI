import { User } from 'src/application/entities/User';
import { UserRepository } from '../userRepository';

export class UserInMemoryRepository implements UserRepository {
  public repository: User[];

  constructor() {
    this.repository = [];
  }

  async create(user: User): Promise<void> {
    this.repository.push(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.repository.find((usuario) => usuario.email === email);
    return user;
  }
}
