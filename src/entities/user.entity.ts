import {AbstractEntity} from './abstract-entity';
import { Entity, Column, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { IsEmail } from 'class-validator';
import { Exclude, classToPlain } from 'class-transformer';

@Entity('user')
export class UserEntity extends AbstractEntity{
  @Column()
  @IsEmail()
  email: string;

  @Column({ unique: true})
  username: string;

  @Column({ default: ''})
  bio: string

  @Column({ default: null, nullable: true })
  image: string;

  @Column()
  @Exclude()
  password: string;


  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  toJSON() {
    return classToPlain(this);
  }
}