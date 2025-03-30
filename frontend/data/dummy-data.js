import Friendship from "../model/Friend";
import Game, { GameScore } from "../model/Game";

export const OWNER = {
    id: 1,
    name: "Gé Marcell",
    preferredNickname: "Parci",
    preferredBackgroundColor: "rgb(119, 211, 248)",
    preferredForegroundColor: "rgb(53, 0, 177)",
}

export const FRIEND_1 = new Friendship(1, OWNER, {id: 2, name: "Teszt Elek"}, "Telek", "rgb(193, 106, 228)", "black")
export const FRIEND_2 = new Friendship(2, OWNER, {id: 3, name: "Prób Alexandra"}, "Palexandra", "rgb(243, 245, 110)", "rgb(173, 0, 0)")
export const FRIEND_3 = new Friendship(3, OWNER, null, "Topi", "rgb(235, 106, 106)", "black")
export const FRIEND_4 = new Friendship(4, OWNER, {id: 4, name: "Kam Uránusz"}, null, "rgb(106, 235, 196)", "black")

export const FRIENDS = [
    FRIEND_1,
    FRIEND_2,
    FRIEND_3,
    FRIEND_4,
]

export const FRIEND_GAME_HISTORY = [
    new Game(1, "Kingdomino", new Date("2025-02-01"), "", FRIEND_2, GameScore.WIN_OWNER),
    new Game(2, "Kingdomino", new Date("2025-02-01"), "", FRIEND_2, GameScore.WIN_FRIEND),
    new Game(3, "Harmónia", new Date("2025-02-03"), "", FRIEND_2, GameScore.WIN_FRIEND),
    new Game(4, "Pandemic", new Date("2025-02-04"), "", FRIEND_2, GameScore.COOPERATIVE),
    new Game(5, "Root", new Date("2025-02-08"), "", FRIEND_3, GameScore.WIN_OWNER),
    new Game(6, "Harmónia", new Date("2025-02-10"), "", FRIEND_2, GameScore.WIN_FRIEND),
    new Game(7, "Ősi jel", new Date("2025-02-10"), "", FRIEND_2, GameScore.COOPERATIVE),
    new Game(8, "Scrabble", new Date("2025-02-21"), "", FRIEND_2, GameScore.WIN_FRIEND),
    new Game(9, "Kokopelli", new Date("2025-02-21"), "", FRIEND_2, GameScore.WIN_OWNER),
    new Game(10, "Műgyűjtők Társasága", new Date("2025-03-01"), "", FRIEND_2, GameScore.WIN_FRIEND),
    new Game(11, "Vírus", new Date("2025-03-01"), "board game café", FRIEND_2, GameScore.NOT_APPLICABLE),
]

export const RECENT_GAMES = [
    {
        id: 1,
        name: 'Kingdomino',
        timesPlayed: 13
    },
    {
        id: 2,
        name: 'Scrabble'
    },
    {
        id: 3,
        name: 'Harmonies'
    },
    {
        id: 4,
        name: 'Ark Nova'
    },
    {
        id: 5,
        name: 'CV'
    },
]


export const MAIN_GAME_RESULT_TYPES = [
    {
        title: 'I won',
        value: GameScore.WIN_OWNER,
        icon: 'crown'
    },
    {
        title: 'I lost',
        value: GameScore.WIN_FRIEND,
        icon: 'face-sad-tear'
    },
]

export const SECONDARY_GAME_RESULT_TYPES = [
    {
        title: 'Cooperative',
        value: GameScore.COOPERATIVE,
        icon: 'handshake'
    },
    {
        title: 'Draw',
        value: GameScore.DRAW,
        icon: 'face-meh'
    },
    {
        title: 'N/A',
        value: GameScore.NOT_APPLICABLE,
        icon: 'rectangle-xmark'
    }
]