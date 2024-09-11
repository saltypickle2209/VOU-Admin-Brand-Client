import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Pagination from "./pagination";
import { baseURL } from "@/app/lib/definition";

const testURL = "http://localhost:3020";

const sampleData = [
  {
    id: "voucher 1",
    name: "Voucher Gold",
    image: "voucher_ticket.jpg",
    description:
      "Exclusive voucher for gold members, providing 20% off on all products.",
    value: 50,
  },
  {
    id: "voucher 2",
    name: "Voucher Silver",
    image: "voucher_ticket.jpg",
    description:
      "Silver level voucher offering a 15% discount on electronics and accessories.",
    value: 30,
  },
  {
    id: "voucher 3",
    name: "Voucher Bronze",
    image: "voucher_ticket.jpg",
    description:
      "This bronze voucher grants a 10% discount on fashion items and home goods.",
    value: 20,
  },
  {
    id: "voucher 4",
    name: "Voucher Platinum",
    image: "voucher_ticket.jpg",
    description:
      "Top-tier voucher providing up to 40% off on premium products and exclusive deals.",
    value: 100,
  },
  {
    id: "voucher 5",
    name: "Voucher Student Special",
    image: "voucher_ticket.jpg",
    description:
      "Special voucher for students offering a 25% discount on books and educational materials.",
    value: 25,
  },
  {
    id: "voucher 6",
    name: "Voucher New Year",
    image: "voucher_ticket.jpg",
    description:
      "Celebrate the New Year with a 30% discount on select items across the store.",
    value: 45,
  },
  {
    id: "voucher 7",
    name: "Voucher Holiday Season",
    image: "voucher_ticket.jpg",
    description:
      "Enjoy the holiday season with this voucher, providing a 20% discount on all categories.",
    value: 40,
  },
  {
    id: "voucher 8",
    name: "Voucher Anniversary",
    image: "voucher_ticket.jpg",
    description:
      "A special anniversary voucher offering a 35% discount on your next purchase.",
    value: 60,
  },
  {
    id: "voucher 9",
    name: "Voucher Black Friday",
    image: "voucher_ticket.jpg",
    description:
      "Black Friday special: 50% off on electronics, fashion, and accessories.",
    value: 75,
  },
  {
    id: "voucher 10",
    name: "Voucher Summer Sale",
    image: "voucher_ticket.jpg",
    description:
      "Get ready for summer with a 20% discount on all outdoor and sports gear.",
    value: 35,
  },
];

export default async function VouchersTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  let data: any = null;
  try {
    // const response = await fetch(
    //   `${baseURL}/voucher/voucherTemplate/search?page=${currentPage}&search=${query}`
    // );
    const response = await fetch(
      `${testURL}/voucherTemplate/search?page=${currentPage}&search=${query}`
    );
    console.log(query);
    console.log(currentPage);
    if (!response.ok) {
      throw new Error("Fetch khong dc :)");
    }
    data = await response.json();
    console.log(data);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Cannot fetch: " + error.message);
    } else {
      throw new Error("Unknown error");
    }
  }
  const totalPages = data.totalPages;
  return (
    <div className="flex flex-col w-full space-y-4 p-6 bg-white rounded-md shadow-md">
      <div className="flex justify-between items-center">
        <p className="text-xl text-gray-950 font-extrabold">All vouchers</p>
        <Link
          href="/events"
          className="flex items-center shrink-0 space-x-2 font-bold text-violet-500 hover:text-violet-800 transition-colors duration-300">
          <p>View all</p>
          <ChevronRightIcon className="w-5" />
        </Link>
      </div>
      <div className="relative overflow-x-auto rounded-md shadow-md">
        <table className="w-full text-sm text-left text-gray-500 bg-violet-50 table-auto divide-y divide-gray-300 ">
          <thead className="text-gray-950">
            <tr className="divide-x divide-gray-300">
              <th scope="row" className="px-6 py-3">
                Voucher name
              </th>
              <th scope="row" className="px-6 py-3 text-center">
                Image
              </th>
              <th scope="row" className="px-6 py-3 text-center">
                Description
              </th>
              <th scope="row" className="px-6 py-3 text-right">
                Value
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300 divide-dashed">
            {data.data.map((item: any) => {
              return (
                <tr
                  key={item.id}
                  className="odd:bg-white even:bg-violet-50 divide-x divide-gray-300 divide-dashed">
                  <th scope="row" className="px-6 py-3 text-gray-700">
                    {item.name}
                  </th>
                  <td className="px-6 py-4 text-center">
                    <Image
                      src={`/${item.image}`}
                      alt={item.name}
                      width={150}
                      height={150}
                    />
                  </td>
                  <td className="text-center">{item.description}</td>
                  <td className="px-6 py-4 text-right">{item.value}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Pagination totalPages={totalPages} />
    </div>
  );
}
