import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";
import { UsersModel } from "./users.entity"; 
import { PostModel } from "./post.entity"; 

@Entity()
export class LikesModel {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UsersModel, user => user.likes)
  @JoinColumn({ name: 'user_id' })
  user: UsersModel;

  @ManyToOne(() => PostModel, post => post.likes, { onDelete: "CASCADE" })
  @JoinColumn({ name: 'post_id' })
  post: PostModel;

  @CreateDateColumn({ name: 'createdAt'})
  createdAt: Date;
}
