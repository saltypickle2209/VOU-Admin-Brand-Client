'use server'

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import {string, z} from 'zod'
import { baseURL } from "./definition"

// ---------- VOUCHER SCHEMA ----------

const voucherSchema = z.object({
    voucherName: z.string().min(1, {message: "Voucher's name cannot be empty"}),
    image: z
    .instanceof(File, {message: "Game's image is required"})
    .refine((file) => ["image/jpeg", "image/png"].includes(file.type), {
        message: "(*)Only JPEG or PNG is supported"
    }),
    value: z.preprocess((value) => parseFloat(value as string), z.number({message: "Voucher's value must be a number"}).min(0, {message: "Voucherr's value must be a positive number"})),
    description: z.string().min(1, {message: "Voucher's description cannot be empty"})
})

// ---------- REVALIDATE ----------

export async function revalidateDashboard() {
    revalidatePath('/dashboard')
    redirect('/dashboard')
}

export async function revalidateVouchers() {
    revalidatePath('/vouchers');
    redirect('/vouchers');
}

// ---------- CREATE VOUCHER ----------

export async function createVoucher(prevState: any, formData: FormData) {
    // const voucherName = formData.get("voucherName");
    // const image = formData.get("image");
    // const value = formData.get("value");
    // const description = formData.get("description");

    // const validatedFields = voucherSchema.safeParse({
    //     voucherName,
    //     image,
    //     value,
    //     description,
    // });


    const validatedFields = voucherSchema.safeParse({
        voucherName: formData.get("voucherName"),
        image: formData.get("image"),
        value: formData.get("value"),
        description: formData.get("description"),
    });
    
    
    if(!validatedFields.success) {
        const errors = validatedFields.error.flatten().fieldErrors;
        console.error("Validation errors:", errors);
        return {
            message: "error",
            errors: {
                voucherName: errors['voucherName']?.[0] ? `(*)${errors['voucherName']?.[0]}` : '',
                image: errors['image']?.[0] ? `(*)${errors['image']?.[0]}` : '',
                value: errors['value']?.[0] ? `(*)${errors['value']?.[0]}` : '',
                description: errors['description']?.[0] ? `(*)${errors['description']?.[0]}` : '',
            },
            // fieldValues: {
            //     voucherName,
            //     image,
            //     value,
            //     description
            // }
        };
    }

    return {
        message: "success",
        errors: undefined,
        // fieldValues: {
        //   voucherName: "",
        //   image: "",
        //   value: "",
        //   description: "",
        // },
    }
}

// ---------- REVALIDATE ----------

export async function revalidateEvents() {
    revalidatePath('/events')
    redirect('/events')
}

export async function revalidateGames() {
    revalidatePath('/games')
    redirect('/games')
}

// ---------- CREATE LIVE QUIZ (ADDED API, WAIT FOR FULL IMPLEMENTATION) ----------

const liveQuizQuestionSchema = z.object({
    question: z.string({
        required_error: "Question text is required",
        invalid_type_error: "Question text must be a string"
    }).trim().min(1, { 
        message: "Question text can't be a whitespace string" 
    }).max(200, {
        message: "Question text is too long" 
    }),
    answerA: z.string({
        required_error: "This field is required",
        invalid_type_error: "This field must be a string"
    }).trim().min(1, { 
        message: "Answer A can't be a whitespace string" 
    }).max(100, {
        message: "Answer A is too long" 
    }),
    answerB: z.string({
        required_error: "This field is required",
        invalid_type_error: "This field must be a string"
    }).trim().min(1, { 
        message: "Answer B can't be a whitespace string" 
    }).max(100, {
        message: "Answer B is too long" 
    }),
    answerC: z.string({
        required_error: "This field is required",
        invalid_type_error: "This field must be a string"
    }).trim().min(1, { 
        message: "Answer C can't be a whitespace string" 
    }).max(100, {
        message: "Answer C is too long" 
    }),
    answerD: z.string({
        required_error: "This field is required",
        invalid_type_error: "This field must be a string"
    }).trim().min(1, { 
        message: "Answer D can't be a whitespace string" 
    }).max(100, {
        message: "Answer D is too long" 
    }),
    correctAnswer: z.enum(['0', '1', '2', '3'], { message: "Invalid choice"}),
    scriptPostQuestion: z.string({
        required_error: "This field is required",
        invalid_type_error: "This field must be a string"
    }).trim().min(1, { 
        message: "Post-question comment can't be a whitespace string"
    }).max(500, {
        message: "Post-question comment is too long" 
    }),
    scriptAnswer: z.string({
        required_error: "This field is required",
        invalid_type_error: "This field must be a string"
    }).trim().min(1, { 
        message: "Answer comment can't be a whitespace string" 
    }).max(500, {
        message: "Answer comment is too long" 
    })
})

const liveQuizSchema = z.object({
    poster: z.instanceof(File, {
        message: "Poster must be JPEG or PNG file"
    }).refine(file => {
        const allowedTypes = ['image/jpeg', 'image/png'];
        return allowedTypes.includes(file.type);
    }, { 
        message: "File type must be JPEG or PNG"
    }),
    name: z.string({
        required_error: "Quiz's name is required",
        invalid_type_error: "Quiz's name must be a string"
    }).trim().min(1, { 
        message: "Quiz's name can't be a whitespace string" 
    }).max(200, {
        message: "Quiz's name is too long" 
    }),
    description: z.string({
        required_error: "Quiz's description is required",
        invalid_type_error: "Quiz's description must be a string"
    }).trim().min(1, {
        message: "Quiz's description can't be a whitespace string" 
    }).max(500, {
        message: "Quiz's description is too long" 
    }),
    voucher: z.string({
        required_error: "Quiz's voucher is required",
        invalid_type_error: "Quiz's voucher must be a string"
    }).trim().min(1, { 
        message: "Quiz's voucher can't be a whitespace string" 
    }),
    amount: z.coerce.number({
        required_error: "Amount is required",
        invalid_type_error: "Amount must be a number"
    }).int({
        message: "Amount should be an integer" 
    }).positive({
        message: "Amount should be positive" 
    }),
    startDate: z.string({
        required_error: "Start date is required",
        invalid_type_error: "Start date must be a string"
    }).date("Invalid start date").refine(date => {
        const today = new Date()
        const parsedDate = new Date(date)
        today.setHours(0, 0, 0, 0)
        parsedDate.setHours(0, 0, 0, 0)
        return parsedDate >= today
    }, {
        message: "Start date must be today or later"
    }),
    endDate: z.string({
        required_error: "End date is required",
        invalid_type_error: "End date must be a string"
    }).date("Invalid end date"),
    questions: z.array(liveQuizQuestionSchema).nonempty({
        message: "Question list can't be empty"
    }).max(10, {
        message: "Question list cannot exceed 10 questions"
    }),
    scriptQuizIntroduction: z.string({
        required_error: "Quiz's introduction is required",
        invalid_type_error: "Quiz's introduction must be a string"
    }).trim().min(1, {
        message: "Quiz's introduction can't be a whitespace string" 
    }).max(500, {
        message: "Quiz's introduce is too long" 
    })
}).refine(data => new Date(data.endDate) > new Date(data.startDate), {
    message: "End date must be later than start date",
    path: ["endDate"]
})

