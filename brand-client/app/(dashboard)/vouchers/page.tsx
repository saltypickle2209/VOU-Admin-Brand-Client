import VouchersTable from "@/app/ui/components/all_vouchers";
import SearchVoucher from "@/app/ui/components/search_voucher";
import Link from "next/link";
import React from "react";

export default function page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  return (
    <div className="flex flex-col gap-5">
      <SearchVoucher placeholder="Search by name..." />
      <VouchersTable query={query} currentPage={currentPage} />
      <Link
        className="flex items-center justify-center h-[50px] text-center text-white bg-gray-950 hover:bg-violet-800 transition-colors duration-300 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-2.5 focus:outline-none "
        href="/vouchers/create">
        <button type="button">Add new voucher</button>
      </Link>
    </div>
  );
}
