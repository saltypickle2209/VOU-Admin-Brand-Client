'use client'

import {
    PhotoIcon,
    InformationCircleIcon,
    AdjustmentsHorizontalIcon,
    ArrowPathRoundedSquareIcon,
    ArrowRightIcon,
    RectangleStackIcon,
    PlusCircleIcon,
    TrashIcon,
    BookmarkIcon
} from '@heroicons/react/24/outline';
import { ChangeEvent, FormEvent, useState } from 'react';
import clsx from 'clsx';
import { useFormState } from 'react-dom';
import { CollectableItem, ItemCollecting, ItemSet } from '@/app/lib/definition';
import { ItemCollectingFormState, updateItemCollecting } from '@/app/lib/action';

// remember to add voucher list props
export default function ItemCollectingEditForm({
    data
}: {
    data: ItemCollecting
}) {
    const initialState: ItemCollectingFormState = { message: null, errors: {} }
    const [state, formAction] = useFormState(updateItemCollecting, initialState)

    const [poster, setPoster] = useState<File | string | null>(data.poster)
    const [quizName, setQuizName] = useState<string>(data.name)
    const [quizDescription, setQuizDescription] = useState<string>(data.description)
    const [voucher, setVoucher] = useState<string>(data.voucher)
    const [voucherAmount, setVoucherAmount] = useState<number>(Number(data.amount))
    const [startDate, setStartDate] = useState<string>(data.startDate)
    const [endDate, setEndDate] = useState<string>(data.endDate)

    const [collectableItems, setCollectableItems] = useState<CollectableItem[]>(data.items)

    const [isConfiguringItems, setIsConfiguringItems] = useState<boolean>(true)

    const [itemSets, setItemSets] = useState<ItemSet[]>(data.itemSets)

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        if(event.target.files && event.target.files[0]){
            setPoster(event.target.files[0])
        }
    }

    const handleItemChange = (index: number, field: keyof CollectableItem, value: string) => {
        const updatedCollectableItems = [...collectableItems]
        updatedCollectableItems[index] = { ...updatedCollectableItems[index], [field]: value }

        setCollectableItems(updatedCollectableItems)
    }

    const handleItemImageChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
        if(event.target.files && event.target.files[0]){
            const updatedCollectableItems = [...collectableItems]
            updatedCollectableItems[index] = { ...updatedCollectableItems[index], image: event.target.files[0] }

            setCollectableItems(updatedCollectableItems)
        }
    }

    const handleItemSetChange = (index: number, field: keyof ItemSet, value: string) => {
        const updatedItemSets = [...itemSets]

        if(field === 'items'){
            const arrIdx = updatedItemSets[index]['items'].indexOf(value)

            if(arrIdx === -1){
                updatedItemSets[index]['items'] = [...updatedItemSets[index]['items'], value]
            } 
            else {
                updatedItemSets[index]['items'] = updatedItemSets[index]['items'].filter((_, i) => i !== arrIdx)
            }
        }
        else {
            updatedItemSets[index] = { ...updatedItemSets[index], [field]: value }
        }

        setItemSets(updatedItemSets)
    }

    const handleAddItemSet = () => {
        setItemSets([
            ...itemSets,
            {
                name: '',
                description: '',
                items: []
            }
        ])
    }

    const handleRemoveItemSet = (index: number) => {
        setItemSets(itemSets.filter((_, i) => i !== index))
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
        if(collectableItems[0].image) formData.append('item_image_1', collectableItems[0].image)
        if(collectableItems[1].image) formData.append('item_image_2', collectableItems[1].image)
        if(collectableItems[2].image) formData.append('item_image_3', collectableItems[2].image)
        if(collectableItems[3].image) formData.append('item_image_4', collectableItems[3].image)
        if(collectableItems[4].image) formData.append('item_image_5', collectableItems[4].image)  
        if(collectableItems[5].image) formData.append('item_image_6', collectableItems[5].image)  
        formData.append('items', JSON.stringify(collectableItems))
        formData.append('itemSets', JSON.stringify(itemSets))

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
                    <button type="submit" className="w-full text-violet-50 text-sm font-bold bg-gray-950 py-4 px-2 rounded-md hover:bg-violet-800 transition-colors duration-300">Submit</button>
                    {state.message && (
                        <div className="flex flex-col">
                            <p className="text-xs text-red-700">{state.message}</p>
                            {state.errors?.items?.generalError && state.errors.items.generalError.map((error: string) => (
                                <p className="text-xs text-red-700 mt-2" key={error}>{error}</p>
                            ))}
                            {state.errors?.itemSets?.generalError && state.errors.itemSets.generalError.map((error: string) => (
                                <p className="text-xs text-red-700 mt-2" key={error}>{error}</p>
                            ))}
                        </div>
                    )}
                </div>
            </div>
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
                    {collectableItems.map((item, index) => (
                        <div key={index} className="w-full flex flex-col gap-y-4 rounded-md p-6 shadow-md">
                            <p className="text-sm font-semibold">Item #{index + 1}</p>
                            <div className="shrink-0 flex flex-col self-center">
                                <label htmlFor={`item_image_${index}`} className={ clsx(
                                    "overflow-hidden flex cursor-pointer w-48 aspect-square rounded-md",
                                    {
                                        "relative flex-col gap-y-4 items-center justify-center border-2 border-dashed text-violet-500 border-violet-500 hover:border-violet-800 hover:text-violet-800 transition-colors duration-300": !item.image
                                    }
                                )}>
                                    {item.image ? (
                                        typeof item.image === 'string' ? (
                                            item.image !== '' ? (
                                                <img src={item.image} alt="Image Preview" className="w-full h-full object-cover"/>
                                            ) : (
                                                <>
                                                    <div className="absolute inset-2 border-2 border-violet-500 rounded-md hover:border-violet-800 transition-colors duration-300"></div>
                                                    <PhotoIcon className="w-8"/>
                                                    <p className="text-xs font-semibold">Choose your item's image</p>
                                                </>
                                            )
                                        ) : (
                                            <img src={URL.createObjectURL(item.image)} alt="Image Preview" className="w-full h-full object-cover"/>
                                        )        
                                    ) : (
                                        <>
                                            <div className="absolute inset-2 border-2 border-violet-500 rounded-md hover:border-violet-800 transition-colors duration-300"></div>
                                            <PhotoIcon className="w-8"/>
                                            <p className="text-xs font-semibold">Choose your item's image</p>
                                        </>
                                    )}
                                    <input id={`item_image_${index}`} type="file" className="hidden" accept="image/png, image/jpeg" onChange={(e) => handleItemImageChange(e, index)}/>
                                </label>
                                {state.errors?.items?.itemImageErrors?.[index] && state.errors?.items?.itemImageErrors?.[index].map((error: string) => (
                                    <p className="text-xs text-red-700 mt-2" key={error}>{error}</p>
                                ))}
                            </div>
                            <div className="relative mt-2 flex flex-col">
                                <input type="text" id={`item_name_${index}`} value={item.name} className="block w-full py-2 px-0.5 text-sm text-gray-950 bg-transparent border-1 border-l-0 border-r-0 border-t-0 border-gray-500 focus:outline-none focus:ring-0 focus:border-violet-800 transition-colors duration-300 peer" placeholder=" " required onChange={(e) => handleItemChange(index, 'name', e.target.value)}/>
                                <label htmlFor={`item_name_${index}`} className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-4 left-0.5 origin-top-left z-10 peer-focus:start-0 peer-focus:text-violet-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0.5 after:content-['*'] after:ml-0.5 after:text-red-500 duration-300">Name</label>
                                {state.errors?.items?.itemErrors?.[index]?.name && state.errors.items.itemErrors[index].name.map((error: string) => (
                                    <p className="text-xs text-red-700 mt-2" key={error}>{error}</p>
                                ))}
                            </div>
                            <div className="relative mt-2 flex flex-col">
                                <textarea id={`item_description_${index}`} maxLength={200} rows={5} value={item.description} className="resize-none block w-full p-2 text-sm text-gray-950 bg-transparent rounded-md border-1 border-gray-500 focus:outline-none focus:ring-0 focus:border-violet-800 transition-colors duration-300 peer" placeholder=" " required onChange={(e) => handleItemChange(index, 'description', e.target.value)}/>
                                <label htmlFor={`item_description_${index}`} className="absolute bg-white px-2 rounded-full text-sm text-gray-500 transform -translate-y-6 scale-75 top-4 left-0.5 origin-top-left z-10 peer-focus:start-0 peer-focus:text-violet-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0.5 after:content-['*'] after:ml-0.5 after:text-red-500 duration-300">Description</label>
                                {state.errors?.items?.itemErrors?.[index]?.description && state.errors.items.itemErrors[index].description.map((error: string) => (
                                    <p className="text-xs text-red-700 mt-2" key={error}>{error}</p>
                                ))}
                            </div>
                            <p className="text-xs text-gray-500">Ratio, when combined with others, will be used to calculate the probability from which this item will be generated.</p>
                            <div className="relative mt-2 flex flex-col">
                                <input type="number" id={`item_ratio_${index}`} value={item.ratio} className="block w-full py-2 px-0.5 text-sm text-gray-950 bg-transparent border-1 border-l-0 border-r-0 border-t-0 border-gray-500 focus:outline-none focus:ring-0 focus:border-violet-800 transition-colors duration-300 peer" placeholder=" " required onChange={(e) => handleItemChange(index, 'ratio', e.target.value)}/>
                                <label htmlFor={`item_ratio_${index}`} className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-4 left-0.5 origin-top-left z-10 peer-focus:start-0 peer-focus:text-violet-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0.5 after:content-['*'] after:ml-0.5 after:text-red-500 duration-300">Ratio</label>
                                {state.errors?.items?.itemErrors?.[index]?.ratio && state.errors.items.itemErrors[index].ratio.map((error: string) => (
                                    <p className="text-xs text-red-700 mt-2" key={error}>{error}</p>
                                ))}
                            </div>
                        </div>
                    ))}
                    <button type="button" className="w-full flex gap-x-2 items-center justify-center text-violet-50 text-sm font-bold bg-gray-950 py-4 px-2 rounded-md hover:bg-violet-800 transition-colors duration-300" onClick={(e) => setIsConfiguringItems(false)}>
                        <span>Configure Item Sets</span>
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

                    <div className="w-full flex flex-col gap-y-4 rounded-md p-6 shadow-md">
                        <div className="flex gap-x-4 text-gray-950">
                            <BookmarkIcon className="w-5"/>
                            <p className="text-sm font-semibold">Quiz's introduction</p>
                        </div>
                        <p className="text-xs text-gray-500">Item set is a set of items that is used as a requirement for redeeming a prize. When a user collects every item stated in an item set, they can trade them for the prize you rewarded. Thus, it should be great if you can create multiple item sets which can cover all of the items you have created.</p>
                    </div>

                    {itemSets.map((itemSet, index) => (
                        <div key={index} className="w-full flex flex-col gap-y-4 rounded-md p-6 shadow-md">
                            <div className="flex justify-between text-gray-950">
                                <p className="text-sm font-semibold">Item Set #{index + 1}</p>
                                <button type="button" className="hover:text-red-700 transition-colors duration-300" onClick={() => handleRemoveItemSet(index)}>
                                    <TrashIcon className="w-5"/>
                                </button>
                            </div>
                            <p className="text-xs text-gray-500">Select at least one item from the below list for this item set.</p>
                            <div className="flex flex-col">
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                                    <label htmlFor={`item_1_${index}`} className={clsx(
                                        "w-full p-4 flex justify-center items-center rounded-md cursor-pointer transition-colors duration-300",
                                        {
                                            "bg-violet-300 hover:bg-violet-500": !itemSet.items.includes('0'),
                                            "bg-violet-800": itemSet.items.includes('0')
                                        }
                                    )}>
                                        <span className="text-xs font-semibold text-violet-50">Item #1</span>
                                        <input type="checkbox" id={`item_1_${index}`} className="hidden" checked={itemSet.items.includes('0')} onChange={(e) => handleItemSetChange(index, 'items', '0')}/>
                                    </label>
                                    <label htmlFor={`item_2_${index}`} className={clsx(
                                        "w-full p-4 flex justify-center items-center rounded-md cursor-pointer transition-colors duration-300",
                                        {
                                            "bg-violet-300 hover:bg-violet-500": !itemSet.items.includes('1'),
                                            "bg-violet-800": itemSet.items.includes('1')
                                        }
                                    )}>
                                        <span className="text-xs font-semibold text-violet-50">Item #2</span>
                                        <input type="checkbox" id={`item_2_${index}`} className="hidden" checked={itemSet.items.includes('1')} onChange={(e) => handleItemSetChange(index, 'items', '1')}/>
                                    </label>
                                    <label htmlFor={`item_3_${index}`} className={clsx(
                                        "w-full p-4 flex justify-center items-center rounded-md cursor-pointer transition-colors duration-300",
                                        {
                                            "bg-violet-300 hover:bg-violet-500": !itemSet.items.includes('2'),
                                            "bg-violet-800": itemSet.items.includes('2')
                                        }
                                    )}>
                                        <span className="text-xs font-semibold text-violet-50">Item #3</span>
                                        <input type="checkbox" id={`item_3_${index}`} className="hidden" checked={itemSet.items.includes('2')} onChange={(e) => handleItemSetChange(index, 'items', '2')}/>
                                    </label>
                                    <label htmlFor={`item_4_${index}`} className={clsx(
                                        "w-full p-4 flex justify-center items-center rounded-md cursor-pointer transition-colors duration-300",
                                        {
                                            "bg-violet-300 hover:bg-violet-500": !itemSet.items.includes('3'),
                                            "bg-violet-800": itemSet.items.includes('3')
                                        }
                                    )}>
                                        <span className="text-xs font-semibold text-violet-50">Item #4</span>
                                        <input type="checkbox" id={`item_4_${index}`} className="hidden" checked={itemSet.items.includes('3')} onChange={(e) => handleItemSetChange(index, 'items', '3')}/>
                                    </label>
                                    <label htmlFor={`item_5_${index}`} className={clsx(
                                        "w-full p-4 flex justify-center items-center rounded-md cursor-pointer transition-colors duration-300",
                                        {
                                            "bg-violet-300 hover:bg-violet-500": !itemSet.items.includes('4'),
                                            "bg-violet-800": itemSet.items.includes('4')
                                        }
                                    )}>
                                        <span className="text-xs font-semibold text-violet-50">Item #5</span>
                                        <input type="checkbox" id={`item_5_${index}`} className="hidden" checked={itemSet.items.includes('4')} onChange={(e) => handleItemSetChange(index, 'items', '4')}/>
                                    </label>
                                    <label htmlFor={`item_6_${index}`} className={clsx(
                                        "w-full p-4 flex justify-center items-center rounded-md cursor-pointer transition-colors duration-300",
                                        {
                                            "bg-violet-300 hover:bg-violet-500": !itemSet.items.includes('5'),
                                            "bg-violet-800": itemSet.items.includes('5')
                                        }
                                    )}>
                                        <span className="text-xs font-semibold text-violet-50">Item #6</span>
                                        <input type="checkbox" id={`item_6_${index}`} className="hidden" checked={itemSet.items.includes('5')} onChange={(e) => handleItemSetChange(index, 'items', '5')}/>
                                    </label>
                                </div>
                                {state.errors?.itemSets?.itemSetErrors?.[index]?.items && state.errors.itemSets.itemSetErrors[index].items.map((error: string) => (
                                    <p className="text-xs text-red-700 mt-2" key={error}>{error}</p>
                                ))}
                            </div>
                            <p className="text-xs text-gray-500">Provide some information for this item set.</p>
                            <div className="relative mt-2 flex flex-col">
                                <input type="text" id={`itemset_name_${index}`} value={itemSet.name} className="block w-full py-2 px-0.5 text-sm text-gray-950 bg-transparent border-1 border-l-0 border-r-0 border-t-0 border-gray-500 focus:outline-none focus:ring-0 focus:border-violet-800 transition-colors duration-300 peer" placeholder=" " required onChange={(e) => handleItemSetChange(index, 'name', e.target.value)}/>
                                <label htmlFor={`itemset_name_${index}`} className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-4 left-0.5 origin-top-left z-10 peer-focus:start-0 peer-focus:text-violet-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0.5 after:content-['*'] after:ml-0.5 after:text-red-500 duration-300">Name</label>
                                {state.errors?.itemSets?.itemSetErrors?.[index]?.name && state.errors.itemSets.itemSetErrors[index].name.map((error: string) => (
                                    <p className="text-xs text-red-700 mt-2" key={error}>{error}</p>
                                ))}
                            </div>
                            <div className="relative mt-2 flex flex-col">
                                <textarea id={`itemset_description_${index}`} maxLength={200} rows={5} value={itemSet.description} className="resize-none block w-full p-2 text-sm text-gray-950 bg-transparent rounded-md border-1 border-gray-500 focus:outline-none focus:ring-0 focus:border-violet-800 transition-colors duration-300 peer" placeholder=" " required onChange={(e) => handleItemSetChange(index, 'description', e.target.value)}/>
                                <label htmlFor={`itemset_description_${index}`} className="absolute bg-white px-2 rounded-full text-sm text-gray-500 transform -translate-y-6 scale-75 top-4 left-0.5 origin-top-left z-10 peer-focus:start-0 peer-focus:text-violet-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0.5 after:content-['*'] after:ml-0.5 after:text-red-500 duration-300">Description</label>
                                {state.errors?.itemSets?.itemSetErrors?.[index]?.description && state.errors.itemSets.itemSetErrors[index].description.map((error: string) => (
                                    <p className="text-xs text-red-700 mt-2" key={error}>{error}</p>
                                ))}
                            </div>
                        </div>
                    ))}

                    {itemSets.length <= 10 && 
                        <button type="button" className="relative flex w-full h-40 rounded-md flex-col gap-y-4 items-center justify-center border-2 border-dashed text-violet-500 border-violet-500 hover:border-violet-800 hover:text-violet-800 transition-colors duration-300" onClick={handleAddItemSet}>
                            <PlusCircleIcon className="w-16"/>
                            <p className="text-sm font-semibold">Add a new item set</p>
                        </button>
                    }

                    <button type="button" className="w-full flex gap-x-2 items-center justify-center text-violet-50 text-sm font-bold bg-gray-950 py-4 px-2 rounded-md hover:bg-violet-800 transition-colors duration-300" onClick={(e) => setIsConfiguringItems(true)}>
                        <span>Configure Items</span>
                        <ArrowRightIcon className="w-5"/>
                    </button>
                </div>
            )}
        </form>
    )
}