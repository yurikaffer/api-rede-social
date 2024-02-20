import { CommentsModel } from "../../entitys/comments.entity"
import { LikesModel } from "../../entitys/likes.entity"
import { UsersModel } from "../../entitys/users.entity"

export interface PostInterface {
    id: number
    content: string
    createdAt: Date
    user: UsersModel
    likes: LikesModel[]
    comments: CommentsModel[]
}