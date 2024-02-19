import { BeforeInsert, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { PostModel } from "./post.entity";
import { LikesModel } from "./likes.entity";
import { CommentsModel } from "./comments.entity";
import { FollowersModel } from "./followers.entity";

@Entity()
export class UsersModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 120 })
  name: string;

  @Column({ length: 120 })
  email: string;

  @Column({ length: 120 })
  password: string;
  
  @Column({ length: 120 })
  userName: string;

  @Column({ length: 85 })
  biography: string;

  @Column({ nullable: true })
  filePath: string; 

  @CreateDateColumn({ name: 'createdAt'})
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt'})
  updatedAt: Date;

  @OneToMany(() => PostModel, post => post.user)
  posts: PostModel[];

  @OneToMany(() => CommentsModel, comments => comments.user)
  comments: CommentsModel[];

  @OneToMany(() => LikesModel, like => like.user)
  likes: LikesModel[];

  @OneToMany(() => FollowersModel, followers => followers.follower)
  followers: FollowersModel[];

  @OneToMany(() => FollowersModel, followed_user => followed_user.follower)
  followed_user: FollowersModel[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
