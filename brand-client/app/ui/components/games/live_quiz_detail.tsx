import {
    AdjustmentsHorizontalIcon,
    ChatBubbleBottomCenterTextIcon
} from '@heroicons/react/24/outline';
import BasicInformation from './basic_information';
import clsx from 'clsx';

// remember to add prop to this one
export default function LiveQuizDetail({ data, gameData, voucherData }: { data: any, gameData: any, voucherData: any }){
    return (
        <div className="w-full px-6 grid grid-cols-1 divide-y-2 divide-gray-300 lg:py-6 lg:px-0 lg:divide-y-0 lg:divide-x-2 lg:grid-cols-2 bg-white rounded-md shadow-md">
            <BasicInformation data={data} voucherData={voucherData}/>
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
                    <p className="text-gray-500 text-xs">{gameData.scriptIntro.text}</p>
                </div>
                {gameData.quizzes.map((quiz: any) => (
                    <div key={quiz._id} className="w-full flex flex-col gap-y-4 rounded-md p-6 shadow-md">
                        <p className="text-sm font-semibold text-gray-950">Question #1</p>
                        <p className="font-semibold text-gray-950">{quiz.question}</p>
                        <div className="grid grid-cols-2 gap-2">
                            <div className={clsx(
                                "py-2 px-4  text-sm text-violet-50 rounded-md font-semibold", 
                                {
                                    "bg-green-500": quiz.options[0] === quiz.correctAnswer,
                                    "bg-red-500": quiz.options[0] !== quiz.correctAnswer
                                }
                            )}>
                            {`A. ${quiz.options[0]}`}
                            </div>
                            <div className={clsx(
                                "py-2 px-4  text-sm text-violet-50 rounded-md font-semibold", 
                                {
                                    "bg-green-500": quiz.options[1] === quiz.correctAnswer,
                                    "bg-red-500": quiz.options[1] !== quiz.correctAnswer
                                }
                            )}>
                            {`B. ${quiz.options[1]}`}
                            </div>
                            <div className={clsx(
                                "py-2 px-4  text-sm text-violet-50 rounded-md font-semibold", 
                                {
                                    "bg-green-500": quiz.options[2] === quiz.correctAnswer,
                                    "bg-red-500": quiz.options[2] !== quiz.correctAnswer
                                }
                            )}>
                            {`C. ${quiz.options[3]}`}
                            </div>
                            <div className={clsx(
                                "py-2 px-4  text-sm text-violet-50 rounded-md font-semibold", 
                                {
                                    "bg-green-500": quiz.options[3] === quiz.correctAnswer,
                                    "bg-red-500": quiz.options[3] !== quiz.correctAnswer
                                }
                            )}>
                            {`D. ${quiz.options[3]}`}
                            </div>
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <p className="text-sm font-semibold text-gray-950">Post-question comment</p>
                            <p className="text-gray-500 text-xs">{quiz.scriptQuestion.text}</p>
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <p className="text-sm font-semibold text-gray-950">Answer comment</p>
                            <p className="text-gray-500 text-xs">{quiz.scriptAnswer.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}