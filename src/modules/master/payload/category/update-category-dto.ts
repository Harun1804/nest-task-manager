/* eslint-disable @typescript-eslint/no-unsafe-call */
import { PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category-dto';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