export type LiveQuizFormState = {
    errors?: {
        poster?: string[],
        name?: string[],
        description?: string[],
        voucher?: string[],
        amount?: string[],
        startDate?: string[],
        endDate?: string[],
        questions?: {
            generalError?: string[],
            questionErrors?: Array<{
                question?: string[],
                answerA?: string[],
                answerB?: string[],
                answerC?: string[],
                answerD?: string[],
                correctAnswer?: string[],
                scriptPostQuestion?: string[],
                scriptAnswer?: string[]
            }>
        },
        scriptQuizIntroduction?: string[]
    }
    message?: string | null
}

export async function createLiveQuiz(prevState: LiveQuizFormState, formData: FormData) : Promise<LiveQuizFormState>{
    let questionsJSONString: any = ''

    try {
        console.log(formData)
        questionsJSONString = formData.get('questions')
        if(typeof questionsJSONString !== 'string'){
            throw new Error()
        }
    } catch (error) {
        console.log(error)
        return {
            message: "Something went wrong!"
        }
    }
    const validateFields = liveQuizSchema.safeParse({
        poster: formData.get('poster'),
        name: formData.get('name'),
        description: formData.get('description'),
        voucher: formData.get('voucher'),
        amount: formData.get('amount'),
        startDate: formData.get('startDate'),
        endDate: formData.get('endDate'),
        questions: JSON.parse(questionsJSONString),
        scriptQuizIntroduction: formData.get('scriptQuizIntroduction')
    })

    if(!validateFields.success) {
        const errorFormat = validateFields.error.format()
        console.log("-------------------------------------")
        console.log(errorFormat)
        console.log("-------------------------------------")

        const errors: LiveQuizFormState['errors'] = {}

        if(errorFormat.poster) errors.poster = errorFormat.poster._errors
        if(errorFormat.name) errors.name = errorFormat.name._errors
        if(errorFormat.description) errors.description = errorFormat.description._errors
        if(errorFormat.voucher) errors.voucher = errorFormat.voucher._errors
        if(errorFormat.amount) errors.amount = errorFormat.amount._errors
        if(errorFormat.startDate) errors.startDate = errorFormat.startDate._errors
        if(errorFormat.endDate) errors.endDate = errorFormat.endDate._errors
        if(errorFormat.scriptQuizIntroduction) errors.scriptQuizIntroduction = errorFormat.scriptQuizIntroduction._errors

        if(errorFormat.questions) {
            errors.questions = {}
            const qErrors = errorFormat.questions
            if(qErrors._errors.length > 0) {
                errors.questions.generalError = qErrors._errors
            }
            else {
                const indices = Object.keys(qErrors).filter(key => key !== '_errors').map(Number)
                const maxIndex = Math.max(...indices)

                const questionErrors = Array(maxIndex + 1).fill(null).map(() => ({}))

                indices.forEach(index => {
                    const questionError = qErrors[index] as any
                    const questionErrorObj: any = {}
                    if(questionError.question) questionErrorObj.question = questionError.question._errors
                    if(questionError.answerA) questionErrorObj.answerA = questionError.answerA._errors
                    if(questionError.answerB) questionErrorObj.answerB = questionError.answerB._errors
                    if(questionError.answerC) questionErrorObj.answerC = questionError.answerC._errors
                    if(questionError.answerD) questionErrorObj.answerD = questionError.answerD._errors
                    if(questionError.correctAnswer) questionErrorObj.correctAnswer = questionError.correctAnswer._errors
                    if(questionError.scriptPostQuestion) questionErrorObj.scriptPostQuestion = questionError.question._errors
                    if(questionError.scriptAnswer) questionErrorObj.scriptAnswer = questionError.scriptAnswer._errors

                    questionErrors[index] = questionErrorObj
                })

                errors.questions.questionErrors = questionErrors
            }
        }

        console.log(errors)
        console.log("****************************")

        return {
            errors: errors,
            message: "Invalid Form. Try filling it in correctly and submit again."
        }
    }
    else {
        console.log("Passed validation")

        const questions = JSON.parse(questionsJSONString)
        const quizzes = questions.map((item: any) => {
            const options = [ item.answerA, item.answerB, item.answerC, item.answerD ]
            const correctAnswer = options[Number(item.correctAnswer)]
            return ({
                scriptPreQuestion: "",
                question: item.question,
                options: options,
                correctAnswer: correctAnswer,
                scriptQuestion: item.scriptPostQuestion,
                scriptAnswer: item.scriptAnswer
            })
        })

        // Pack data and send to express server
        // Send live quiz game's data first
        const liveQuizFormData = new FormData()
        liveQuizFormData.append('title', "")
        liveQuizFormData.append('description', "")
        liveQuizFormData.append('scriptIntro', formData.get('scriptQuizIntroduction') as string)
        liveQuizFormData.append('quizzes', JSON.stringify(quizzes))

        console.log(liveQuizFormData)
        let gameDataID: string = ''
        try{
            const response = await fetch(`${baseURL}/quiz/addQuizz`, {
                method: 'POST',
                body: liveQuizFormData
            })
        
            if(!response.ok){
                const errorMessage = await response.text()
                return {
                    message: errorMessage
                }
            }

            // gameDataId = await response.text()
        } catch (error) {
            return {
                message: "Something went wrong. Try again later."
            }
        }

        // After getting game_data_id, send game's data
        const gameFormData = new FormData()
        gameFormData.append('poster', formData.get('poster') as Blob)
        gameFormData.append('name', formData.get('name') as string)
        gameFormData.append('description', formData.get('description') as string)
        gameFormData.append('game_type_id', "1")
        gameFormData.append('game_data_id', "") // <- to be added
        gameFormData.append('tradable', "false")
        gameFormData.append('voucher_template_id', formData.get('voucher') as string)
        gameFormData.append('amount', formData.get('amount') as string)
        gameFormData.append('start_time', formData.get('startDate') as string)
        gameFormData.append('end_time', formData.get('endDate') as string)

        try{
            const response = await fetch(`${baseURL}/game`, {
                method: 'POST',
                body: gameFormData
            })
        
            if(!response.ok){
                const errorMessage = await response.text()
                return {
                    message: errorMessage
                }
            }
        } catch (error) {
            return {
                message: "Something went wrong. Try again later."
            }
        }

        revalidatePath('/games')
        redirect('/games')
    }
}

// ---------- UPDATE LIVE QUIZ (ADDED API, WAITING FOR FULL IMPLEMENTATION) ----------

