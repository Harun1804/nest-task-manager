import { Module } from '@nestjs/common';
import { CategoryService } from './services/category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { CategoryControllerController } from './controllers/category-controller.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  providers: [CategoryService],
  controllers: [CategoryControllerController],
})
export class MasterModule {}
