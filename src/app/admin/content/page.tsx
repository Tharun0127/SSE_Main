'use client';

import { AdminStatsCards } from "@/components/admin-stats-cards";
import { SiteImageManager } from "@/components/site-image-manager";
import { SiteContactManager } from "@/components/site-contact-manager";

export default function ContentManagementPage() {
    return (
        <div className="flex flex-col gap-4 md:gap-8">
            <AdminStatsCards />
            <SiteContactManager />
            <SiteImageManager />
        </div>
    )
}
