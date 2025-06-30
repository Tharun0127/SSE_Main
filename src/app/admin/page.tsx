'use client';

import { AdminStatistics } from '@/components/admin-statistics';
import { AdminStatsCards } from '@/components/admin-stats-cards';

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <AdminStatsCards />
      <AdminStatistics />
    </div>
  );
}
