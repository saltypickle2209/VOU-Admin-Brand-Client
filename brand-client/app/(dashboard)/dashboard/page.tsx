import { Metadata } from "next";
import {
    ArrowPathIcon
} from '@heroicons/react/24/solid';
import { revalidateDashboard } from "@/app/lib/action";
import Statistics from "@/app/ui/components/dashboard/statistics";
import PlayerChart from "@/app/ui/components/dashboard/player_chart";
import TopEvents from "@/app/ui/components/dashboard/top_events";
import VoucherChart from "@/app/ui/components/dashboard/voucher_chart";
import { Suspense } from "react";
import StatisticsSkeleton from "@/app/ui/components/dashboard/statistics_skeleton";
import ChartSkeleton from "@/app/ui/components/dashboard/chart_skeleton";
import TopEventsSkeleton from "@/app/ui/components/dashboard/top_events_skeleton";

export const metadata: Metadata = {
    title: 'Dashboard',
};

export default function Page() {
    return (
        <main className="flex flex-col gap-y-4">
            <h1 className="text-3xl font-bold text-gray-950">👋 Hello there!</h1>
            <div className="flex flex-row justify-end items-center md:justify-between">
                <p className="text-sm text-gray-500 hidden md:block">Your data will be automatically refreshed every 1 hour</p>
                <form action={revalidateDashboard}>
                    <button className="flex items-center justify-center gap-2 rounded-md px-4 py-2 bg-gray-950 text-violet-50 text-sm font-bold hover:bg-violet-800 transition-colors duration-300">
                        <ArrowPathIcon className="w-6 md:w-5"/>
                        <p className="hidden md:block">Refresh</p>
                    </button>
                </form>
            </div>
            <Suspense fallback={<StatisticsSkeleton/>}>
                <Statistics/>
            </Suspense>
            <div className="flex flex-col gap-4 xl:flex-row">
                <Suspense fallback={<ChartSkeleton widthClass="w-1/2" chartHeight="h-[250px]"/>}>
                    <PlayerChart/>
                </Suspense>
                <Suspense fallback={<ChartSkeleton widthClass="w-1/2" chartHeight="h-[250px]"/>}>
                    <VoucherChart/> 
                </Suspense>
            </div>
            <Suspense fallback={<TopEventsSkeleton/>}>
                <TopEvents/>
            </Suspense>
        </main>
    )
}