export interface CommentaryModel {
    autor: string
    message: string
    star: number
}

export interface RatingModel {
    entityName: string
    indicate: number
    goBack: number
    satisfaction: number
    commentary?: CommentaryModel
}