const updateLiveQuizSchema = z.object({
    poster: z.union([
        z.instanceof(File, {
            message: "Poster must be JPEG or PNG file"
        }).refine(file => {
            const allowedTypes = ['image/jpeg', 'image/png'];
            return allowedTypes.includes(file.type);
        }, { 
            message: "File type must be JPEG or PNG"
        }),
        z.string({
            required_error: "Poster URL is required",
            invalid_type_error: "Poster must be a string or JPEG or PNG file"
        }).url({
            message: "Poster URL is invalid"
        })
    ]),
    name: z.string({
        required_error: "Quiz's name is required",
        invalid_type_error: "Quiz's name must be a string"
    }).trim().min(1, { 
        message: "Quiz's name can't be a whitespace string" 
    }).max(200, {
        message: "Quiz's name is too long" 
    }),
    description: z.string({
        required_error: "Quiz's description is required",
        invalid_type_error: "Quiz's description must be a string"
    }).trim().min(1, {
        message: "Quiz's description can't be a whitespace string" 
    }).max(500, {
        message: "Quiz's description is too long" 
    }),
    voucher: z.string({
        required_error: "Quiz's voucher is required",
        invalid_type_error: "Quiz's voucher must be a string"
    }).trim().min(1, { 
        message: "Quiz's voucher can't be a whitespace string" 
    }),
    amount: z.coerce.number({
        required_error: "Amount is required",
        invalid_type_error: "Amount must be a number"
    }).int({
        message: "Amount should be an integer" 
    }).positive({
        message: "Amount should be positive" 
    }),
    startDate: z.string({
        required_error: "Start date is required",
        invalid_type_error: "Start date must be a string"
    }).date("Invalid start date"),
    endDate: z.string({
        required_error: "End date is required",
        invalid_type_error: "End date must be a string"
    }).date("Invalid end date"),
    questions: z.array(liveQuizQuestionSchema).nonempty({
        message: "Question list can't be empty"
    }).max(10, {
        message: "Question list cannot exceed 10 questions"
    }),
    scriptQuizIntroduction: z.string({
        required_error: "Quiz's introduction is required",
        invalid_type_error: "Quiz's introduction must be a string"
    }).trim().min(1, {
        message: "Quiz's introduction can't be a whitespace string" 
    }).max(500, {
        message: "Quiz's introduce is too long" 
    })
}).refine(data => new Date(data.endDate) > new Date(data.startDate), {
    message: "End date must be later than start date",
    path: ["endDate"]
})

export async function updateLiveQuiz(prevState: LiveQuizFormState, formData: FormData) : Promise<LiveQuizFormState>{
    let questionsJSONString: any = ''

    try {
        console.log(formData)
        questionsJSONString = formData.get('questions')
        if(typeof questionsJSONString !== 'string'){
            throw new Error()
        }
    } catch (error) {
        console.log(error)
        return {
            message: "Something went wrong!"
        }
    }

    const validateFields = updateLiveQuizSchema.safeParse({
        poster: formData.get('poster'),
        name: formData.get('name'),
        description: formData.get('description'),
        voucher: formData.get('voucher'),
        amount: formData.get('amount'),
        startDate: formData.get('startDate'),
        endDate: formData.get('endDate'),
        questions: JSON.parse(questionsJSONString),
        scriptQuizIntroduction: formData.get('scriptQuizIntroduction')
    })

    if(!validateFields.success) {
        const errorFormat = validateFields.error.format()
        console.log("-------------------------------------")
        console.log(errorFormat)
        console.log("-------------------------------------")

        const errors: LiveQuizFormState['errors'] = {}

        if(errorFormat.poster) errors.poster = errorFormat.poster._errors
        if(errorFormat.name) errors.name = errorFormat.name._errors
        if(errorFormat.description) errors.description = errorFormat.description._errors
        if(errorFormat.voucher) errors.voucher = errorFormat.voucher._errors
        if(errorFormat.amount) errors.amount = errorFormat.amount._errors
        if(errorFormat.startDate) errors.startDate = errorFormat.startDate._errors
        if(errorFormat.endDate) errors.endDate = errorFormat.endDate._errors
        if(errorFormat.scriptQuizIntroduction) errors.scriptQuizIntroduction = errorFormat.scriptQuizIntroduction._errors

        if(errorFormat.questions) {
            errors.questions = {}
            const qErrors = errorFormat.questions
            if(qErrors._errors.length > 0) {
                errors.questions.generalError = qErrors._errors
            }
            else {
                const indices = Object.keys(qErrors).filter(key => key !== '_errors').map(Number)
                const maxIndex = Math.max(...indices)

                const questionErrors = Array(maxIndex + 1).fill(null).map(() => ({}))

                indices.forEach(index => {
                    const questionError = qErrors[index] as any
                    const questionErrorObj: any = {}
                    if(questionError.question) questionErrorObj.question = questionError.question._errors
                    if(questionError.answerA) questionErrorObj.answerA = questionError.answerA._errors
                    if(questionError.answerB) questionErrorObj.answerB = questionError.answerB._errors
                    if(questionError.answerC) questionErrorObj.answerC = questionError.answerC._errors
                    if(questionError.answerD) questionErrorObj.answerD = questionError.answerD._errors
                    if(questionError.correctAnswer) questionErrorObj.correctAnswer = questionError.correctAnswer._errors
                    if(questionError.scriptPostQuestion) questionErrorObj.scriptPostQuestion = questionError.question._errors
                    if(questionError.scriptAnswer) questionErrorObj.scriptAnswer = questionError.scriptAnswer._errors

                    questionErrors[index] = questionErrorObj
                })

                errors.questions.questionErrors = questionErrors
            }
        }

        console.log(errors)
        console.log("****************************")

        return {
            errors: errors,
            message: "Invalid Form. Try filling it in correctly and submit again."
        }
    }
    else {
        console.log("Passed validation")

        // Pack data and send to express server
        const questions = JSON.parse(questionsJSONString)
        const quizzes = questions.map((item: any) => {
            const options = [ item.answerA, item.answerB, item.answerC, item.answerD ]
            const correctAnswer = options[Number(item.correctAnswer)]
            return ({
                scriptPreQuestion: "",
                question: item.question,
                options: options,
                correctAnswer: correctAnswer,
                scriptQuestion: item.scriptPostQuestion,
                scriptAnswer: item.scriptAnswer
            })
        })

        // Update live quiz game's data first
        const liveQuizFormData = new FormData()
        liveQuizFormData.append('title', "")
        liveQuizFormData.append('description', "")
        liveQuizFormData.append('scriptIntro', formData.get('scriptQuizIntroduction') as string)
        liveQuizFormData.append('quizzes', JSON.stringify(quizzes))

        // console.log(liveQuizFormData)
        // try{
        //     const response = await fetch(`${baseURL}/quiz/addQuizz`, {
        //         method: 'POST',
        //         body: liveQuizFormData
        //     })
        
        //     if(!response.ok){
        //         const errorMessage = await response.text()
        //         return {
        //             message: errorMessage
        //         }
        //     }
        // } catch (error) {
        //     return {
        //         message: "Something went wrong. Try again later."
        //     }
        // }

        // After getting game_data_id, send game's data
        const gameFormData = new FormData()
        gameFormData.append('poster', formData.get('poster') as Blob)
        gameFormData.append('name', formData.get('name') as string)
        gameFormData.append('description', formData.get('description') as string)
        gameFormData.append('game_type_id', "1")
        gameFormData.append('game_data_id', formData.get('gameDataId') as string)
        gameFormData.append('tradable', "false")
        gameFormData.append('voucher_template_id', formData.get('voucher') as string)
        gameFormData.append('amount', formData.get('amount') as string)
        gameFormData.append('start_time', formData.get('startDate') as string)
        gameFormData.append('end_time', formData.get('endDate') as string)

        // try{
        //     const response = await fetch(`${baseURL}/game`, {
        //         method: 'POST',
        //         body: gameFormData
        //     })
        
        //     if(!response.ok){
        //         const errorMessage = await response.text()
        //         return {
        //             message: errorMessage
        //         }
        //     }
        // } catch (error) {
        //     return {
        //         message: "Something went wrong. Try again later."
        //     }
        // }

        revalidatePath("/games")
        redirect("/games")
    }
}

// ---------- CREATE EVENT (ADDED API, WAITING FOR FULL IMPLEMENTATION) ----------

