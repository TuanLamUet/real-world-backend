import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';


@Injectable()
export class DatabaseConnectionService implements
TypeOrmOptionsFactory{

  createTypeOrmOptions(): TypeOrmModuleOptions{
    return {
      name: 'default',
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      synchronize: true,
      dropSchema: false,
      logging: true,
      entities: ['dist/**/*.entity.js'],

    };
  }
}