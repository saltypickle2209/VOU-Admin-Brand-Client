export type Question = {
    question: string,
    answerA: string,
    answerB: string,
    answerC: string,
    answerD: string,
    correctAnswer: string,
    scriptPostQuestion: string,
    scriptAnswer: string
}

export type LiveQuiz = {
    poster: string,
    name: string,
    description: string,
    voucher: string,
    amount: string,
    startDate: string,
    endDate: string,
    questions: Question[],
    scriptQuizIntroduction: string
}

export type Game = {
    id: string,
    poster: string,
    name: string,
    description: string,
    start_date: string,
    end_date: string,
    game_type_id: string,
    voucher: string,
    amount: string
}

export type Event = {
    id: string,
    poster: string,
    name: string,
    description: string,
    start_date: string,
    end_date: string,
    games: Game[]
}

export type ItemSet = {
    name: string,
    description: string,
    items: string[]
}

export type CollectableItem = {
    image: string | File | null,
    name: string,
    description: string,
    ratio: string
}

export type ItemCollecting = {
    poster: string,
    name: string,
    description: string,
    voucher: string,
    amount: string,
    startDate: string,
    endDate: string,
    items: CollectableItem[],
    itemSets: ItemSet[]
}