const eventGameSchema = z.object({
    id: z.string({
        required_error: "Invalid data",
        invalid_type_error: "Invalid data"
    }),
    poster: z.string({
        required_error: "Invalid data",
        invalid_type_error: "Invalid data"
    }).url({
        message: "Invalid data"
    }),
    name: z.string({
        required_error: "Invalid data",
        invalid_type_error: "Invalid data"
    }),
    description: z.string({
        required_error: "Invalid data",
        invalid_type_error: "Invalid data"
    }),
    start_date: z.string({
        required_error: "Invalid data",
        invalid_type_error: "Invalid data"
    }),
    end_date: z.string({
        required_error: "Invalid data",
        invalid_type_error: "Invalid data"
    }),
    game_type_id: z.string({
        required_error: "Invalid data",
        invalid_type_error: "Invalid data"
    }),
    voucher: z.string({
        required_error: "Invalid data",
        invalid_type_error: "Invalid data"
    }),
    amount: z.string({
        required_error: "Invalid data",
        invalid_type_error: "Invalid data"
    })
})

const createEventSchema = z.object({
    poster: z.instanceof(File, {
        message: "Poster must be JPEG or PNG file"
    }).refine(file => {
        const allowedTypes = ['image/jpeg', 'image/png'];
        return allowedTypes.includes(file.type);
    }, { 
        message: "File type must be JPEG or PNG"
    }),
    name: z.string({
        required_error: "Event's name is required",
        invalid_type_error: "Event's name must be a string"
    }).trim().min(1, { 
        message: "Event's name can't be a whitespace string" 
    }).max(200, {
        message: "Event's name is too long" 
    }),
    description: z.string({
        required_error: "Event's description is required",
        invalid_type_error: "Event's description must be a string"
    }).trim().min(1, {
        message: "Event's description can't be a whitespace string" 
    }).max(500, {
        message: "Event's description is too long" 
    }),
    startDate: z.string({
        required_error: "Start date is required",
        invalid_type_error: "Start date must be a string"
    }).date("Invalid start date"),
    endDate: z.string({
        required_error: "End date is required",
        invalid_type_error: "End date must be a string"
    }).date("Invalid end date"),
    games: z.array(eventGameSchema).nonempty({
        message: "Game list can't be empty"
    }).max(10, {
        message: "Game list cannot exceed 10 items"
    })
}).refine(data => new Date(data.endDate) > new Date(data.startDate), {
    message: "End date must be later than start date",
    path: ["endDate"]
})

export type EventFormState = {
    errors?: {
        poster?: string[],
        name?: string[],
        description?: string[],
        startDate?: string[],
        endDate?: string[],
        games?: string[]
    },
    message?: string | null
}

export async function createEvent(prevState: EventFormState, formData: FormData): Promise<EventFormState>{
    let gamesJSONString: any = ''

    try {
        console.log(formData)
        gamesJSONString = formData.get('games')
        if(typeof gamesJSONString !== 'string'){
            throw new Error()
        }
    } catch (error) {
        console.log(error)
        return {
            message: "Something went wrong!"
        }
    }

    const validateFields = createEventSchema.safeParse({
        poster: formData.get('poster'),
        name: formData.get('name'),
        description: formData.get('description'),
        startDate: formData.get('startDate'),
        endDate: formData.get('endDate'),
        games: JSON.parse(gamesJSONString)
    })

    if(!validateFields.success) {
        const errors = validateFields.error.flatten().fieldErrors
        console.log("-------------------------------------")
        console.log(errors)
        console.log("-------------------------------------")

        return {
            errors: errors,
            message: "Invalid Form. Try filling it in correctly and submit again."
        }
    }
    else {
        console.log("Passed validation")

        // Pack data and send to express server
        const games = JSON.parse(gamesJSONString)
        const gameIds = games.map((item: any) => (item.id))

        const eventFormData = new FormData()
        eventFormData.append('poster', formData.get('poster') as Blob)
        eventFormData.append('name', formData.get('name') as string)
        eventFormData.append('description', formData.get('description') as string)
        eventFormData.append('start_time', formData.get('startDate') as string)
        eventFormData.append('end_time', formData.get('endDate') as string)
        eventFormData.append('games', JSON.stringify(gameIds))

        try{
            const response = await fetch(`${baseURL}/event`, {
                method: 'POST',
                body: eventFormData
            })
        
            if(!response.ok){
                const errorMessage = await response.text()
                return {
                    message: errorMessage
                }
            }
        } catch (error) {
            return {
                message: "Something went wrong. Try again later."
            }
        }

        revalidatePath("/events")
        redirect("/events")
    }
}

// ---------- UPDATE EVENT (ADDED API, WAITING FOR FULL IMPLEMENTATION) ----------

const updateEventSchema = z.object({
    poster: z.union([
        z.instanceof(File, {
            message: "Poster must be JPEG or PNG file"
        }).refine(file => {
            const allowedTypes = ['image/jpeg', 'image/png'];
            return allowedTypes.includes(file.type);
        }, { 
            message: "File type must be JPEG or PNG"
        }),
        z.string({
            required_error: "Poster URL is required",
            invalid_type_error: "Poster must be a string or JPEG or PNG file"
        }).url({
            message: "Poster URL is invalid"
        })
    ]),
    name: z.string({
        required_error: "Event's name is required",
        invalid_type_error: "Event's name must be a string"
    }).trim().min(1, { 
        message: "Event's name can't be a whitespace string" 
    }).max(200, {
        message: "Event's name is too long" 
    }),
    description: z.string({
        required_error: "Event's description is required",
        invalid_type_error: "Event's description must be a string"
    }).trim().min(1, {
        message: "Event's description can't be a whitespace string" 
    }).max(500, {
        message: "Event's description is too long" 
    }),
    startDate: z.string({
        required_error: "Start date is required",
        invalid_type_error: "Start date must be a string"
    }).date("Invalid start date"),
    endDate: z.string({
        required_error: "End date is required",
        invalid_type_error: "End date must be a string"
    }).date("Invalid end date"),
    games: z.array(eventGameSchema).nonempty({
        message: "Game list can't be empty"
    }).max(10, {
        message: "Game list cannot exceed 10 items"
    })
}).refine(data => new Date(data.endDate) > new Date(data.startDate), {
    message: "End date must be later than start date",
    path: ["endDate"]
})

export async function updateEvent(prevState: EventFormState, formData: FormData): Promise<EventFormState>{
    let gamesJSONString: any = ''

    try {
        console.log(formData)
        gamesJSONString = formData.get('games')
        if(typeof gamesJSONString !== 'string'){
            throw new Error()
        }
    } catch (error) {
        console.log(error)
        return {
            message: "Something went wrong!"
        }
    }

    const validateFields = updateEventSchema.safeParse({
        poster: formData.get('poster'),
        name: formData.get('name'),
        description: formData.get('description'),
        startDate: formData.get('startDate'),
        endDate: formData.get('endDate'),
        games: JSON.parse(gamesJSONString)
    })

    if(!validateFields.success) {
        const errors = validateFields.error.flatten().fieldErrors
        console.log("-------------------------------------")
        console.log(errors)
        console.log("-------------------------------------")

        return {
            errors: errors,
            message: "Invalid Form. Try filling it in correctly and submit again."
        }
    }
    else {
        console.log("Passed validation")

        // Pack data and send to express server
        const games = JSON.parse(gamesJSONString)
        const gameIds = games.map((item: any) => (item.id))

        const eventFormData = new FormData()
        eventFormData.append('poster', formData.get('poster') as Blob)
        eventFormData.append('name', formData.get('name') as string)
        eventFormData.append('description', formData.get('description') as string)
        eventFormData.append('start_time', formData.get('startDate') as string)
        eventFormData.append('end_time', formData.get('endDate') as string)
        eventFormData.append('games', JSON.stringify(gameIds))

        try{
            const response = await fetch(`${baseURL}/event/${formData.get('id')}`, {
                method: 'POST',
                body: eventFormData
            })
        
            if(!response.ok){
                const errorMessage = await response.text()
                return {
                    message: errorMessage
                }
            }
        } catch (error) {
            return {
                message: "Something went wrong. Try again later."
            }
        }

        revalidatePath("/events")
        redirect("/events")
    }
}

