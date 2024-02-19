import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { UsersModel } from "./users.entity";

@Entity()
export class FollowersModel {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UsersModel, user => user.followers)
  @JoinColumn({ name: 'follower_user_id' })
  follower: UsersModel;

  @ManyToOne(() => UsersModel, user => user.followed_user)
  @JoinColumn({ name: 'followed_user_id' })
  followed_user: UsersModel;

}
