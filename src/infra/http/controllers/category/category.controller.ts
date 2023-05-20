import { CreateCategory } from '@application/useCases/category/createCategory.service';
import { Body, Controller, HttpCode, Post, Req, Res } from '@nestjs/common';
import { Request } from 'express';

@Controller()
export class CategoryController {
  constructor(private createCategoryService: CreateCategory) {}

  @Post('/painel/categorias')
  @HttpCode(201)
  async create(@Req() { user }: Request, @Body('name') name: string) {
    const { id } = user;
    await this.createCategoryService.execute({
      categoryName: name,
      userId: id,
    });
  }
}