// ---------- LOGIN (COMPLETED) ----------

const loginSchema = z.object({
    email: z.string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string"
    }).trim().min(1, { 
        message: "Email can't be a whitespace string" 
    }).email("Invalid email format"),
    password: z.string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string"
    }).trim().min(1, { 
        message: "Password can't be a whitespace string" 
    })
})

export type LoginFormState = {
    errors?: {
        email?: string[],
        password?: string[]
    },
    message?: string | null
}

export async function logIn(prevState: LoginFormState, formData: FormData): Promise<LoginFormState>{
    const validateFields = loginSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password')
    })

    if(!validateFields.success) {
        const errors = validateFields.error.flatten().fieldErrors
        console.log("-------------------------------------")
        console.log(errors)
        console.log("-------------------------------------")

        return {
            errors: errors,
            message: "Invalid Form. Try filling it in correctly and submit again."
        }
    }
    else {
        console.log("Passed validation")

        try{
            const response = await fetch(`${baseURL}/auth/login`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "email": formData.get('email'),
                    "password": formData.get('password')
                })
            })
        
            if(!response.ok){
                const errorMessage = await response.text()
                return {
                    message: errorMessage
                }
            }
    
            const data = await response.json()
            //console.log(data.token)
            
            cookies().set('token', data.token, {
                httpOnly: true,
                maxAge: 60 * 60
            })
        } catch (error) {
            return {
                message: "Something went wrong. Try again later."
            }
        }
        
        revalidatePath("/dashboard")
        redirect("/dashboard")
    }
}

// ---------- REGISTER (ADDED API, WAITING FOR MORE FIELDS TO BE ADDED IN REGISTER ROUTE) ----------

const registerSchema = z.object({
    name: z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string"
    }).trim().min(1, { 
        message: "Name can't be a whitespace string" 
    }).max(200, {
        message: "Name's length cannot exceed 200 characters"
    }),
    domain: z.string({
        required_error: "Domain is required",
        invalid_type_error: "Domain must be a string"
    }).trim().min(1, { 
        message: "Domain can't be a whitespace string" 
    }).max(200, {
        message: "Domain's length cannot exceed 200 characters"
    }),
    address: z.string({
        required_error: "Address is required",
        invalid_type_error: "Address must be a string"
    }).trim().min(1, { 
        message: "Address can't be a whitespace string" 
    }).max(200, {
        message: "Address's length cannot exceed 200 characters"
    }),
    latitude: z.coerce.number({
        required_error: "Latitude is required",
        invalid_type_error: "Latitude must be a number"
    }).gte(-90, "Latitude must be between -90 and 90").lte(90, "Latitude must be between -90 and 90"),
    longitude: z.coerce.number({
        required_error: "Longitude is required",
        invalid_type_error: "Longitude must be a number"
    }).gte(-180, "Longitude must be between -180 and 180").lte(180, "Latitude must be between -180 and 180"),
    username: z.string({
        required_error: "Username is required",
        invalid_type_error: "Username must be a string"
    }).trim().regex(/^\S*$/, {
        message: "Username must not contain any whitespace"
    }).min(1, { 
        message: "Username can't be a whitespace string" 
    }).max(200, {
        message: "Username's length cannot exceed 200 characters"
    }),
    email: z.string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string"
    }).trim().min(1, { 
        message: "Email can't be a whitespace string" 
    }).max(200, {
        message: "Email's length cannot exceed 200 characters"
    }).email("Invalid email format"),
    password: z.string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string"
    }).trim().min(1, { 
        message: "Password can't be a whitespace string" 
    }).max(200, {
        message: "Password's length cannot exceed 200 characters"
    }).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
        message: "Password must contain at least one uppercase character, one lowercase character, one number and one special character"
    }),
    confirmPassword: z.string({
        required_error: "Confirm password is required",
        invalid_type_error: "Confirm password must be a string"
    })
}).refine(data => data.password === data.confirmPassword, {
    message: "Confirm password does not match with password",
    path: ["confirmPassword"]
})

export type RegisterFormState = {
    errors?: {
        name?: string[],
        domain?: string[],
        address?: string[],
        latitude?: string[],
        longitude?: string[],
        username?: string[],
        email?: string[],
        password?: string[],
        confirmPassword?: string[]
    },
    message?: string | null
}

export async function register(prevState: RegisterFormState, formData: FormData): Promise<RegisterFormState>{
    const validateFields = registerSchema.safeParse({
        name: formData.get('name'),
        domain: formData.get('domain'),
        address: formData.get('address'),
        latitude: formData.get('latitude'),
        longitude: formData.get('longitude'),
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword')
    })

    if(!validateFields.success) {
        const errors = validateFields.error.flatten().fieldErrors
        console.log("-------------------------------------")
        console.log(errors)
        console.log("-------------------------------------")

        return {
            errors: errors,
            message: "Invalid Form. Try filling it in correctly and submit again."
        }
    }
    else {
        console.log("Passed validation")

        // Pack data and send to express server
        try{
            const response = await fetch(`${baseURL}/auth/register`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "name": formData.get('name'),
                    "email": formData.get('email'),
                    "password": formData.get('password')
                })
            })
        
            if(!response.ok){
                const errorMessage = await response.text()
                return {
                    message: errorMessage
                }
            }
        } catch (error) {
            return {
                message: "Something went wrong. Try again later."
            }
        }

        revalidatePath("/login")
        redirect("/login")
    }
}

// ---------- AI GENERATION (COMPLETED) ----------

export async function generatePostQuestionComment(question: string): Promise<string>{
    const prompt = `Help me write a lively comment for this question: "${question}". Note that the answer for this question mustn't be mentioned, the comment must be no longer than 2 sentences or 500 characters and do not enclose the comment in quotation marks.`

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "model": "qwen/qwen-2-7b-instruct:free",
            "messages": [
                { "role": "user", "content": prompt },
            ],
        })
    })

    if(!response.ok){
        return `${response.status}`
    }

    const data = await response.json()
    return data.choices[0].message.content.trim();
}

export async function generateAnswerComment(question: string, answers: string[], correctAnswer: string): Promise<string>{
    const prompt = `The question is "${question}". The answers for it include ${answers.join(', ')}. And the correct answer is ${answers[Number(correctAnswer)]}. Help me write a comment for this answer. Note that the comment must be no longer than 2 sentences or 500 characters and do not enclose the comment in quotation marks.`

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "model": "qwen/qwen-2-7b-instruct:free",
            "messages": [
                { "role": "user", "content": prompt },
            ],
        })
    })

    if(!response.ok){
        return `${response.status}`
    }

    const data = await response.json()
    return data.choices[0].message.content.trim();
}

