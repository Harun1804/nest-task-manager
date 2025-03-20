import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { errorResponse, successResponse } from 'src/utils/response-formatter';
import { CreateCategoryDto } from '../payload/category/create-category-dto';
import { UpdateCategoryDto } from '../payload/category/update-category-dto';

@Controller('master/categories')
export class CategoryControllerController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAll() {
    try {
      const data = await this.categoryService.findAll();
      return successResponse('Successfully get categories', data);
    } catch (e: unknown) {
      const errorMessage =
        e instanceof Error ? e.message : 'An unexpected error occurred';
      const errorStack = e instanceof Error ? e.stack : undefined;
      return errorResponse(errorMessage, { stack: errorStack });
    }
  }

  @Get(':id')
  async findById(@Param('id', new ParseIntPipe()) id: number) {
    try {
      const data = await this.categoryService.findById(id);
      return successResponse('Successfully get category', data);
    } catch (e: unknown) {
      const errorMessage =
        e instanceof Error ? e.message : 'An unexpected error occurred';
      const errorStack = e instanceof Error ? e.stack : undefined;
      return errorResponse(errorMessage, { stack: errorStack });
    }
  }

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    try {
      const data = await this.categoryService.create(createCategoryDto);
      return successResponse('Successfully create category', data);
    } catch (e: unknown) {
      const errorMessage =
        e instanceof Error ? e.message : 'An unexpected error occurred';
      const errorStack = e instanceof Error ? e.stack : undefined;
      return errorResponse(errorMessage, { stack: errorStack });
    }
  }

  @Patch(':id')
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    try {
      const data = await this.categoryService.update(id, updateCategoryDto);
      return successResponse('Successfully update category', data);
    } catch (e: unknown) {
      const errorMessage =
        e instanceof Error ? e.message : 'An unexpected error occurred';
      const errorStack = e instanceof Error ? e.stack : undefined;
      return errorResponse(errorMessage, { stack: errorStack });
    }
  }

  @Delete(':id')
  async delete(@Param('id', new ParseIntPipe()) id: number) {
    try {
      await this.categoryService.delete(id);
      return successResponse('Successfully delete category', null);
    } catch (e: unknown) {
      const errorMessage =
        e instanceof Error ? e.message : 'An unexpected error occurred';
      const errorStack = e instanceof Error ? e.stack : undefined;
      return errorResponse(errorMessage, { stack: errorStack });
    }
  }
}
