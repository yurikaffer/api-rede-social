import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";
import { UsersModel } from "./users.entity"; 
import { PostModel } from "./post.entity";

@Entity()
export class CommentsModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => UsersModel, user => user.comments)
  @JoinColumn({ name: 'user_id' })
  user: UsersModel;

  @ManyToOne(() => PostModel, post => post.comments, {onDelete: "CASCADE"})
  @JoinColumn({ name: 'post_id' })
  post: PostModel;

  @CreateDateColumn({ name: 'createdAt'})
  createdAt: Date;
}
