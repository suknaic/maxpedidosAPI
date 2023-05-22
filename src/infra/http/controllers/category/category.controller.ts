import { ListCategories } from '@application/useCases/category/ListCategories.service';
import { CreateCategory } from '@application/useCases/category/createCategory.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CategoryDTO } from '../../dtos/categoryDTO';
import { UpdateCategory } from '@application/useCases/category/UpdateCategory.service';
import { DeleteCategory } from '@application/useCases/category/DeleteCategory.service';

@Controller('/painel/categorias')
export class CategoryController {
  constructor(
    private createCategoryService: CreateCategory,
    private listCategoryService: ListCategories,
    private updateCategoryService: UpdateCategory,
    private deleteCategoryService: DeleteCategory,
  ) {}

  @Post()
  @HttpCode(201)
  async create(@Req() { user }: Request, @Body() { name, icon }: CategoryDTO) {
    const { id } = user;
    await this.createCategoryService.execute({
      categoryName: name,
      categoryIcon: icon,
      userId: id,
    });
  }
  @Put(':id')
  async updateCategory(
    @Param('id') id: string,
    @Body() { icon, name }: CategoryDTO,
    @Res() response: Response,
  ) {
    const category = await this.updateCategoryService.execute({
      categoryId: id,
      icon,
      name,
    });

    return response.json(category).status(200);
  }

  @Get()
  async getAll(@Req() { user }: Request, @Res() response: Response) {
    const { id } = user;
    const categories = await this.listCategoryService.execute(id);

    return response.json(categories).status(200);
  }

  @HttpCode(201)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.deleteCategoryService.execute(id);
  }
}
