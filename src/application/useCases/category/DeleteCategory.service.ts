import { CategoryRepository } from '@application/repositories/CategoryRepository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteCategory {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(id: string): Promise<void> {
    await this.categoryRepository.remove(id);
  }
}
