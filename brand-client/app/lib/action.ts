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

        revalidatePath("/events")
        redirect("/events")
    }
}

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

        revalidatePath("/events")
        redirect("/events")
    }
}

const loginSchema = z.object({
    username: z.string({
        required_error: "Username is required",
        invalid_type_error: "Username must be a string"
    }).trim().min(1, { 
        message: "Username can't be a whitespace string" 
    }),
    password: z.string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string"
    }).trim().min(1, { 
        message: "Password can't be a whitespace string" 
    })
})

export type LoginFormState = {
    errors?: {
        username?: string[],
        password?: string[]
    },
    message?: string | null
}

export async function logIn(prevState: LoginFormState, formData: FormData): Promise<LoginFormState>{
    const validateFields = loginSchema.safeParse({
        username: formData.get('username'),
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

        // Pack data and send to express server
        // Get a token and store it somewhere

        revalidatePath("/dashboard")
        redirect("/dashboard")
    }
}

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

        revalidatePath("/login")
        redirect("/login")
    }
}