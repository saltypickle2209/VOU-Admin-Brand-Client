'use client'

import {
    PhotoIcon,
    InformationCircleIcon,
    AdjustmentsHorizontalIcon,
    ArrowPathRoundedSquareIcon
} from '@heroicons/react/24/outline';
import { ChangeEvent, FormEvent, useState } from 'react';
import clsx from 'clsx';
import { useFormState } from 'react-dom';
import { CollectableItem, ItemCollecting } from '@/app/lib/definition';
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

        formAction(formData)
    }

    return (
        <form onSubmit={handleSubmit} className="w-full px-6 grid grid-cols-1 divide-y-2 divide-gray-300 lg:py-6 lg:px-0 lg:divide-y-0 lg:divide-x-2 lg:grid-cols-2 bg-white rounded-md shadow-md">
            <div className="relative w-full h-full">
                <div className="sticky top-0 flex flex-col gap-y-4 py-8 lg:px-8 lg:py-0">
                    <div className="flex gap-x-2 text-gray-950">
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
                    <div className="flex flex-col">
                        {state.message && (
                            <p className="text-xs text-red-700">{state.message}</p>
                        )}
                        {state.errors?.items?.generalError && state.errors.items.generalError.map((error: string) => (
                            <p className="text-xs text-red-700 mt-2" key={error}>{error}</p>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-y-4 py-8 lg:px-8 lg:py-0">
                <div className="flex gap-x-2 text-gray-950">
                    <AdjustmentsHorizontalIcon className="w-5"/>
                    <h2 className="font-semibold">Configurations</h2>
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
            </div>
        </form>
    )
}