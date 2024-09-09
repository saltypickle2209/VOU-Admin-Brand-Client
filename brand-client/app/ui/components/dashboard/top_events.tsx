import Link from "next/link"
import {
    ChevronRightIcon
} from '@heroicons/react/24/solid';

const data = [
    {
        name: "Chơi game nhận ngay voucher 50k",
        vouchers: 1000,
        published: 252,
        total: 12600000
    },
    {
        name: "Săn ngay voucher trị giá 100k cùng Pickle Meo Meo",
        vouchers: 200,
        published: 12,
        total: 1200000
    },
    {
        name: "Meo meo meo meo meo meo meo meo meo meo meo meo meo meo meo meo meo meo meo meo meo meo",
        vouchers: 10000,
        published: 1200,
        total: 96000000
    }
]

export default async function TopEvents() {
    function delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    await delay(5000);

    // fetch data

    return (
        <div className="flex flex-col w-full gap-y-4 p-6 bg-white rounded-md shadow-md">
            <div className="flex justify-between items-center">
                <p className="text-xl text-gray-950 font-bold">Top events</p>
                <Link href="/events" className="flex items-center shrink-0 gap-x-2 font-bold text-violet-500 hover:text-violet-800 transition-colors duration-300">
                    <p>View all</p>
                    <ChevronRightIcon className="w-5"/>
                </Link>
            </div>
            <div className="relative overflow-x-auto rounded-md shadow-md">
                <table className="w-full text-sm text-left text-gray-500 bg-violet-50 table-auto divide-y divide-gray-300 ">
                    <thead className="text-gray-950">
                        <tr className="divide-x divide-gray-300">
                            <th scope="row" className="px-6 py-3">Event name</th>
                            <th scope="row" className="px-6 py-3 text-center">No. of vouchers</th>
                            <th scope="row" className="px-6 py-3 text-center">Published vouchers</th>
                            <th scope="row"  className="px-6 py-3 text-right">Money spent</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-300 divide-dashed">
                        {data.map((item) => {
                            return (
                                <tr key={item.name + item.total} className="odd:bg-white even:bg-violet-50 divide-x divide-gray-300 divide-dashed">
                                    <th scope="row" className="px-6 py-3 text-gray-700">
                                        {item.name}
                                    </th>
                                    <td className="px-6 py-4 text-center">
                                        {item.vouchers}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {item.published}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {`${item.total}đ`}
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