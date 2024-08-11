'use client'

import {
    PhotoIcon,
    InformationCircleIcon,
    AdjustmentsHorizontalIcon,
    PlusCircleIcon,
    TrashIcon
} from '@heroicons/react/24/outline';
import { ChangeEvent, FormEvent, useState } from 'react';
import clsx from 'clsx';
import { createGames } from '@/app/lib/action';

type Question = {
    question: string,
    answerA: string,
    answerB: string,
    answerC: string,
    answerD: string,
    correctAnswer: number,
    scriptPostQuestion: string,
    scriptAnswer: string
}

export default function LiveQuizForm() {
    const [poster, setPoster] = useState<File | null>(null)
    const [quizName, setQuizName] = useState<string>('')
    const [quizDescription, setQuizDescription] = useState<string>('')
    const [voucher, setVoucher] = useState<string>('')
    const [voucherAmount, setVoucherAmount] = useState<number | ''>('')
    const [startDate, setStartDate] = useState<string>('')
    const [endDate, setEndDate] = useState<string>('')
    const [questions, setQuestions] = useState<Question[]>([])

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        if(event.target.files && event.target.files[0]){
            setPoster(event.target.files[0])
        }
    }

    const handleQuestionChange = (index: number, field: keyof Question, value: string | number) => {
        const updatedQuestions = [...questions]
        updatedQuestions[index] = { ...updatedQuestions[index], [field]: value }
        setQuestions(updatedQuestions)
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
                correctAnswer: 0,
                scriptPostQuestion: '',
                scriptAnswer: ''
            }
        ])
    }

    const handleRemoveQuestion = (index: number) => {
        setQuestions(questions.filter((_, i) => i !== index))
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        // const formData = new FormData()
        // if (poster) formData.append('poster', poster)
        // createGames(formData)
        console.log(questions)
    }

    return (
        <form onSubmit={handleSubmit} className="w-full px-6 grid grid-cols-1 divide-y-2 divide-gray-300 lg:py-6 lg:px-0 lg:divide-y-0 lg:divide-x-2 lg:grid-cols-2 bg-white rounded-md shadow-md">
            <div className="relative w-full h-full">
                <div className="sticky top-0 flex flex-col gap-y-4 py-8 lg:px-8 lg:py-0">
                    <div className="flex gap-x-2 text-gray-950">
                        <InformationCircleIcon className="w-5"/>
                        <h2 className="font-semibold">Basic Information</h2>
                    </div>
                    <label htmlFor="poster" className={ clsx(
                        "overflow-hidden flex cursor-pointer w-full aspect-video rounded-md",
                        {
                            "relative flex-col gap-y-4 items-center justify-center border-2 border-dashed text-violet-500 border-violet-500 hover:border-violet-800 hover:text-violet-800 transition-colors duration-300": !poster
                        }
                    )}>
                        {poster ? (
                            <img src={URL.createObjectURL(poster)} alt="Image Preview" className="w-full h-full object-cover"/>
                        ) : (
                            <>
                                <div className="absolute inset-4 border-2 border-violet-500 rounded-md hover:border-violet-800 transition-colors duration-300"></div>
                                <PhotoIcon className="w-16"/>
                                <p className="text-sm font-semibold">Choose your game's poster</p>
                            </>
                        )}
                        <input id="poster" type="file" className="hidden" accept="image/png, image/jpeg" onChange={handleImageChange}/>
                    </label>
                    <div className="relative mt-2">
                        <input type="text" id="name" value={quizName} className="block w-full py-2 px-0.5 text-sm text-gray-950 bg-transparent border-1 border-l-0 border-r-0 border-t-0 border-gray-500 focus:outline-none focus:ring-0 focus:border-violet-800 transition-colors duration-300 peer" placeholder=" " required onChange={(e) => setQuizName(e.target.value)}/>
                        <label htmlFor="name" className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-4 left-0.5 origin-top-left z-10 peer-focus:start-0 peer-focus:text-violet-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0.5 after:content-['*'] after:ml-0.5 after:text-red-500 duration-300">Name</label>
                    </div>
                    <div className="relative mt-2">
                        <textarea id="description" value={quizDescription} maxLength={500} rows={8} className="resize-none block w-full p-2 text-sm text-gray-950 bg-transparent rounded-md border-1 border-gray-500 focus:outline-none focus:ring-0 focus:border-violet-800 transition-colors duration-300 peer" placeholder=" " required onChange={(e) => setQuizDescription(e.target.value)}/>
                        <label htmlFor="description" className="absolute bg-white px-2 rounded-full text-sm text-gray-500 transform -translate-y-6 scale-75 top-4 left-0.5 origin-top-left z-10 peer-focus:start-0 peer-focus:text-violet-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0.5 after:content-['*'] after:ml-0.5 after:text-red-500 duration-300">Description</label>
                    </div>
                    <div className="flex gap-x-4 mt-2">
                        <div className="relative w-3/5">
                            <select id="voucher" value={voucher} className="block w-full py-2 px-0.5 text-sm text-gray-950 bg-transparent border-1 border-l-0 border-r-0 border-t-0 border-gray-500 focus:outline-none focus:ring-0 focus:border-violet-800 transition-colors duration-300 peer" required onChange={(e) => setVoucher(e.target.value)}>
                                <option value="">Select a voucher</option>
                                <option value="1">Voucher A</option>
                            <option value="2">Voucher B</option>
                            </select>
                            <label htmlFor="voucher" className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-4 left-0.5 origin-top-left z-10 peer-focus:text-violet-800 after:content-['*'] after:ml-0.5 after:text-red-500 duration-300">Voucher</label>
                        </div>
                        <div className="relative grow">
                            <input type="number" id="amount" value={voucherAmount} className="block w-full py-2 px-0.5 text-sm text-gray-950 bg-transparent border-1 border-l-0 border-r-0 border-t-0 border-gray-500 focus:outline-none focus:ring-0 focus:border-violet-800 transition-colors duration-300 peer" placeholder=" " required onChange={(e) => setVoucherAmount(Number(e.target.value))}/>
                            <label htmlFor="amount" className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-4 left-0.5 origin-top-left z-10 peer-focus:start-0 peer-focus:text-violet-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0.5 after:content-['*'] after:ml-0.5 after:text-red-500 duration-300">Amount</label>
                        </div>
                    </div>
                    <div className="flex gap-x-4 mt-2">
                        <div className="relative w-1/2">
                            <input type="date" id="start_date" value={startDate} className="block w-full py-2 px-0.5 text-sm text-gray-950 bg-transparent border-1 border-l-0 border-r-0 border-t-0 border-gray-500 focus:outline-none focus:ring-0 focus:border-violet-800 transition-colors duration-300 peer" placeholder=" " required onChange={(e) => setStartDate(e.target.value)}/>
                            <label htmlFor="start_date" className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-4 left-0.5 origin-top-left z-10 peer-focus:start-0 peer-focus:text-violet-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0.5 after:content-['*'] after:ml-0.5 after:text-red-500 duration-300">Start date</label>
                        </div>
                        <div className="relative grow">
                            <input type="date" id="end_date" value={endDate} className="block w-full py-2 px-0.5 text-sm text-gray-950 bg-transparent border-1 border-l-0 border-r-0 border-t-0 border-gray-500 focus:outline-none focus:ring-0 focus:border-violet-800 transition-colors duration-300 peer" placeholder=" " required onChange={(e) => setEndDate(e.target.value)}/>
                            <label htmlFor="end_date" className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-4 left-0.5 origin-top-left z-10 peer-focus:start-0 peer-focus:text-violet-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0.5 after:content-['*'] after:ml-0.5 after:text-red-500 duration-300">End date</label>
                        </div>
                    </div>
                    <button type="submit" className="w-full text-violet-50 text-sm font-bold bg-gray-950 py-4 px-2 rounded-md hover:bg-violet-800 transition-colors duration-300">Submit</button>
                </div>
            </div>
            <div className="flex flex-col gap-y-4 py-8 lg:px-8 lg:py-0">
                <div className="flex gap-x-2 text-gray-950">
                    <AdjustmentsHorizontalIcon className="w-5"/>
                    <h2 className="font-semibold">Questions</h2>
                </div>
                {questions.map((question, index) => (
                    <div key={index} className="w-full flex flex-col gap-y-4 rounded-md p-6 shadow-md">
                        <div className="flex justify-between text-gray-950">
                            <p className="text-sm font-semibold">Question #{index + 1}</p>
                            <button className="hover:text-red-700 transition-colors duration-300" onClick={() => handleRemoveQuestion(index)}>
                                <TrashIcon className="w-5"/>
                            </button>
                        </div>
                        <div className="relative mt-2">
                            <input type="text" id={`question_${index}`} value={question.question}  className="block w-full py-2 px-0.5 text-sm text-gray-950 bg-transparent border-1 border-l-0 border-r-0 border-t-0 border-gray-500 focus:outline-none focus:ring-0 focus:border-violet-800 transition-colors duration-300 peer" placeholder=" " required onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}/>
                            <label htmlFor={`question_${index}`} className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-4 left-0.5 origin-top-left z-10 peer-focus:start-0 peer-focus:text-violet-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0.5 after:content-['*'] after:ml-0.5 after:text-red-500 duration-300">Question</label>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-2">
                            <div className="relative">
                                <input type="text" id={`answer_a_${index}`} value={question.answerA} className="block w-full py-2 px-0.5 text-sm text-gray-950 bg-transparent border-1 border-l-0 border-r-0 border-t-0 border-gray-500 focus:outline-none focus:ring-0 focus:border-violet-800 transition-colors duration-300 peer" placeholder=" " required onChange={(e) => handleQuestionChange(index, 'answerA', e.target.value)}/>
                                <label htmlFor={`answer_a_${index}`} className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-4 left-0.5 origin-top-left z-10 peer-focus:start-0 peer-focus:text-violet-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0.5 after:content-['*'] after:ml-0.5 after:text-red-500 duration-300">Answer A</label>
                            </div>
                            <div className="relative">
                                <input type="text" id={`answer_b_${index}`} value={question.answerB} className="block w-full py-2 px-0.5 text-sm text-gray-950 bg-transparent border-1 border-l-0 border-r-0 border-t-0 border-gray-500 focus:outline-none focus:ring-0 focus:border-violet-800 transition-colors duration-300 peer" placeholder=" " required onChange={(e) => handleQuestionChange(index, 'answerB', e.target.value)}/>
                                <label htmlFor={`answer_b_${index}`} className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-4 left-0.5 origin-top-left z-10 peer-focus:start-0 peer-focus:text-violet-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0.5 after:content-['*'] after:ml-0.5 after:text-red-500 duration-300">Answer B</label>
                            </div>
                            <div className="relative">
                                <input type="text" id={`answer_c_${index}`} value={question.answerC} className="block w-full py-2 px-0.5 text-sm text-gray-950 bg-transparent border-1 border-l-0 border-r-0 border-t-0 border-gray-500 focus:outline-none focus:ring-0 focus:border-violet-800 transition-colors duration-300 peer" placeholder=" " required onChange={(e) => handleQuestionChange(index, 'answerC', e.target.value)}/>
                                <label htmlFor={`answer_c_${index}`} className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-4 left-0.5 origin-top-left z-10 peer-focus:start-0 peer-focus:text-violet-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0.5 after:content-['*'] after:ml-0.5 after:text-red-500 duration-300">Answer C</label>
                            </div>
                            <div className="relative">
                                <input type="text" id={`answer_d_${index}`} value={question.answerD} className="block w-full py-2 px-0.5 text-sm text-gray-950 bg-transparent border-1 border-l-0 border-r-0 border-t-0 border-gray-500 focus:outline-none focus:ring-0 focus:border-violet-800 transition-colors duration-300 peer" placeholder=" " required onChange={(e) => handleQuestionChange(index, 'answerD', e.target.value)}/>
                                <label htmlFor={`answer_d_${index}`} className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-4 left-0.5 origin-top-left z-10 peer-focus:start-0 peer-focus:text-violet-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0.5 after:content-['*'] after:ml-0.5 after:text-red-500 duration-300">Answer D</label>
                            </div>
                        </div>
                        <div className="relative mt-2">
                            <select id={`correct_answer_${index}`} value={question.correctAnswer} className="block w-full py-2 px-0.5 text-sm text-gray-950 bg-transparent border-1 border-l-0 border-r-0 border-t-0 border-gray-500 focus:outline-none focus:ring-0 focus:border-violet-800 transition-colors duration-300 peer" required onChange={(e) => handleQuestionChange(index, 'correctAnswer', Number(e.target.value))}>
                                <option value={0}>A</option>
                                <option value={1}>B</option>
                                <option value={2}>C</option>
                                <option value={3}>D</option>
                            </select>
                            <label htmlFor={`correct_answer_${index}`} className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-4 left-0.5 origin-top-left z-10 peer-focus:text-violet-800 after:content-['*'] after:ml-0.5 after:text-red-500 duration-300">Correct answer</label>
                        </div>

                        <p className="text-xs text-gray-500">You can let our AI generate the below fields by clicking on this button, or type them on your own.</p>
                        <button type="button" className="w-full text-violet-50 text-sm font-bold bg-gray-950 py-4 px-2 rounded-md hover:bg-violet-800 transition-colors duration-300">
                            Generate comments
                        </button>
                        <div className="relative mt-2">
                            <textarea id={`question_comment_${index}`} maxLength={500} rows={8} className="resize-none block w-full p-2 text-sm text-gray-950 bg-transparent rounded-md border-1 border-gray-500 focus:outline-none focus:ring-0 focus:border-violet-800 transition-colors duration-300 peer" placeholder=" " required onChange={(e) => handleQuestionChange(index, 'scriptPostQuestion', e.target.value)}/>
                            <label htmlFor={`question_comment_${index}`} className="absolute bg-white px-2 rounded-full text-sm text-gray-500 transform -translate-y-6 scale-75 top-4 left-0.5 origin-top-left z-10 peer-focus:start-0 peer-focus:text-violet-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0.5 after:content-['*'] after:ml-0.5 after:text-red-500 duration-300">Post-question comment</label>
                        </div>
                        <div className="relative mt-2">
                            <textarea id={`answer_comment_${index}`} maxLength={500} rows={8} className="resize-none block w-full p-2 text-sm text-gray-950 bg-transparent rounded-md border-1 border-gray-500 focus:outline-none focus:ring-0 focus:border-violet-800 transition-colors duration-300 peer" placeholder=" " required onChange={(e) => handleQuestionChange(index, 'scriptAnswer', e.target.value)}/>
                            <label htmlFor={`answer_comment_${index}`} className="absolute bg-white px-2 rounded-full text-sm text-gray-500 transform -translate-y-6 scale-75 top-4 left-0.5 origin-top-left z-10 peer-focus:start-0 peer-focus:text-violet-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0.5 after:content-['*'] after:ml-0.5 after:text-red-500 duration-300">Answer comment</label>
                        </div>
                    </div>
                ))}
                
                <button type="button" className="relative flex w-full h-40 rounded-md flex-col gap-y-4 items-center justify-center border-2 border-dashed text-violet-500 border-violet-500 hover:border-violet-800 hover:text-violet-800 transition-colors duration-300" onClick={handleAddQuestion}>
                    <PlusCircleIcon className="w-16"/>
                    <p className="text-sm font-semibold">Add a new question</p>
                </button>
            </div>
        </form>
    )
}