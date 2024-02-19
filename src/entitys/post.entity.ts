import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, OneToMany } from "typeorm";
import { UsersModel } from "./users.entity"; 
import { LikesModel } from "./likes.entity";
import { CommentsModel } from "./comments.entity";

@Entity()
export class PostModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  imgURL: string;

  @CreateDateColumn({ name: 'createdAt'})
  createdAt: Date;

  @ManyToOne(() => UsersModel, (user: UsersModel) => user.posts)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: UsersModel;

  @OneToMany(() => LikesModel, like => like.post, {eager: true})
  likes: LikesModel[];

  @OneToMany(() => CommentsModel, comments => comments.post, {eager: true})
  comments: CommentsModel[];
}
