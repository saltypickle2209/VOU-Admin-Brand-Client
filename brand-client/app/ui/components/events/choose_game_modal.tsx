import { Game } from '@/app/lib/definition';
import {
    XMarkIcon,
} from '@heroicons/react/24/outline';
import ChooseGameModalContent from './choose_game_modal_content';

export default function ChooseGameModal({
    selectedGames,
    onClose,
    onAddGames
}: {
    selectedGames: Game[],
    onClose: () => void,
    onAddGames: (games: Game[]) => void
}) {
    return (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 z-50 flex justify-center items-center">
            <div className="absolute inset-0 -z-10" onClick={onClose}></div>
            <div className="w-11/12 h-4/5 rounded-md shadow-md bg-violet-50 md:w-3/5">
                <div className="flex flex-col gap-y-4 h-full w-full p-6">
                    <div className="flex justify-between items-center">
                        <p className="text-gray-950 text-xl font-semibold">Select games to add</p>
                        <button onClick={onClose}>
                            <XMarkIcon className="w-5 md:w-6"/>
                        </button>   
                    </div>
                    <div className="grow flex flex-col gap-y-2 justify-center items-center overflow-y-auto overflow-x-hidden">
                        <ChooseGameModalContent selectedGames={selectedGames} onClose={onClose} onAddGames={onAddGames}/>
                    </div>    
                </div>
            </div>
        </div>
    )
}