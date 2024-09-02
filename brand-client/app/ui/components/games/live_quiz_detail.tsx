import {
    AdjustmentsHorizontalIcon,
    ChatBubbleBottomCenterTextIcon
} from '@heroicons/react/24/outline';
import BasicInformation from './basic_information';

// remember to add prop to this one
export default function LiveQuizDetail({ gameId }: { gameId: string }){
    return (
        <div className="w-full px-6 grid grid-cols-1 divide-y-2 divide-gray-300 lg:py-6 lg:px-0 lg:divide-y-0 lg:divide-x-2 lg:grid-cols-2 bg-white rounded-md shadow-md">
            <BasicInformation gameId={gameId}/>
            <div className="flex flex-col gap-y-4 py-8 lg:px-8 lg:py-0">
                <div className="flex gap-x-2 text-gray-950">
                    <AdjustmentsHorizontalIcon className="w-5"/>
                    <h2 className="font-semibold">Contents</h2>
                </div>
                <div className="w-full flex flex-col gap-y-4 rounded-md p-6 shadow-md">
                    <div className="flex gap-x-4 text-gray-950">
                        <ChatBubbleBottomCenterTextIcon className="w-5"/>
                        <p className="text-sm font-semibold">Quiz's introduction</p>
                    </div>
                    <p className="text-gray-500 text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, soluta?</p>
                </div>
                <div className="w-full flex flex-col gap-y-4 rounded-md p-6 shadow-md">
                    <p className="text-sm font-semibold text-gray-950">Question #1</p>
                    <p className="font-semibold text-gray-950">What is the capital of France?</p>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="py-2 px-4 bg-green-500 text-sm text-violet-50 rounded-md font-semibold">A. Paris</div>
                        <div className="py-2 px-4 bg-red-500 text-sm text-violet-50 rounded-md font-semibold">B. Pickleland</div>
                        <div className="py-2 px-4 bg-red-500 text-sm text-violet-50 rounded-md font-semibold">C. You</div>
                        <div className="py-2 px-4 bg-red-500 text-sm text-violet-50 rounded-md font-semibold">D. Nah</div>
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <p className="text-sm font-semibold text-gray-950">Post-question comment</p>
                        <p className="text-gray-500 text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, soluta?</p>
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <p className="text-sm font-semibold text-gray-950">Answer comment</p>
                        <p className="text-gray-500 text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, soluta?</p>
                    </div>
                </div>
                <div className="w-full flex flex-col gap-y-4 rounded-md p-6 shadow-md">
                    <p className="text-sm font-semibold text-gray-950">Question #2</p>
                    <p className="font-semibold text-gray-950">What is the capital of France?</p>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="py-2 px-4 bg-red-500 text-sm text-violet-50 rounded-md font-semibold">A. Paris</div>
                        <div className="py-2 px-4 bg-green-500 text-sm text-violet-50 rounded-md font-semibold">B. Pickleland</div>
                        <div className="py-2 px-4 bg-red-500 text-sm text-violet-50 rounded-md font-semibold">C. You</div>
                        <div className="py-2 px-4 bg-red-500 text-sm text-violet-50 rounded-md font-semibold">D. Nah</div>
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <p className="text-sm font-semibold text-gray-950">Post-question comment</p>
                        <p className="text-gray-500 text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, soluta?</p>
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <p className="text-sm font-semibold text-gray-950">Answer comment</p>
                        <p className="text-gray-500 text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, soluta?</p>
                    </div>
                </div>
                <div className="w-full flex flex-col gap-y-4 rounded-md p-6 shadow-md">
                    <p className="text-sm font-semibold text-gray-950">Question #3</p>
                    <p className="font-semibold text-gray-950">What is the capital of France?</p>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="py-2 px-4 bg-red-500 text-sm text-violet-50 rounded-md font-semibold">A. Paris</div>
                        <div className="py-2 px-4 bg-red-500 text-sm text-violet-50 rounded-md font-semibold">B. Pickleland</div>
                        <div className="py-2 px-4 bg-green-500 text-sm text-violet-50 rounded-md font-semibold">C. You</div>
                        <div className="py-2 px-4 bg-red-500 text-sm text-violet-50 rounded-md font-semibold">D. Nah</div>
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <p className="text-sm font-semibold text-gray-950">Post-question comment</p>
                        <p className="text-gray-500 text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, soluta?</p>
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <p className="text-sm font-semibold text-gray-950">Answer comment</p>
                        <p className="text-gray-500 text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, soluta?</p>
                    </div>
                </div>
            </div>
        </div>
    )
}