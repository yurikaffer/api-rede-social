import { CommentsModel } from "src/entitys/comments.entity"
import { LikesModel } from "src/entitys/likes.entity"
import { UsersModel } from "src/entitys/users.entity"

export interface PostInterface {
    id: number
    content: string
    createdAt: Date
    user: UsersModel
    likes: LikesModel[]
    comments: CommentsModel[]
}