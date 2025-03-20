import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TagEntity } from '../entities/tag.entity';
import { ILike, Repository } from 'typeorm';
import { CreateTagDto } from '../payload/tag/create-tag-dto';
import { UpdateTagDto } from '../payload/tag/update-tag-dto';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
  ) {}

  async findAll(page: number = 1, limit: number = 10, search: string = '') {
    const [data, total] = await this.tagRepository.findAndCount({
      where: search
        ? {
            name: ILike(`%${search}%`),
          }
        : {},
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data,
      total,
      page,
      limit,
      totalPage: Math.ceil(total / limit),
    };
  }

  async findById(id: number) {
    const tag = await this.tagRepository.findOneBy({ id });
    if (!tag) {
      throw new HttpException('Tag not found', 404);
    }
    return tag;
  }

  async create(createTagDto: CreateTagDto) {
    const tag = this.tagRepository.create(createTagDto);
    return this.tagRepository.save(tag);
  }

  async update(id: number, updateTagDto: UpdateTagDto) {
    const tagExist = await this.findById(id);
    const tag = this.tagRepository.merge(tagExist, updateTagDto);
    return this.tagRepository.save(tag);
  }

  async delete(id: number) {
    const tagExist = await this.findById(id);
    return this.tagRepository.remove(tagExist);
  }
}
