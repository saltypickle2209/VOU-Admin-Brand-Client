'use client'

import {
    AdjustmentsHorizontalIcon,
    ArrowRightIcon,
    ChatBubbleBottomCenterTextIcon,
    RectangleStackIcon
} from '@heroicons/react/24/outline';
import BasicInformation from './basic_information';
import { useState } from 'react';
import clsx from 'clsx';

// remember to add prop to this one
export default function ItemCollectingDetail({ data, gameData }: { data: any, gameData: any }){
    const [isConfiguringItems, setIsConfiguringItems] = useState<boolean>(true)
    const itemIds = gameData.items.map((item: any) => (item._id))

    return (
        <div className="w-full px-6 grid grid-cols-1 divide-y-2 divide-gray-300 lg:py-6 lg:px-0 lg:divide-y-0 lg:divide-x-2 lg:grid-cols-2 bg-white rounded-md shadow-md">
            <BasicInformation data={data}/>
            {isConfiguringItems ? (
                <div className="flex flex-col gap-y-4 py-8 lg:px-8 lg:py-0">
                    <div className="flex justify-between items-center">
                        <div className="flex gap-x-2 items-center text-gray-950">
                            <AdjustmentsHorizontalIcon className="w-5"/>
                            <h2 className="font-semibold">Configurations</h2>
                        </div>
                        <button type="button" className="flex gap-x-2 items-center text-violet-500 hover:text-violet-800 transition-colors duration-300" onClick={(e) => setIsConfiguringItems(false)}>
                            <h2 className="font-bold">Item Sets</h2>
                            <ArrowRightIcon className="w-5"/>
                        </button>
                    </div>

                    {gameData.items.map((item: any, index: any) => (
                        <div key={item._id} className="w-full flex flex-col gap-y-4 rounded-md p-6 shadow-md">
                            <p className="text-sm font-semibold">{`Item #${index + 1}`}</p>
                            <div className="overflow-hidden flex w-48 aspect-square rounded-md self-center">
                                <img src={item.img} alt="Image Preview" className="w-full h-full object-cover"/>
                            </div>
                            <div className="flex flex-col gap-y-2">
                                <p className="font-semibold text-gray-950">{item.name}</p>
                                <p className="text-xs text-gray-500">{item.description}</p>
                            </div>
                        </div>
                    ))}
                
                    <button type="button" className="w-full flex gap-x-2 items-center justify-center text-violet-50 text-sm font-bold bg-gray-950 py-4 px-2 rounded-md hover:bg-violet-800 transition-colors duration-300" onClick={(e) => setIsConfiguringItems(false)}>
                        <span>Item Sets</span>
                        <ArrowRightIcon className="w-5"/>
                    </button>
                </div>
            ): (
                <div className="flex flex-col gap-y-4 py-8 lg:px-8 lg:py-0">
                    <div className="flex justify-between items-center">
                        <div className="flex gap-x-2 items-center text-gray-950">
                            <RectangleStackIcon className="w-5"/>
                            <h2 className="font-semibold">Item Sets</h2>
                        </div>
                        <button type="button" className="flex gap-x-2 items-center text-violet-500 hover:text-violet-800 transition-colors duration-300" onClick={(e) => setIsConfiguringItems(true)}>
                            <h2 className="font-bold">Configurations</h2>
                            <ArrowRightIcon className="w-5"/>
                        </button>
                    </div>

                    {gameData.itemSets.map((set: any, index: any) => (
                        <div key={set._id} className="w-full flex flex-col gap-y-4 rounded-md p-6 shadow-md">
                            <p className="text-sm font-semibold">{`Item Set #${index + 1}`}</p>
                            <p className="text-xs text-gray-500">Collect the following highlighted items to trade for this reward.</p>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                                <div className={clsx(
                                    "w-full p-4 flex justify-center items-center rounded-md",
                                    {
                                        "bg-violet-300": !set.items.includes(itemIds[0]),
                                        "bg-violet-800": set.items.includes(itemIds[0]),
                                    }
                                )}>
                                    <span className="text-xs font-semibold text-violet-50">Item #1</span>
                                </div>
                                <div className={clsx(
                                    "w-full p-4 flex justify-center items-center rounded-md",
                                    {
                                        "bg-violet-300": !set.items.includes(itemIds[1]),
                                        "bg-violet-800": set.items.includes(itemIds[1]),
                                    }
                                )}>
                                    <span className="text-xs font-semibold text-violet-50">Item #2</span>
                                </div>
                                <div className={clsx(
                                    "w-full p-4 flex justify-center items-center rounded-md",
                                    {
                                        "bg-violet-300": !set.items.includes(itemIds[2]),
                                        "bg-violet-800": set.items.includes(itemIds[2]),
                                    }
                                )}>
                                    <span className="text-xs font-semibold text-violet-50">Item #3</span>
                                </div>
                                <div className={clsx(
                                    "w-full p-4 flex justify-center items-center rounded-md",
                                    {
                                        "bg-violet-300": !set.items.includes(itemIds[3]),
                                        "bg-violet-800": set.items.includes(itemIds[3]),
                                    }
                                )}>
                                    <span className="text-xs font-semibold text-violet-50">Item #4</span>
                                </div>
                                <div className={clsx(
                                    "w-full p-4 flex justify-center items-center rounded-md",
                                    {
                                        "bg-violet-300": !set.items.includes(itemIds[4]),
                                        "bg-violet-800": set.items.includes(itemIds[4]),
                                    }
                                )}>
                                    <span className="text-xs font-semibold text-violet-50">Item #5</span>
                                </div>
                                <div className={clsx(
                                    "w-full p-4 flex justify-center items-center rounded-md",
                                    {
                                        "bg-violet-300": !set.items.includes(itemIds[5]),
                                        "bg-violet-800": set.items.includes(itemIds[5]),
                                    }
                                )}>
                                    <span className="text-xs font-semibold text-violet-50">Item #6</span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-y-2">
                                <p className="font-semibold text-gray-950">{set.name}</p>
                                <p className="text-xs text-gray-500">{set.description}</p>
                            </div>
                        </div>
                    ))}

                    <button type="button" className="w-full flex gap-x-2 items-center justify-center text-violet-50 text-sm font-bold bg-gray-950 py-4 px-2 rounded-md hover:bg-violet-800 transition-colors duration-300" onClick={(e) => setIsConfiguringItems(true)}>
                        <span>Items</span>
                        <ArrowRightIcon className="w-5"/>
                    </button>
                </div>
            )}
        </div>
    )
}