import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from '../entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from '../payload/category/create-category-dto';
import { UpdateCategoryDto } from '../payload/category/update-category-dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async findAll() {
    return await this.categoryRepository.find();
  }

  async findById(id: number) {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new HttpException('Category not found', 404);
    }
    return category;
  }

  async create(createCategoryDto: CreateCategoryDto) {
    const category = this.categoryRepository.create(createCategoryDto);
    return this.categoryRepository.save(category);
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const existCategory = await this.findById(id);
    const category = this.categoryRepository.merge(
      existCategory,
      updateCategoryDto,
    );
    return this.categoryRepository.save(category);
  }

  async delete(id: number) {
    const existCategory = await this.findById(id);
    return this.categoryRepository.remove(existCategory);
  }
}
