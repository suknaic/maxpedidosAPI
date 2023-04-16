import { User } from 'src/application/entities/User';
import { UserRepository } from '../userRepository';

export class UserRepositoryInMemory implements UserRepository {
  public repository: User[];

  constructor() {
    this.repository = [];
  }

  async create(user: User): Promise<User> {
    this.repository.push(user);

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.repository.find((usuario) => usuario.email === email);
    return user;
  }

  async findById(id: string): Promise<User> {
    const user = this.repository.find((usuario) => usuario.id === id);
    return user;
  }
}
