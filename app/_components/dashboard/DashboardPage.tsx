"use client";

import { useState } from "react";
import { DashboardTabs } from "../../_components/dashboard/DashboardTabs";
import { MyWorks } from "../../_components/dashboard/MyWorks";
import { MyLicenses } from "../../_components/dashboard/MyLicenses";
import { Transactions } from "../../_components/dashboard/Transactions";
import { NotificationCenter } from "../../_components/dashboard/NotificationCenter";

// Define the Notification type to avoid conflict with browser's Notification API
interface Notification {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
  actionLabel?: string;
}

export type DashboardTab = 'works' | 'licenses' | 'transactions' | 'analytics';

/**
 * Dashboard Kreator - Personal Management Control Panel
 * 
 * Purpose: Private studio for creators to manage their digital assets
 * Access: Authenticated creators only (SIWE authentication required)
 * Focus: Personal management of works, licenses, transactions, and analytics
 * Analogy: "Studio pribadi" - private workspace for creators
 * 
 * Features:
 * - My Works: View all registered NFT certificates
 * - My Licenses: Manage active licenses and track earnings
 * - Transactions: Monitor minting, sales, and royalty payments
 * - Analytics: Performance insights and revenue tracking
 */
export function DashboardPage() {
  const [activeTab, setActiveTab] = useState<DashboardTab>('works');
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const handleTabChange = (tab: DashboardTab) => {
    setActiveTab(tab);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'works':
        return <MyWorks />;
      case 'licenses':
        return <MyLicenses />;
      case 'transactions':
        return <Transactions />;
      case 'analytics':
        return (
          <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
            <div className="text-[var(--color-slate-gray)]">
              <svg className="mx-auto h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <h3 className="text-lg font-medium text-[var(--color-deep-navy)] mb-2">
                Analitik Kreator
              </h3>
              <p className="text-sm">
                Fitur analitik akan segera hadir untuk memberikan insight mendalam tentang penggunaan karya dan pendapatan Anda.
              </p>
            </div>
          </div>
        );
      default:
        return <MyWorks />;
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-ivory-white)]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[var(--color-deep-navy)]">
                Dashboard Kreator
              </h1>
              <p className="text-[var(--color-slate-gray)] mt-1">
                Kelola karya digital, lisensi, dan transaksi Anda
              </p>
            </div>
            <NotificationCenter 
              notifications={notifications}
              onNotificationsChange={setNotifications}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <DashboardTabs 
          activeTab={activeTab} 
          onTabChange={handleTabChange} 
        />
        
        <div className="mt-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}
