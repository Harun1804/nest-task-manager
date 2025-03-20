import { Module } from '@nestjs/common';
import { CategoryService } from './services/category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { CategoryController } from './controllers/category.controller';
import { TagEntity } from './entities/tag.entity';
import { TagService } from './services/tag.service';
import { TagController } from './controllers/tag.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity, TagEntity])],
  providers: [CategoryService, TagService],
  controllers: [CategoryController, TagController],
})
export class MasterModule {}
