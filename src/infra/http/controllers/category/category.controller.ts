import { ListCategories } from '@application/useCases/category/ListCategories.service';
import { CreateCategory } from '@application/useCases/category/createCategory.service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Controller()
export class CategoryController {
  constructor(
    private createCategoryService: CreateCategory,
    private listCategoryService: ListCategories,
  ) {}

  @Post('/painel/categorias')
  @HttpCode(201)
  async create(@Req() { user }: Request, @Body('name') name: string) {
    const { id } = user;
    await this.createCategoryService.execute({
      categoryName: name,
      userId: id,
    });
  }
  @Get('/painel/categorias')
  async getAll(@Req() { user }: Request, @Res() response: Response) {
    const { id } = user;
    const categories = await this.listCategoryService.execute(id);

    return response.json(categories).status(200);
  }
}
