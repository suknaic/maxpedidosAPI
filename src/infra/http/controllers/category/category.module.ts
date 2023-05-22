import { Module } from '@nestjs/common';
import { databaseModule } from 'src/infra/database/database.module';
import { CategoryController } from './category.controller';
import { CreateCategory } from '@application/useCases/category/createCategory.service';
import { ListCategories } from '@application/useCases/category/ListCategories.service';
import { UpdateCategory } from '@application/useCases/category/UpdateCategory.service';

@Module({
  imports: [databaseModule],
  controllers: [CategoryController],
  providers: [CreateCategory, ListCategories, UpdateCategory],
})
export class CategoryModule {}
