import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import database from './configs/database';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MasterModule } from './modules/master/master.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local'],
      load: [database],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASS'),
        database: configService.get('DB_NAME'),
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize:
          configService.get('NODE_ENV') !== 'production' ? true : false,
      }),
      inject: [ConfigService],
    }),
    MasterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