export async function generateQuizIntroduction(prompt: string): Promise<string>{
    const promptToSend = `Help me write an introduction for a live quiz game based on this prompt: "${prompt}". Note that the introduction must be no longer than 4 sentences or 500 characters and do not enclose the introduction in quotation marks.`

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "model": "qwen/qwen-2-7b-instruct:free",
            "messages": [
                { "role": "user", "content": promptToSend },
            ],
        })
    })

    if(!response.ok){
        return `${response.status}`
    }

    const data = await response.json()
    return data.choices[0].message.content.trim();
}

// ---------- ITEM COLLECTING ----------

const collectableItemSchema = z.object({
    name: z.string({
        required_error: "Item's name is required",
        invalid_type_error: "Item's name must be a string"
    }).trim().min(1, { 
        message: "Item's name can't be a whitespace string" 
    }).max(200, {
        message: "Item's name is too long" 
    }),
    description: z.string({
        required_error: "Item's description is required",
        invalid_type_error: "Item's description must be a string"
    }).trim().min(1, {
        message: "Item's description can't be a whitespace string" 
    }).max(200, {
        message: "Item's description is too long" 
    }),
    ratio: z.coerce.number({
        required_error: "Ratio is required",
        invalid_type_error: "Ratio must be a number"
    }).int({
        message: "Ratio should be an integer" 
    }).positive({
        message: "Ratio should be positive" 
    })
})

const itemSetSchema = z.object({
    name: z.string({
        required_error: "Item set's name is required",
        invalid_type_error: "Item set's name must be a string"
    }).trim().min(1, { 
        message: "Item set's name can't be a whitespace string" 
    }).max(200, {
        message: "Item set's name is too long" 
    }),
    description: z.string({
        required_error: "Item set's description is required",
        invalid_type_error: "Item set's description must be a string"
    }).trim().min(1, {
        message: "Item set's description can't be a whitespace string" 
    }).max(200, {
        message: "Item set's description is too long" 
    }),
    items: z.array(z.string(), {
        message: "Invalid items data"
    }).nonempty({
        message: "Item set must have at least 1 item"
    })
})

const itemCollectingSchema = z.object({
    poster: z.instanceof(File, {
        message: "Poster must be JPEG or PNG file"
    }).refine(file => {
        const allowedTypes = ['image/jpeg', 'image/png'];
        return allowedTypes.includes(file.type);
    }, { 
        message: "File type must be JPEG or PNG"
    }),
    name: z.string({
        required_error: "Quiz's name is required",
        invalid_type_error: "Quiz's name must be a string"
    }).trim().min(1, { 
        message: "Quiz's name can't be a whitespace string" 
    }).max(200, {
        message: "Quiz's name is too long" 
    }),
    description: z.string({
        required_error: "Quiz's description is required",
        invalid_type_error: "Quiz's description must be a string"
    }).trim().min(1, {
        message: "Quiz's description can't be a whitespace string" 
    }).max(500, {
        message: "Quiz's description is too long" 
    }),
    voucher: z.string({
        required_error: "Quiz's voucher is required",
        invalid_type_error: "Quiz's voucher must be a string"
    }).trim().min(1, { 
        message: "Quiz's voucher can't be a whitespace string" 
    }),
    amount: z.coerce.number({
        required_error: "Amount is required",
        invalid_type_error: "Amount must be a number"
    }).int({
        message: "Amount should be an integer" 
    }).positive({
        message: "Amount should be positive" 
    }),
    startDate: z.string({
        required_error: "Start date is required",
        invalid_type_error: "Start date must be a string"
    }).date("Invalid start date").refine(date => {
        const today = new Date()
        const parsedDate = new Date(date)
        today.setHours(0, 0, 0, 0)
        parsedDate.setHours(0, 0, 0, 0)
        return parsedDate >= today
    }, {
        message: "Start date must be today or later"
    }),
    endDate: z.string({
        required_error: "End date is required",
        invalid_type_error: "End date must be a string"
    }).date("Invalid end date"),
    items: z.array(collectableItemSchema, {
        message: "Invalid items data"
    }).length(6, {
        message: "Invalid items data"
    }),
    item_image_1: z.instanceof(File, {
        message: "Image must be JPEG or PNG file"
    }).refine(file => {
        const allowedTypes = ['image/jpeg', 'image/png'];
        return allowedTypes.includes(file.type);
    }, { 
        message: "File type must be JPEG or PNG"
    }),
    item_image_2: z.instanceof(File, {
        message: "Image must be JPEG or PNG file"
    }).refine(file => {
        const allowedTypes = ['image/jpeg', 'image/png'];
        return allowedTypes.includes(file.type);
    }, { 
        message: "File type must be JPEG or PNG"
    }),
    item_image_3: z.instanceof(File, {
        message: "Image must be JPEG or PNG file"
    }).refine(file => {
        const allowedTypes = ['image/jpeg', 'image/png'];
        return allowedTypes.includes(file.type);
    }, { 
        message: "File type must be JPEG or PNG"
    }),
    item_image_4: z.instanceof(File, {
        message: "Image must be JPEG or PNG file"
    }).refine(file => {
        const allowedTypes = ['image/jpeg', 'image/png'];
        return allowedTypes.includes(file.type);
    }, { 
        message: "File type must be JPEG or PNG"
    }),
    item_image_5: z.instanceof(File, {
        message: "Image must be JPEG or PNG file"
    }).refine(file => {
        const allowedTypes = ['image/jpeg', 'image/png'];
        return allowedTypes.includes(file.type);
    }, { 
        message: "File type must be JPEG or PNG"
    }),
    item_image_6: z.instanceof(File, {
        message: "Image must be JPEG or PNG file"
    }).refine(file => {
        const allowedTypes = ['image/jpeg', 'image/png'];
        return allowedTypes.includes(file.type);
    }, { 
        message: "File type must be JPEG or PNG"
    }),
    itemSets: z.array(itemSetSchema).nonempty({
        message: "Item set list can't be empty"
    }).max(10, {
        message: "Item set list cannot exceed 10 items"
    })
}).refine(data => new Date(data.endDate) > new Date(data.startDate), {
    message: "End date must be later than start date",
    path: ["endDate"]
})

export type ItemCollectingFormState = {
    errors?: {
        poster?: string[],
        name?: string[],
        description?: string[],
        voucher?: string[],
        amount?: string[],
        startDate?: string[],
        endDate?: string[],
        items?: {
            generalError?: string[],
            itemErrors?: Array<{
                name?: string[],
                description?: string[],
                ratio?: string[]
            }>,
            itemImageErrors?: Array<string[]>
        }
        itemSets?: {
            generalError?: string[],
            itemSetErrors?: Array<{
                name?: string[],
                description?: string[],
                items?: string[]
            }>
        }
    }
    message?: string | null
}

