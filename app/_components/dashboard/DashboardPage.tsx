"use client";

import { useState, useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
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
  const { ready, authenticated, user, logout } = usePrivy();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<DashboardTab>('works');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (ready && !authenticated) {
      router.push("/app");
    }
  }, [ready, authenticated, router]);

  const handleTabChange = (tab: DashboardTab) => {
    setActiveTab(tab);
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/app");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const formatAddress = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
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

  // Show loading while checking authentication
  if (!ready) {
    return (
      <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--color-nusa-blue)]"></div>
          <p className="text-sm text-[var(--color-slate-gray)]">Memuat dashboard...</p>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated (will redirect)
  if (!authenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[var(--color-ivory-white)]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold text-[var(--color-deep-navy)]">
                Dashboard Kreator
              </h1>
              <p className="text-[var(--color-slate-gray)] mt-1">
                Kelola karya digital, lisensi, dan transaksi Anda
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push("/app/register")}
                className="px-6 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-[var(--color-nusa-blue)] via-[var(--color-deep-navy)] to-[var(--color-nusa-blue)] bg-[length:200%_200%] bg-[position:100%_100%] hover:bg-[position:0%_0%] transition-all duration-500 flex items-center gap-2 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Daftarkan Karya</span>
              </button>
              <NotificationCenter 
                notifications={notifications}
                onNotificationsChange={setNotifications}
              />
              {/* Profile Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-[var(--color-nusa-blue)] to-[var(--color-deep-navy)] hover:opacity-90 transition-opacity cursor-pointer border-2 border-white shadow-md"
                  aria-label="Profile menu"
                >
                  {user?.wallet?.address ? (
                    <span className="text-white text-xs font-semibold">
                      {user.wallet.address.slice(0, 2).toUpperCase()}
                    </span>
                  ) : (
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  )}
                </button>
                
                {showProfileMenu && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setShowProfileMenu(false)}
                    />
                    <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-lg z-20">
                      <div className="p-4 border-b border-gray-200">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-[var(--color-nusa-blue)] to-[var(--color-deep-navy)]">
                            {user?.wallet?.address ? (
                              <span className="text-white text-xs font-semibold">
                                {user.wallet.address.slice(0, 2).toUpperCase()}
                              </span>
                            ) : (
                              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-[var(--color-deep-navy)] truncate">
                              {user?.wallet?.address ? formatAddress(user.wallet.address) : 'User'}
                            </p>
                            {user?.email?.address && (
                              <p className="text-xs text-[var(--color-slate-gray)] truncate">
                                {user.email.address}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="p-2">
                        <button
                          onClick={handleLogout}
                          className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          Keluar
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
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
