import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { ProfileController } from './profile.controller';
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]),
  AuthModule],
  providers: [UserService],
  controllers: [UserController, ProfileController]
})
export class UserModule {}
