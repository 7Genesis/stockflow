import { Suspense } from "react";
import AceitarConviteClient from "./AceitarConviteClient";

export const dynamic = "force-dynamic";

export default function AceitarConvitePage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-zinc-100 px-4">
          <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
            <p className="text-sm text-zinc-500">Carregando convite...</p>
          </div>
        </main>
      }
    >
      <AceitarConviteClient />
    </Suspense>
  );
}