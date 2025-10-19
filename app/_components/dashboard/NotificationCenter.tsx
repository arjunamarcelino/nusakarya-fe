"use client";

import { useState, useEffect } from "react";

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

interface NotificationCenterProps {
  notifications: Notification[];
  onNotificationsChange: (notifications: Notification[]) => void;
}

export function NotificationCenter({ notifications, onNotificationsChange }: NotificationCenterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Mock real-time notifications - replace with actual Ponder indexer event listener
  useEffect(() => {
    const mockNotifications: Notification[] = [
      {
        id: "1",
        type: "success",
        title: "Lisensi Terjual",
        message: "Lisensi untuk 'Digital Art Collection #1' telah berhasil dijual ke Creative Studio XYZ",
        timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
        isRead: false,
        actionUrl: "/dashboard?tab=licenses",
        actionLabel: "Lihat Lisensi"
      },
      {
        id: "2",
        type: "info",
        title: "Pembayaran Royalti",
        message: "Anda menerima pembayaran royalti sebesar 0.05 ETH dari penggunaan komersial karya Anda",
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
        isRead: false,
        actionUrl: "/dashboard?tab=transactions",
        actionLabel: "Lihat Transaksi"
      },
      {
        id: "3",
        type: "success",
        title: "NFT Certificate Dibuat",
        message: "Sertifikat NFT untuk 'Music Track - Sunset Dreams' berhasil dibuat dan terdaftar di blockchain",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
        isRead: true,
        actionUrl: "/dashboard?tab=works",
        actionLabel: "Lihat Karya"
      },
      {
        id: "4",
        type: "warning",
        title: "Lisensi Akan Kedaluwarsa",
        message: "Lisensi untuk 'Digital Art Collection #1' akan kedaluwarsa dalam 7 hari",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
        isRead: true,
        actionUrl: "/dashboard?tab=licenses",
        actionLabel: "Perpanjang Lisensi"
      }
    ];

    onNotificationsChange(mockNotifications);
  }, [onNotificationsChange]);

  useEffect(() => {
    const unread = notifications.filter(notification => !notification.isRead).length;
    setUnreadCount(unread);
  }, [notifications]);

  const getNotificationIcon = (type: Notification['type']) => {
    const icons = {
      success: (
        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      warning: (
        <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      ),
      error: (
        <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      info: (
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    };
    return icons[type];
  };

  const markAsRead = (notificationId: string) => {
    const updatedNotifications = notifications.map(notification =>
      notification.id === notificationId
        ? { ...notification, isRead: true }
        : notification
    );
    onNotificationsChange(updatedNotifications);
  };

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(notification =>
      ({ ...notification, isRead: true })
    );
    onNotificationsChange(updatedNotifications);
  };

  const formatTimestamp = (timestamp: string) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - notificationTime.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return 'Baru saja';
    if (diffInMinutes < 60) return `${diffInMinutes} menit yang lalu`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} jam yang lalu`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} hari yang lalu`;
  };

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-[var(--color-slate-gray)] hover:text-[var(--color-deep-navy)] transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-7a7 7 0 10-14 0v7h5l-5 5-5-5h5v-7a7 7 0 1114 0v7z" />
        </svg>
        
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Panel */}
          <div className="absolute right-0 top-12 w-96 bg-white border border-gray-200 rounded-xl shadow-lg z-20 max-h-96 overflow-hidden">
            {/* Header */}
            <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[var(--color-deep-navy)]">
                Notifikasi
              </h3>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Tandai semua dibaca
                </button>
              )}
            </div>

            {/* Notifications List */}
            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-6 text-center">
                  <svg className="mx-auto h-12 w-12 text-[var(--color-slate-gray)] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-5 5-5-5h5v-7a7 7 0 10-14 0v7h5l-5 5-5-5h5v-7a7 7 0 1114 0v7z" />
                  </svg>
                  <p className="text-[var(--color-slate-gray)]">Tidak ada notifikasi</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 hover:bg-gray-50 transition-colors ${
                        !notification.isRead ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="text-sm font-medium text-[var(--color-deep-navy)]">
                              {notification.title}
                            </h4>
                            {!notification.isRead && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                            )}
                          </div>
                          
                          <p className="text-sm text-[var(--color-slate-gray)] mb-2">
                            {notification.message}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-[var(--color-slate-gray)]">
                              {formatTimestamp(notification.timestamp)}
                            </span>
                            
                            {notification.actionUrl && (
                              <button
                                onClick={() => {
                                  markAsRead(notification.id);
                                  if (notification.actionUrl) {
                                    window.location.href = notification.actionUrl;
                                  }
                                }}
                                className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                              >
                                {notification.actionLabel}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
                <button className="text-sm text-[var(--color-slate-gray)] hover:text-[var(--color-deep-navy)] transition-colors">
                  Lihat semua notifikasi
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
