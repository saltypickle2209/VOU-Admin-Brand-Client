import { Metadata } from "next";
import {
    ArrowPathIcon
} from '@heroicons/react/24/solid';
import { revalidateDashboard } from "@/app/lib/action";
import BrandStatistics from "@/app/ui/components/dashboard/brand_statistics";
import EventChart from "@/app/ui/components/dashboard/event_chart";
import UserStatistics from "@/app/ui/components/dashboard/user_statistics";
import UserChart from "@/app/ui/components/dashboard/user_chart";
import GameStatistics from "@/app/ui/components/dashboard/game_statistics";
import GameChart from "@/app/ui/components/dashboard/game_chart";
import VoucherChart from "@/app/ui/components/dashboard/voucher_chart";
import { Suspense } from "react";
import StatisticsSkeleton from "@/app/ui/components/dashboard/statistics_skeleton";
import SingleStatisticsSkeleton from "@/app/ui/components/dashboard/single_statistics_skeleton";
import ChartSkeleton from "@/app/ui/components/dashboard/chart_skeleton";

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
                <BrandStatistics/>
            </Suspense>
            <Suspense fallback={<ChartSkeleton widthClass="w-full" chartHeight="h-[250px]"/>}>
                <EventChart/>
            </Suspense>
            <div className="flex flex-col gap-y-4 mt-4">
                <Suspense fallback={<SingleStatisticsSkeleton/>}>
                    <UserStatistics/>
                </Suspense>
                <Suspense fallback={<ChartSkeleton widthClass="w-full" chartHeight="h-[250px]"/>}>
                    <UserChart/>
                </Suspense>
            </div>

            <div className="flex flex-col gap-y-4 mt-4">
                <Suspense fallback={<StatisticsSkeleton/>}>
                    <GameStatistics/>
                </Suspense>
                <div className="flex flex-col gap-4 xl:flex-row">
                    <Suspense fallback={<ChartSkeleton widthClass="w-full" chartHeight="h-[150px]"/>}>
                        <GameChart/>
                    </Suspense>
                    <Suspense fallback={<ChartSkeleton widthClass="w-full" chartHeight="h-[150px]"/>}>
                        <VoucherChart/>
                    </Suspense>
                </div>
            </div>
        </main>
    )
}