import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TagService } from '../services/tag.service';
import { errorResponse, successResponse } from 'src/utils/response-formatter';
import { CreateTagDto } from '../payload/tag/create-tag-dto';
import { UpdateTagDto } from '../payload/tag/update-tag-dto';

@Controller('master/tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search: string = '',
  ) {
    try {
      const response = await this.tagService.findAll(page, limit, search);
      return successResponse('Successfully get tags', response.data, {
        currentPage: response.page,
        totalPage: response.totalPage,
        size: response.limit,
        totalData: response.total,
      });
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
      const response = await this.tagService.findById(id);
      return successResponse('Successfully get tags', response);
    } catch (e: unknown) {
      const errorMessage =
        e instanceof Error ? e.message : 'An unexpected error occurred';
      const errorStack = e instanceof Error ? e.stack : undefined;
      return errorResponse(errorMessage, { stack: errorStack });
    }
  }

  @Post()
  async create(@Body() createTagDto: CreateTagDto) {
    try {
      const response = await this.tagService.create(createTagDto);
      return successResponse('Successfully create tags', response);
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
    @Body() updateTagDto: UpdateTagDto,
  ) {
    try {
      const response = await this.tagService.update(id, updateTagDto);
      return successResponse('Successfully update tags', response);
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
      await this.tagService.delete(id);
      return successResponse('Successfully delete tags', null);
    } catch (e: unknown) {
      const errorMessage =
        e instanceof Error ? e.message : 'An unexpected error occurred';
      const errorStack = e instanceof Error ? e.stack : undefined;
      return errorResponse(errorMessage, { stack: errorStack });
    }
  }
}
