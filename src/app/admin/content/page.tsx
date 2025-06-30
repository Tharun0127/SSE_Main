'use client';

import { AdminStatsCards } from "@/components/admin-stats-cards";
import { HeroImageUploader } from "@/components/hero-image-uploader";
import { LogoUploader } from "@/components/logo-uploader";

export default function ContentManagementPage() {
    return (
        <div className="flex flex-col gap-4 md:gap-8">
            <AdminStatsCards />
            <div className="grid gap-8 md:grid-cols-2">
                <LogoUploader />
                <HeroImageUploader />
            </div>
        </div>
    )
}