export async function createItemCollecting(prevState: ItemCollectingFormState, formData: FormData) : Promise<ItemCollectingFormState>{
    let itemsJSONString: any = ''
    let itemSetsJSONString: any = ''

    try {
        console.log(formData)
        itemsJSONString = formData.get('items')
        if(typeof itemsJSONString !== 'string'){
            throw new Error()
        }
        itemSetsJSONString = formData.get('itemSets')
        if(typeof itemsJSONString !== 'string'){
            throw new Error()
        }
    } catch (error) {
        console.log(error)
        return {
            message: "Something went wrong!"
        }
    }
    const validateFields = itemCollectingSchema.safeParse({
        poster: formData.get('poster'),
        name: formData.get('name'),
        description: formData.get('description'),
        voucher: formData.get('voucher'),
        amount: formData.get('amount'),
        startDate: formData.get('startDate'),
        endDate: formData.get('endDate'),
        item_image_1: formData.get('item_image_1'),
        item_image_2: formData.get('item_image_2'),
        item_image_3: formData.get('item_image_3'),
        item_image_4: formData.get('item_image_4'),
        item_image_5: formData.get('item_image_5'),
        item_image_6: formData.get('item_image_6'),
        items: JSON.parse(itemsJSONString),
        itemSets: JSON.parse(itemSetsJSONString)
    })

    if(!validateFields.success) {
        const errorFormat = validateFields.error.format()
        console.log("-------------------------------------")
        console.log(errorFormat)
        console.log("-------------------------------------")

        const errors: ItemCollectingFormState['errors'] = {}

        if(errorFormat.poster) errors.poster = errorFormat.poster._errors
        if(errorFormat.name) errors.name = errorFormat.name._errors
        if(errorFormat.description) errors.description = errorFormat.description._errors
        if(errorFormat.voucher) errors.voucher = errorFormat.voucher._errors
        if(errorFormat.amount) errors.amount = errorFormat.amount._errors
        if(errorFormat.startDate) errors.startDate = errorFormat.startDate._errors
        if(errorFormat.endDate) errors.endDate = errorFormat.endDate._errors

        if(errorFormat.items) {
            errors.items = {}
            const iErrors = errorFormat.items
            if(iErrors._errors.length > 0) {
                errors.items.generalError = iErrors._errors
            }
            else {
                const indices = Object.keys(iErrors).filter(key => key !== '_errors').map(Number)
                const maxIndex = Math.max(...indices)

                const itemErrors = Array(maxIndex + 1).fill(null).map(() => ({}))

                indices.forEach(index => {
                    const itemError = iErrors[index] as any
                    const itemErrorObj: any = {}
                    if(itemError.name) itemErrorObj.name = itemError.name._errors
                    if(itemError.description) itemErrorObj.description = itemError.description._errors
                    if(itemError.ratio) itemErrorObj.ratio = itemError.ratio._errors

                    itemErrors[index] = itemErrorObj
                })

                errors.items.itemErrors = itemErrors

                errors.items.itemImageErrors = Array(maxIndex + 1).fill(null)
                if(errorFormat.item_image_1) errors.items.itemImageErrors[0] = errorFormat.item_image_1._errors
                if(errorFormat.item_image_2) errors.items.itemImageErrors[1] = errorFormat.item_image_2._errors
                if(errorFormat.item_image_3) errors.items.itemImageErrors[2] = errorFormat.item_image_3._errors
                if(errorFormat.item_image_4) errors.items.itemImageErrors[3] = errorFormat.item_image_4._errors
                if(errorFormat.item_image_5) errors.items.itemImageErrors[4] = errorFormat.item_image_5._errors
                if(errorFormat.item_image_6) errors.items.itemImageErrors[5] = errorFormat.item_image_6._errors
            }
        }

        if(errorFormat.itemSets) {
            errors.itemSets = {}
            const iSErrors = errorFormat.itemSets
            if(iSErrors._errors.length > 0) {
                errors.itemSets.generalError = iSErrors._errors
            }
            else {
                const indices = Object.keys(iSErrors).filter(key => key !== '_errors').map(Number)
                const maxIndex = Math.max(...indices)

                const itemSErrors = Array(maxIndex + 1).fill(null).map(() => ({}))

                indices.forEach(index => {
                    const itemSetError = iSErrors[index] as any
                    const itemSetErrorObj: any = {}
                    if(itemSetError.name) itemSetErrorObj.name = itemSetError.name._errors
                    if(itemSetError.description) itemSetErrorObj.description = itemSetError.description._errors
                    if(itemSetError.items) itemSetErrorObj.items = itemSetError.items._errors

                    itemSErrors[index] = itemSetErrorObj
                })

                errors.itemSets.itemSetErrors = itemSErrors
            }
        }

        console.log(errors)
        console.log("****************************")

        return {
            errors: errors,
            message: "Invalid Form. Try filling it in correctly and submit again."
        }
    }
    else {
        console.log("Passed validation")

        // Pack data and send to express server

        revalidatePath('/games')
        redirect('/games')
    }
}

// ---------- UPDATE ITEM COLLECTING ----------

const updateItemCollectingSchema = z.object({
    poster: z.union([
        z.instanceof(File, {
            message: "Poster must be JPEG or PNG file"
        }).refine(file => {
            const allowedTypes = ['image/jpeg', 'image/png'];
            return allowedTypes.includes(file.type);
        }, { 
            message: "File type must be JPEG or PNG"
        }),
        z.string({
            required_error: "Poster URL is required",
            invalid_type_error: "Poster must be a string or JPEG or PNG file"
        }).url({
            message: "Poster URL is invalid"
        })
    ]),
    name: z.string({
        required_error: "Quiz's name is required",
        invalid_type_error: "Quiz's name must be a string"
    }).trim().min(1, { 
        message: "Quiz's name can't be a whitespace string" 
    }).max(200, {
        message: "Quiz's name is too long" 
    }),
    description: z.string({
        required_error: "Quiz's description is required",
        invalid_type_error: "Quiz's description must be a string"
    }).trim().min(1, {
        message: "Quiz's description can't be a whitespace string" 
    }).max(500, {
        message: "Quiz's description is too long" 
    }),
    voucher: z.string({
        required_error: "Quiz's voucher is required",
        invalid_type_error: "Quiz's voucher must be a string"
    }).trim().min(1, { 
        message: "Quiz's voucher can't be a whitespace string" 
    }),
    amount: z.coerce.number({
        required_error: "Amount is required",
        invalid_type_error: "Amount must be a number"
    }).int({
        message: "Amount should be an integer" 
    }).positive({
        message: "Amount should be positive" 
    }),
    startDate: z.string({
        required_error: "Start date is required",
        invalid_type_error: "Start date must be a string"
    }).date("Invalid start date"),
    endDate: z.string({
        required_error: "End date is required",
        invalid_type_error: "End date must be a string"
    }).date("Invalid end date"),
    items: z.array(collectableItemSchema, {
        message: "Invalid items data"
    }).length(6, {
        message: "Invalid items data"
    }),
    item_image_1: z.union([
        z.instanceof(File, {
            message: "Image must be JPEG or PNG file"
        }).refine(file => {
            const allowedTypes = ['image/jpeg', 'image/png'];
            return allowedTypes.includes(file.type);
        }, { 
            message: "File type must be JPEG or PNG"
        }),
        z.string({
            required_error: "Image URL is required",
            invalid_type_error: "Image must be a string or JPEG or PNG file"
        }).url({
            message: "Image URL is invalid"
        })
    ]),
    item_image_2: z.union([
        z.instanceof(File, {
            message: "Image must be JPEG or PNG file"
        }).refine(file => {
            const allowedTypes = ['image/jpeg', 'image/png'];
            return allowedTypes.includes(file.type);
        }, { 
            message: "File type must be JPEG or PNG"
        }),
        z.string({
            required_error: "Image URL is required",
            invalid_type_error: "Image must be a string or JPEG or PNG file"
        }).url({
            message: "Image URL is invalid"
        })
    ]),
    item_image_3: z.union([
        z.instanceof(File, {
            message: "Image must be JPEG or PNG file"
        }).refine(file => {
            const allowedTypes = ['image/jpeg', 'image/png'];
            return allowedTypes.includes(file.type);
        }, { 
            message: "File type must be JPEG or PNG"
        }),
        z.string({
            required_error: "Image URL is required",
            invalid_type_error: "Image must be a string or JPEG or PNG file"
        }).url({
            message: "Image URL is invalid"
        })
    ]),
    item_image_4: z.union([
        z.instanceof(File, {
            message: "Image must be JPEG or PNG file"
        }).refine(file => {
            const allowedTypes = ['image/jpeg', 'image/png'];
            return allowedTypes.includes(file.type);
        }, { 
            message: "File type must be JPEG or PNG"
        }),
        z.string({
            required_error: "Image URL is required",
            invalid_type_error: "Image must be a string or JPEG or PNG file"
        }).url({
            message: "Image URL is invalid"
        })
    ]),
    item_image_5: z.union([
        z.instanceof(File, {
            message: "Image must be JPEG or PNG file"
        }).refine(file => {
            const allowedTypes = ['image/jpeg', 'image/png'];
            return allowedTypes.includes(file.type);
        }, { 
            message: "File type must be JPEG or PNG"
        }),
        z.string({
            required_error: "Image URL is required",
            invalid_type_error: "Image must be a string or JPEG or PNG file"
        }).url({
            message: "Image URL is invalid"
        })
    ]),
    item_image_6: z.union([
        z.instanceof(File, {
            message: "Image must be JPEG or PNG file"
        }).refine(file => {
            const allowedTypes = ['image/jpeg', 'image/png'];
            return allowedTypes.includes(file.type);
        }, { 
            message: "File type must be JPEG or PNG"
        }),
        z.string({
            required_error: "Image URL is required",
            invalid_type_error: "Image must be a string or JPEG or PNG file"
        }).url({
            message: "Image URL is invalid"
        })
    ]),
    itemSets: z.array(itemSetSchema).nonempty({
        message: "Item set list can't be empty"
    }).max(10, {
        message: "Item set list cannot exceed 10 items"
    })
}).refine(data => new Date(data.endDate) > new Date(data.startDate), {
    message: "End date must be later than start date",
    path: ["endDate"]
})

