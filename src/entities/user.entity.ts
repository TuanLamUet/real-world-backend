import { Entity, Column, BeforeInsert, ManyToMany, JoinTable, OneToMany, JoinColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { IsEmail } from 'class-validator';
import { Exclude, classToPlain } from 'class-transformer';
import {AbstractEntity} from './abstract-entity';
import { ArticleEntity } from './article.entity';
import { type } from 'os';

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

  @ManyToMany(
    type => UserEntity,
    user => user.followee,
  )
  @JoinTable()
  followers: UserEntity[];

  @ManyToMany( 
    type => UserEntity,
    user => user.followers
  )
  followee: UserEntity[];

  @OneToMany(
    type => ArticleEntity,
    article => article.author,
  )
  articles: ArticleEntity[];

  @ManyToMany(
    type => ArticleEntity,
    article => article.favoritedBy,
  )
  @JoinColumn()
  favorites: ArticleEntity[];


  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.password);
  }

  toJSON() {
    return classToPlain(this);
  }

  toProfile(user?: UserEntity) {
    let following = null;
    if(user) {
      following = this.followers.includes(user);
    }
    const profile: any = this.toJSON();
    delete profile.followers;
    return { ...profile, following}
  }
}