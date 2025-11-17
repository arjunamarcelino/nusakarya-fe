"use client";

import { Suspense } from "react";
import { CreateLicensePage } from "../../../_components/license/CreateLicensePage";

export default function License() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[var(--color-ivory-white)] flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--color-nusa-blue)]"></div>
            <p className="text-sm text-[var(--color-slate-gray)]">Memuat...</p>
          </div>
        </div>
      }
    >
      <CreateLicensePage />
    </Suspense>
  );
}