export async function updateItemCollecting(prevState: ItemCollectingFormState, formData: FormData) : Promise<ItemCollectingFormState>{
    let itemsJSONString: any = ''
    let itemSetsJSONString: any = ''

    try {
        console.log(formData)
        itemsJSONString = formData.get('items')
        if(typeof itemsJSONString !== 'string'){
            throw new Error()
        }
        itemSetsJSONString = formData.get('itemSets')
        if(typeof itemsJSONString !== 'string'){
            throw new Error()
        }
    } catch (error) {
        console.log(error)
        return {
            message: "Something went wrong!"
        }
    }
    const validateFields = updateItemCollectingSchema.safeParse({
        poster: formData.get('poster'),
        name: formData.get('name'),
        description: formData.get('description'),
        voucher: formData.get('voucher'),
        amount: formData.get('amount'),
        startDate: formData.get('startDate'),
        endDate: formData.get('endDate'),
        item_image_1: formData.get('item_image_1'),
        item_image_2: formData.get('item_image_2'),
        item_image_3: formData.get('item_image_3'),
        item_image_4: formData.get('item_image_4'),
        item_image_5: formData.get('item_image_5'),
        item_image_6: formData.get('item_image_6'),
        items: JSON.parse(itemsJSONString),
        itemSets: JSON.parse(itemSetsJSONString)
    })

    if(!validateFields.success) {
        const errorFormat = validateFields.error.format()
        console.log("-------------------------------------")
        console.log(errorFormat)
        console.log("-------------------------------------")

        const errors: ItemCollectingFormState['errors'] = {}

        if(errorFormat.poster) errors.poster = errorFormat.poster._errors
        if(errorFormat.name) errors.name = errorFormat.name._errors
        if(errorFormat.description) errors.description = errorFormat.description._errors
        if(errorFormat.voucher) errors.voucher = errorFormat.voucher._errors
        if(errorFormat.amount) errors.amount = errorFormat.amount._errors
        if(errorFormat.startDate) errors.startDate = errorFormat.startDate._errors
        if(errorFormat.endDate) errors.endDate = errorFormat.endDate._errors

        if(errorFormat.items) {
            errors.items = {}
            const iErrors = errorFormat.items
            if(iErrors._errors.length > 0) {
                errors.items.generalError = iErrors._errors
            }
            else {
                const indices = Object.keys(iErrors).filter(key => key !== '_errors').map(Number)
                const maxIndex = Math.max(...indices)

                const itemErrors = Array(maxIndex + 1).fill(null).map(() => ({}))

                indices.forEach(index => {
                    const itemError = iErrors[index] as any
                    const itemErrorObj: any = {}
                    if(itemError.name) itemErrorObj.name = itemError.name._errors
                    if(itemError.description) itemErrorObj.description = itemError.description._errors
                    if(itemError.ratio) itemErrorObj.ratio = itemError.ratio._errors

                    itemErrors[index] = itemErrorObj
                })

                errors.items.itemErrors = itemErrors

                errors.items.itemImageErrors = Array(maxIndex + 1).fill(null)
                if(errorFormat.item_image_1) errors.items.itemImageErrors[0] = errorFormat.item_image_1._errors
                if(errorFormat.item_image_2) errors.items.itemImageErrors[1] = errorFormat.item_image_2._errors
                if(errorFormat.item_image_3) errors.items.itemImageErrors[2] = errorFormat.item_image_3._errors
                if(errorFormat.item_image_4) errors.items.itemImageErrors[3] = errorFormat.item_image_4._errors
                if(errorFormat.item_image_5) errors.items.itemImageErrors[4] = errorFormat.item_image_5._errors
                if(errorFormat.item_image_6) errors.items.itemImageErrors[5] = errorFormat.item_image_6._errors
            }
        }

        if(errorFormat.itemSets) {
            errors.itemSets = {}
            const iSErrors = errorFormat.itemSets
            if(iSErrors._errors.length > 0) {
                errors.itemSets.generalError = iSErrors._errors
            }
            else {
                const indices = Object.keys(iSErrors).filter(key => key !== '_errors').map(Number)
                const maxIndex = Math.max(...indices)

                const itemSErrors = Array(maxIndex + 1).fill(null).map(() => ({}))

                indices.forEach(index => {
                    const itemSetError = iSErrors[index] as any
                    const itemSetErrorObj: any = {}
                    if(itemSetError.name) itemSetErrorObj.name = itemSetError.name._errors
                    if(itemSetError.description) itemSetErrorObj.description = itemSetError.description._errors
                    if(itemSetError.items) itemSetErrorObj.items = itemSetError.items._errors

                    itemSErrors[index] = itemSetErrorObj
                })

                errors.itemSets.itemSetErrors = itemSErrors
            }
        }

        console.log(errors)
        console.log("****************************")

        return {
            errors: errors,
            message: "Invalid Form. Try filling it in correctly and submit again."
        }
    }
    else {
        console.log("Passed validation")

        // Pack data and send to express server

        revalidatePath('/games')
        redirect('/games')
    }
}