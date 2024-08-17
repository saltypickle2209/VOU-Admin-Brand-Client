import Link from "next/link"
import {
    ChevronRightIcon
} from '@heroicons/react/24/solid';
import Image from "next/image";

const data = [
    {
        id: "voucher 1",
        name: "voucher 1",
        image: "vou_large_icon.png",
        description: "description for voucher",
        value: 10
    },
    {
        id: "voucher 2",
        name: "voucher 2",
        image: "vou_large_icon.png",
        description: "description for voucher",
        value: 10
    },
    {
        id: "voucher 3",
        name: "voucher 3",
        image: "vou_large_icon.png",
        description: "description for voucher",
        value: 10
    },
]


export default function AllVouchers() {
    return (
        <div className="flex flex-col w-full space-y-4 p-6 bg-white rounded-md shadow-md">
            <div className="flex justify-between items-center">
                <p className="text-xl text-gray-950 font-extrabold">All vouchers</p>
                <Link href="/events" className="flex items-center shrink-0 space-x-2 font-bold text-violet-500 hover:text-violet-800 transition-colors duration-300">
                    <p>View all</p>
                    <ChevronRightIcon className="w-5"/>
                </Link>  
            </div>
            <div className="relative overflow-x-auto rounded-md shadow-md">
                <table className="w-full text-sm text-left text-gray-500 bg-violet-50 table-auto divide-y divide-gray-300 ">
                    <thead className="text-gray-950">
                        <tr className="divide-x divide-gray-300">
                            <th scope="row" className="px-6 py-3">Voucher name</th>
                            <th scope="row" className="px-6 py-3 text-center">Image</th>
                            <th scope="row" className="px-6 py-3 text-center">Description</th>
                            <th scope="row"  className="px-6 py-3 text-right">Value</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-300 divide-dashed">
                        {data.map((item) => {
                            return (
                                <tr key={item.id} className="odd:bg-white even:bg-violet-50 divide-x divide-gray-300 divide-dashed">
                                    <th scope="row" className="px-6 py-3 text-gray-700">
                                        {item.name}
                                    </th>
                                    <td className="px-6 py-4 text-center">
                                        <Image 
                                        src={`/${item.image}`}
                                        alt={item.name}
                                        width={200}
                                        height={200}/>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {item.description}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {item.value}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}