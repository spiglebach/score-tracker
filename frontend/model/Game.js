class Game {
    constructor(id, name, date, remark, friend, score) {
        this.id = id
        this.name = name
        this.date = date,
        this.remark = remark
        this.friend = friend
        this.score = score
    }
}

export const GameScore = Object.freeze({
    WIN_OWNER: Symbol("owner"),
    WIN_FRIEND: Symbol("friend"),
    COOPERATIVE: Symbol("cooperative"),
    NOT_APPLICABLE: Symbol("n/a"),
})

export default Game