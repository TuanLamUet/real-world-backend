import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConnectionService } from './database-connection.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ArticleController } from './article/article.controller';
import { ArticleService } from './article/article.service';
import { ModuleService } from './module/module.service';
import { ArticleModule } from './article/article.module';
@Module({
  imports: [TypeOrmModule.forRootAsync({
    useClass: DatabaseConnectionService
  }), AuthModule, UserModule, ArticleModule],
  controllers: [AppController, ArticleController],
  providers: [AppService, ArticleService, ModuleService],
})
export class AppModule {}
