'use client'

import {
    PhotoIcon,
    InformationCircleIcon,
    AdjustmentsHorizontalIcon,
    PlusCircleIcon,
    TrashIcon,
    ChatBubbleBottomCenterTextIcon
} from '@heroicons/react/24/outline';
import { ChangeEvent, FormEvent, useState } from 'react';
import clsx from 'clsx';
import { useFormState } from 'react-dom';
import { LiveQuiz, Question } from '@/app/lib/definition';
import { generateAnswerComment, generatePostQuestionComment, generateQuizIntroduction, LiveQuizFormState, updateLiveQuiz } from '@/app/lib/action';

export default function LiveQuizEditForm({
    data
}: {
    data: LiveQuiz
}) {
    const initialState: LiveQuizFormState = { message: null, errors: {} }
    const [state, formAction] = useFormState(updateLiveQuiz, initialState)

    const [poster, setPoster] = useState<File | string | null>(data.poster)
    const [quizName, setQuizName] = useState<string>(data.name)
    const [quizDescription, setQuizDescription] = useState<string>(data.description)
    const [voucher, setVoucher] = useState<string>(data.voucher)
    const [voucherAmount, setVoucherAmount] = useState<number>(Number(data.amount))
    const [startDate, setStartDate] = useState<string>(data.startDate)
    const [endDate, setEndDate] = useState<string>(data.endDate)

    const [scriptQuizIntroduction, setScriptQuizIntroduction] = useState<string>(data.scriptQuizIntroduction)
    const [quizIntroductionPrompt, setQuizIntroductionPrompt] = useState<string>('')
    const [canIntroductionGenerate, setCanIntroductionGenerate] = useState<boolean>(false)
    const [isIntroductionGenerating, setIsIntroductionGenerating] = useState<boolean>(false)

    const [questions, setQuestions] = useState<Question[]>(data.questions)
    const [canGenerate, setCanGenerate] = useState<boolean[]>(Array(data.questions.length).fill(true))
    const [isGenerating, setIsGenerating] = useState<boolean[]>(Array(data.questions.length).fill(false))

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        if(event.target.files && event.target.files[0]){
            setPoster(event.target.files[0])
        }
    }

    const handleQuestionChange = (index: number, field: keyof Question, value: string) => {
        const updatedQuestions = [...questions]
        updatedQuestions[index] = { ...updatedQuestions[index], [field]: value }
        
        const updatedCanGenerate = [...canGenerate]
        updatedCanGenerate[index] = checkQuestionAtIndex(updatedQuestions, index)

        setQuestions(updatedQuestions)
        setCanGenerate(updatedCanGenerate)
    }

    const handleAddQuestion = () => {
        setQuestions([
            ...questions,
            {
                question: '',
                answerA: '',
                answerB: '',
                answerC: '',
                answerD: '',
                correctAnswer: "0",
                scriptPostQuestion: '',
                scriptAnswer: ''
            }
        ])
        setCanGenerate([
            ...canGenerate,
            false
        ])
        setIsGenerating([
            ...isGenerating,
            false
        ])
    }

    const handleRemoveQuestion = (index: number) => {
        setQuestions(questions.filter((_, i) => i !== index))
        setCanGenerate(canGenerate.filter((_, i) => i !== index))
        setIsGenerating(isGenerating.filter((_, i) => i !== index))
    }

    const checkQuestionAtIndex = (questions: Question[], index: number): boolean => {
        const question = questions[index]
        if(question.question.trim().length === 0)
            return false
        if(question.answerA.trim().length === 0 || question.answerB.trim().length === 0 || question.answerC.trim().length === 0 || question.answerD.trim().length === 0)
            return false
        if(!["0", "1", "2", "3"].includes(question.correctAnswer))
            return false
        return true
    }

    const handleGenerateComments = async (index: number) => {
        if(checkQuestionAtIndex(questions, index)) {
            setIsGenerating(prevIsGenerating => {
                const updatedIsGenerating = [...prevIsGenerating];
                updatedIsGenerating[index] = true;
                return updatedIsGenerating;
            })

            const question = questions[index]
            try {
                const [postQuestionComment, answerComment] = await Promise.all([
                    generatePostQuestionComment(question.question),
                    generateAnswerComment(question.question, [question.answerA, question.answerB, question.answerC, question.answerD], question.correctAnswer)
                ])

                setQuestions(prevQuestions => {
                    const updatedQuestions = [...prevQuestions];
                    updatedQuestions[index] = { 
                        ...updatedQuestions[index], 
                        scriptPostQuestion: postQuestionComment,
                        scriptAnswer: answerComment 
                    };
                    return updatedQuestions;
                })
            } catch (error) {
                console.log("Error occured while fetching comments.")
                return
            } finally {
                setIsGenerating(prevIsGenerating => {
                    const updatedIsGenerating = [...prevIsGenerating];
                    updatedIsGenerating[index] = false;
                    return updatedIsGenerating;
                })
            }
        }
    }

    const handleIntroductionPromptChange = (value: string) => {
        setQuizIntroductionPrompt(value)
        setCanIntroductionGenerate(value.trim().length !== 0)
    }

    const handleGenerateIntroduction = async () => {
        if(quizIntroductionPrompt.trim().length !== 0) {
            setIsIntroductionGenerating(true)

            try {
                const generatedIntroduction = await generateQuizIntroduction(quizIntroductionPrompt)
                setScriptQuizIntroduction(generatedIntroduction)
            } catch (error) {
                console.log("Error occured while fetching introduction.")
                return
            } finally {
                setIsIntroductionGenerating(false)
            }
        }
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        
        const formData = new FormData()
        if(poster) formData.append('poster', poster)
        formData.append('name', quizName)
        formData.append('description', quizDescription)
        formData.append('voucher', voucher)
        formData.append('amount', voucherAmount.toString())
        formData.append('startDate', startDate)
        formData.append('endDate', endDate)
        formData.append('scriptQuizIntroduction', scriptQuizIntroduction)
        formData.append('questions', JSON.stringify(questions))

        formAction(formData)
    }

    return (
        <form onSubmit={handleSubmit} className="w-full px-6 grid grid-cols-1 divide-y-2 divide-gray-300 lg:py-6 lg:px-0 lg:divide-y-0 lg:divide-x-2 lg:grid-cols-2 bg-white rounded-md shadow-md">
            <div className="relative w-full h-full">
                <div className="sticky top-0 flex flex-col gap-y-4 py-8 lg:px-8 lg:py-0">
                    <div className="flex gap-x-2 items-center text-gray-950">
                        <InformationCircleIcon className="w-5"/>
                        <h2 className="font-semibold">Basic Information</h2>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="poster" className={ clsx(
                            "overflow-hidden flex cursor-pointer w-full aspect-video rounded-md",
                            {
                                "relative flex-col gap-y-4 items-center justify-center border-2 border-dashed text-violet-500 border-violet-500 hover:border-violet-800 hover:text-violet-800 transition-colors duration-300": !poster
                            }
                        )}>
                            {poster ? (
                                typeof poster  === 'string' ? (
                                    poster !== '' ? (
                                        <img src={poster} alt="Image Preview" className="w-full h-full object-cover"/>
                                    ) : (
                                        <>
                                            <div className="absolute inset-4 border-2 border-violet-500 rounded-md hover:border-violet-800 transition-colors duration-300"></div>
                                            <PhotoIcon className="w-16"/>
                                            <p className="text-sm font-semibold">Choose your game's poster</p>
                                        </>
                                    )
                                ) : (
                                    <img src={URL.createObjectURL(poster)} alt="Image Preview" className="w-full h-full object-cover"/>
                                )
                            ) : (
                                <>
                                    <div className="absolute inset-4 border-2 border-violet-500 rounded-md hover:border-violet-800 transition-colors duration-300"></div>
                                    <PhotoIcon className="w-16"/>
                                    <p className="text-sm font-semibold">Choose your game's poster</p>
                                </>
                            )}
                            <input id="poster" type="file" className="hidden" accept="image/png, image/jpeg" onChange={handleImageChange}/>
                        </label>
                        {state.errors?.poster && state.errors.poster.map((error: string) => (
                            <p className="text-xs text-red-700 mt-2" key={error}>{error}</p>
                        ))}
                    </div>
                    
                    <div className="relative mt-2 flex flex-col">
                        <input type="text" id="name" value={quizName} className="block w-full py-2 px-0.5 text-sm text-gray-950 bg-transparent border-1 border-l-0 border-r-0 border-t-0 border-gray-500 focus:outline-none focus:ring-0 focus:border-violet-800 transition-colors duration-300 peer" placeholder=" " required onChange={(e) => setQuizName(e.target.value)}/>
                        <label htmlFor="name" className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-4 left-0.5 origin-top-left z-10 peer-focus:start-0 peer-focus:text-violet-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0.5 after:content-['*'] after:ml-0.5 after:text-red-500 duration-300">Name</label>
                        {state.errors?.name && state.errors.name.map((error: string) => (
                            <p className="text-xs text-red-700 mt-2" key={error}>{error}</p>
                        ))}
                    </div>
                    <div className="relative mt-2 flex flex-col">
                        <textarea id="description" value={quizDescription} maxLength={500} rows={8} className="resize-none block w-full p-2 text-sm text-gray-950 bg-transparent rounded-md border-1 border-gray-500 focus:outline-none focus:ring-0 focus:border-violet-800 transition-colors duration-300 peer" placeholder=" " required onChange={(e) => setQuizDescription(e.target.value)}/>
                        <label htmlFor="description" className="absolute bg-white px-2 rounded-full text-sm text-gray-500 transform -translate-y-6 scale-75 top-4 left-0.5 origin-top-left z-10 peer-focus:start-0 peer-focus:text-violet-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0.5 after:content-['*'] after:ml-0.5 after:text-red-500 duration-300">Description</label>
                        {state.errors?.description && state.errors.description.map((error: string) => (
                            <p className="text-xs text-red-700 mt-2" key={error}>{error}</p>
                        ))}
                    </div>
                    <div className="flex gap-x-4 mt-2">
                        <div className="relative w-3/5 flex flex-col">
                            <select id="voucher" value={voucher} className="block w-full py-2 px-0.5 text-sm text-gray-950 bg-transparent border-1 border-l-0 border-r-0 border-t-0 border-gray-500 focus:outline-none focus:ring-0 focus:border-violet-800 transition-colors duration-300 peer" required onChange={(e) => setVoucher(e.target.value)}>
                                <option value="">Select a voucher</option>
                                <option value="1">Voucher A</option>
                                <option value="2">Voucher B</option>
                            </select>
                            <label htmlFor="voucher" className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-4 left-0.5 origin-top-left z-10 peer-focus:text-violet-800 after:content-['*'] after:ml-0.5 after:text-red-500 duration-300">Voucher</label>
                            {state.errors?.voucher && state.errors.voucher.map((error: string) => (
                                <p className="text-xs text-red-700 mt-2" key={error}>{error}</p>
                            ))}
                        </div>
                        <div className="relative grow flex flex-col">
                            <input type="number" id="amount" value={voucherAmount} className="block w-full py-2 px-0.5 text-sm text-gray-950 bg-transparent border-1 border-l-0 border-r-0 border-t-0 border-gray-500 focus:outline-none focus:ring-0 focus:border-violet-800 transition-colors duration-300 peer" placeholder=" " required onChange={(e) => setVoucherAmount(Number(e.target.value))}/>
                            <label htmlFor="amount" className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-4 left-0.5 origin-top-left z-10 peer-focus:start-0 peer-focus:text-violet-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0.5 after:content-['*'] after:ml-0.5 after:text-red-500 duration-300">Amount</label>
                            {state.errors?.amount && state.errors.amount.map((error: string) => (
                                <p className="text-xs text-red-700 mt-2" key={error}>{error}</p>
                            ))}
                        </div>
                    </div>
                    <div className="flex gap-x-4 mt-2">
                        <div className="relative w-1/2 flex flex-col">
                            <input type="date" id="start_date" value={startDate} className="block w-full py-2 px-0.5 text-sm text-gray-950 bg-transparent border-1 border-l-0 border-r-0 border-t-0 border-gray-500 focus:outline-none focus:ring-0 focus:border-violet-800 transition-colors duration-300 peer" placeholder=" " required onChange={(e) => setStartDate(e.target.value)}/>
                            <label htmlFor="start_date" className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-4 left-0.5 origin-top-left z-10 peer-focus:start-0 peer-focus:text-violet-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0.5 after:content-['*'] after:ml-0.5 after:text-red-500 duration-300">Start date</label>
                            {state.errors?.startDate && state.errors.startDate.map((error: string) => (
                                <p className="text-xs text-red-700 mt-2" key={error}>{error}</p>
                            ))}
                        </div>
                        <div className="relative grow flex flex-col">
                            <input type="date" id="end_date" value={endDate} className="block w-full py-2 px-0.5 text-sm text-gray-950 bg-transparent border-1 border-l-0 border-r-0 border-t-0 border-gray-500 focus:outline-none focus:ring-0 focus:border-violet-800 transition-colors duration-300 peer" placeholder=" " required onChange={(e) => setEndDate(e.target.value)}/>
                            <label htmlFor="end_date" className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-4 left-0.5 origin-top-left z-10 peer-focus:start-0 peer-focus:text-violet-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0.5 after:content-['*'] after:ml-0.5 after:text-red-500 duration-300">End date</label>
                            {state.errors?.endDate && state.errors.endDate.map((error: string) => (
                                <p className="text-xs text-red-700 mt-2" key={error}>{error}</p>
                            ))}
                        </div>
                    </div>
                    <button type="submit" className="w-full text-violet-50 text-sm font-bold bg-gray-950 py-4 px-2 rounded-md hover:bg-violet-800 transition-colors duration-300">Update</button>
                    {state.message && (
                        <div className="flex flex-col">
                            <p className="text-xs text-red-700">{state.message}</p>
                            {state.errors?.questions?.generalError && state.errors.questions.generalError.map((error: string) => (
                                <p className="text-xs text-red-700 mt-2" key={error}>{error}</p>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="flex flex-col gap-y-4 py-8 lg:px-8 lg:py-0">
                <div className="flex gap-x-2 items-center text-gray-950">
                    <AdjustmentsHorizontalIcon className="w-5"/>
                    <h2 className="font-semibold">Contents</h2>
                </div>
                <div className="w-full flex flex-col gap-y-4 rounded-md p-6 shadow-md">
                    <div className="flex gap-x-4 text-gray-950">
                        <ChatBubbleBottomCenterTextIcon className="w-5"/>
                        <p className="text-sm font-semibold">Quiz's introduction</p>
                    </div>
                    <p className="text-xs text-gray-500">This will be the very first sentence to be spoken during your live quiz. Type in something to summarize your game in the below box.</p>
                    <div className="relative mt-2 flex flex-col">
                        <textarea id="quiz_introduction" maxLength={500} rows={8} value={scriptQuizIntroduction} className="resize-none block w-full p-2 text-sm text-gray-950 bg-transparent rounded-md border-1 border-gray-500 focus:outline-none focus:ring-0 focus:border-violet-800 transition-colors duration-300 peer" placeholder=" " required onChange={(e) => setScriptQuizIntroduction(e.target.value)}/>
                        <label htmlFor="quiz_introduction" className="absolute bg-white px-2 rounded-full text-sm text-gray-500 transform -translate-y-6 scale-75 top-4 left-0.5 origin-top-left z-10 peer-focus:start-0 peer-focus:text-violet-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0.5 after:content-['*'] after:ml-0.5 after:text-red-500 duration-300">Quiz's introduction</label>
                        {state.errors?.scriptQuizIntroduction && state.errors.scriptQuizIntroduction.map((error: string) => (
                            <p className="text-xs text-red-700 mt-2" key={error}>{error}</p>
                        ))}
                    </div>
                    <p className="text-xs text-gray-500">Alternatively, you can write a prompt and click on the below button to let our AI generate the introduction for you.</p>
                    <div className="relative mt-2 flex flex-col">
                        <textarea id="quiz_introduction_prompt" maxLength={200} rows={4} value={quizIntroductionPrompt} className="resize-none block w-full p-2 text-sm text-gray-950 bg-transparent rounded-md border-1 border-gray-500 focus:outline-none focus:ring-0 focus:border-violet-800 transition-colors duration-300 peer" placeholder=" " onChange={(e) => handleIntroductionPromptChange(e.target.value)}/>
                        <label htmlFor="quiz_introduction_prompt" className="absolute bg-white px-2 rounded-full text-sm text-gray-500 transform -translate-y-6 scale-75 top-4 left-0.5 origin-top-left z-10 peer-focus:start-0 peer-focus:text-violet-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0.5 duration-300">Prompt</label>
                    </div>
                    {canIntroductionGenerate && !isIntroductionGenerating ? (
                        <button type="button" className="w-full text-violet-50 text-sm font-bold bg-gray-950 py-4 px-2 rounded-md hover:bg-violet-800 transition-colors duration-300" onClick={() => handleGenerateIntroduction()}>
                            Generate introduction
                        </button>
                    ) : isIntroductionGenerating ? (
                        <div className="cursor-not-allowed w-full flex items-center justify-center gap-x-4 text-violet-50 text-sm font-bold bg-gray-500 py-4 px-2 rounded-md">
                            <span className="relative flex h-4 w-4">
                                <span className="animate-ping absolute w-full h-full rounded-full bg-violet-50 opacity-75"/>
                                <span className="relative inline-flex rounded-full w-4 h-4 bg-violet-50 opacity-75"/>
                            </span>
                            <span>Generating...</span>
                        </div>
                    ) : (
                        <div className="cursor-not-allowed w-full flex items-center justify-center text-violet-50 text-sm font-bold bg-gray-500 py-4 px-2 rounded-md">
                            Generate introduction
                        </div>
                    )}
                </div>
                {questions.map((question, index) => (
                    <div key={index} className="w-full flex flex-col gap-y-4 rounded-md p-6 shadow-md">
                        <div className="flex justify-between text-gray-950">
                            <p className="text-sm font-semibold">Question #{index + 1}</p>
                            <button type="button" className="hover:text-red-700 transition-colors duration-300" onClick={() => handleRemoveQuestion(index)}>
                                <TrashIcon className="w-5"/>
                            </button>
                        </div>
                        <div className="relative mt-2 flex flex-col">
                            <input type="text" id={`question_${index}`} value={question.question}  className="block w-full py-2 px-0.5 text-sm text-gray-950 bg-transparent border-1 border-l-0 border-r-0 border-t-0 border-gray-500 focus:outline-none focus:ring-0 focus:border-violet-800 transition-colors duration-300 peer" placeholder=" " required onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}/>
                            <label htmlFor={`question_${index}`} className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-4 left-0.5 origin-top-left z-10 peer-focus:start-0 peer-focus:text-violet-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0.5 after:content-['*'] after:ml-0.5 after:text-red-500 duration-300">Question</label>
                            {state.errors?.questions?.questionErrors?.[index]?.question && state.errors.questions.questionErrors[index].question.map((error: string) => (
                                <p className="text-xs text-red-700 mt-2" key={error}>{error}</p>
                            ))}
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-2">
                            <div className="relative flex flex-col">
                                <input type="text" id={`answer_a_${index}`} value={question.answerA} className="block w-full py-2 px-0.5 text-sm text-gray-950 bg-transparent border-1 border-l-0 border-r-0 border-t-0 border-gray-500 focus:outline-none focus:ring-0 focus:border-violet-800 transition-colors duration-300 peer" placeholder=" " required onChange={(e) => handleQuestionChange(index, 'answerA', e.target.value)}/>
                                <label htmlFor={`answer_a_${index}`} className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-4 left-0.5 origin-top-left z-10 peer-focus:start-0 peer-focus:text-violet-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0.5 after:content-['*'] after:ml-0.5 after:text-red-500 duration-300">Answer A</label>
                                {state.errors?.questions?.questionErrors?.[index]?.answerA && state.errors.questions.questionErrors[index].answerA.map((error: string) => (
                                    <p className="text-xs text-red-700 mt-2" key={error}>{error}</p>
                                ))}
                            </div>
                            <div className="relative flex flex-col">
                                <input type="text" id={`answer_b_${index}`} value={question.answerB} className="block w-full py-2 px-0.5 text-sm text-gray-950 bg-transparent border-1 border-l-0 border-r-0 border-t-0 border-gray-500 focus:outline-none focus:ring-0 focus:border-violet-800 transition-colors duration-300 peer" placeholder=" " required onChange={(e) => handleQuestionChange(index, 'answerB', e.target.value)}/>
                                <label htmlFor={`answer_b_${index}`} className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-4 left-0.5 origin-top-left z-10 peer-focus:start-0 peer-focus:text-violet-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0.5 after:content-['*'] after:ml-0.5 after:text-red-500 duration-300">Answer B</label>
                                {state.errors?.questions?.questionErrors?.[index]?.answerB && state.errors.questions.questionErrors[index].answerB.map((error: string) => (
                                    <p className="text-xs text-red-700 mt-2" key={error}>{error}</p>
                                ))}
                            </div>
                            <div className="relative flex flex-col">
                                <input type="text" id={`answer_c_${index}`} value={question.answerC} className="block w-full py-2 px-0.5 text-sm text-gray-950 bg-transparent border-1 border-l-0 border-r-0 border-t-0 border-gray-500 focus:outline-none focus:ring-0 focus:border-violet-800 transition-colors duration-300 peer" placeholder=" " required onChange={(e) => handleQuestionChange(index, 'answerC', e.target.value)}/>
                                <label htmlFor={`answer_c_${index}`} className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-4 left-0.5 origin-top-left z-10 peer-focus:start-0 peer-focus:text-violet-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0.5 after:content-['*'] after:ml-0.5 after:text-red-500 duration-300">Answer C</label>
                                {state.errors?.questions?.questionErrors?.[index]?.answerC && state.errors.questions.questionErrors[index].answerC.map((error: string) => (
                                    <p className="text-xs text-red-700 mt-2" key={error}>{error}</p>
                                ))}
                            </div>
                            <div className="relative">
                                <input type="text" id={`answer_d_${index}`} value={question.answerD} className="block w-full py-2 px-0.5 text-sm text-gray-950 bg-transparent border-1 border-l-0 border-r-0 border-t-0 border-gray-500 focus:outline-none focus:ring-0 focus:border-violet-800 transition-colors duration-300 peer" placeholder=" " required onChange={(e) => handleQuestionChange(index, 'answerD', e.target.value)}/>
                                <label htmlFor={`answer_d_${index}`} className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-4 left-0.5 origin-top-left z-10 peer-focus:start-0 peer-focus:text-violet-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0.5 after:content-['*'] after:ml-0.5 after:text-red-500 duration-300">Answer D</label>
                                {state.errors?.questions?.questionErrors?.[index]?.answerD && state.errors.questions.questionErrors[index].answerD.map((error: string) => (
                                    <p className="text-xs text-red-700 mt-2" key={error}>{error}</p>
                                ))}
                            </div>
                        </div>
                        <div className="relative mt-2 flex flex-col">
                            <select id={`correct_answer_${index}`} value={question.correctAnswer} className="block w-full py-2 px-0.5 text-sm text-gray-950 bg-transparent border-1 border-l-0 border-r-0 border-t-0 border-gray-500 focus:outline-none focus:ring-0 focus:border-violet-800 transition-colors duration-300 peer" required onChange={(e) => handleQuestionChange(index, 'correctAnswer', e.target.value)}>
                                <option value="0">A</option>
                                <option value="1">B</option>
                                <option value="2">C</option>
                                <option value="3">D</option>
                            </select>
                            <label htmlFor={`correct_answer_${index}`} className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-4 left-0.5 origin-top-left z-10 peer-focus:text-violet-800 after:content-['*'] after:ml-0.5 after:text-red-500 duration-300">Correct answer</label>
                            {state.errors?.questions?.questionErrors?.[index]?.correctAnswer && state.errors.questions.questionErrors[index].correctAnswer.map((error: string) => (
                                <p className="text-xs text-red-700 mt-2" key={error}>{error}</p>
                            ))}
                        </div>

                        <p className="text-xs text-gray-500">You can let our AI generate the below fields by clicking on this button, or type them on your own.</p>
                        {canGenerate[index] && !isGenerating[index] ? (
                            <button type="button" className="w-full text-violet-50 text-sm font-bold bg-gray-950 py-4 px-2 rounded-md hover:bg-violet-800 transition-colors duration-300" onClick={() => handleGenerateComments(index)}>
                                Generate comments
                            </button>
                        ) : isGenerating[index] ? (
                            <div className="cursor-not-allowed w-full flex items-center justify-center gap-x-4 text-violet-50 text-sm font-bold bg-gray-500 py-4 px-2 rounded-md">
                                <span className="relative flex h-4 w-4">
                                    <span className="animate-ping absolute w-full h-full rounded-full bg-violet-50 opacity-75"/>
                                    <span className="relative inline-flex rounded-full w-4 h-4 bg-violet-50 opacity-75"/>
                                </span>
                                <span>Generating...</span>
                            </div>
                        ) : (
                            <div className="cursor-not-allowed w-full flex items-center justify-center text-violet-50 text-sm font-bold bg-gray-500 py-4 px-2 rounded-md">
                                Generate comments
                            </div>
                        )}
                        <div className="relative mt-2 flex flex-col">
                            <textarea id={`question_comment_${index}`} maxLength={500} rows={8} value={question.scriptPostQuestion} className="resize-none block w-full p-2 text-sm text-gray-950 bg-transparent rounded-md border-1 border-gray-500 focus:outline-none focus:ring-0 focus:border-violet-800 transition-colors duration-300 peer" placeholder=" " required onChange={(e) => handleQuestionChange(index, 'scriptPostQuestion', e.target.value)}/>
                            <label htmlFor={`question_comment_${index}`} className="absolute bg-white px-2 rounded-full text-sm text-gray-500 transform -translate-y-6 scale-75 top-4 left-0.5 origin-top-left z-10 peer-focus:start-0 peer-focus:text-violet-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0.5 after:content-['*'] after:ml-0.5 after:text-red-500 duration-300">Post-question comment</label>
                            {state.errors?.questions?.questionErrors?.[index]?.scriptPostQuestion && state.errors.questions.questionErrors[index].scriptPostQuestion.map((error: string) => (
                                <p className="text-xs text-red-700 mt-2" key={error}>{error}</p>
                            ))}
                        </div>
                        <div className="relative mt-2">
                            <textarea id={`answer_comment_${index}`} maxLength={500} rows={8} value={question.scriptAnswer} className="resize-none block w-full p-2 text-sm text-gray-950 bg-transparent rounded-md border-1 border-gray-500 focus:outline-none focus:ring-0 focus:border-violet-800 transition-colors duration-300 peer" placeholder=" " required onChange={(e) => handleQuestionChange(index, 'scriptAnswer', e.target.value)}/>
                            <label htmlFor={`answer_comment_${index}`} className="absolute bg-white px-2 rounded-full text-sm text-gray-500 transform -translate-y-6 scale-75 top-4 left-0.5 origin-top-left z-10 peer-focus:start-0 peer-focus:text-violet-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0.5 after:content-['*'] after:ml-0.5 after:text-red-500 duration-300">Answer comment</label>
                            {state.errors?.questions?.questionErrors?.[index]?.scriptAnswer && state.errors.questions.questionErrors[index].scriptAnswer.map((error: string) => (
                                <p className="text-xs text-red-700 mt-2" key={error}>{error}</p>
                            ))}
                        </div>
                    </div>
                ))}
                
                {questions.length <= 10 && (
                    <button type="button" className="relative flex w-full h-40 rounded-md flex-col gap-y-4 items-center justify-center border-2 border-dashed text-violet-500 border-violet-500 hover:border-violet-800 hover:text-violet-800 transition-colors duration-300" onClick={handleAddQuestion}>
                        <PlusCircleIcon className="w-16"/>
                        <p className="text-sm font-semibold">Add a new question</p>
                    </button>
                )}
            </div>
        </form>
    )
}