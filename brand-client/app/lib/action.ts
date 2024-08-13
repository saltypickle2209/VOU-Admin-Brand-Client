'use server'

import { revalidatePath, revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"

export async function revalidateDashboard() {
    revalidatePath('/dashboard')
    redirect('/dashboard')
}

export async function revalidateEvents() {
    revalidatePath('/events')
    redirect('/events')
}

export async function revalidateGames() {
    revalidatePath('/games')
    redirect('/games')
}

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
        }
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
        questions: JSON.parse(questionsJSONString)
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

        revalidatePath('/games')
        redirect('/games')
    }
}

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
        questions: JSON.parse(questionsJSONString)
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

        revalidatePath("/games")
        redirect("/games")
    }
}