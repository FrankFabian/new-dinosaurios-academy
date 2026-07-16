import { ShieldAlert } from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { AppShell } from "@/components/layout/app-shell";
import { AcademicsManagementClient } from "@/features/venues/academics-management-client";
import { getAcademyStructure } from "@/features/venues/api";
import { VenuesManagementPage, type VenuesSearchParams } from "@/features/venues/venues-management-page";
import { getCurrentUser } from "@/lib/auth/current-user";
import { getConfiguredLocale, getMessages } from "@/lib/i18n/messages";

export default async function StructurePage({ searchParams }: { searchParams?: Promise<VenuesSearchParams> }) {
  const locale = getConfiguredLocale();
  const allMessages = getMessages(locale);
  const messages = allMessages.academics;
  const authState = await getCurrentUser();

  if (authState.status === "unauthenticated") {
    redirect("/");
  }

  if (authState.status !== "authenticated") {
    return (
      <main className="min-h-screen bg-background px-4 py-6 text-foreground sm:px-6 lg:px-8">
        <section className="mx-auto max-w-5xl border-b border-border pb-5">
          <h1 className="text-2xl font-semibold">{messages.title}</h1>
          <p className="mt-2 text-sm text-muted">{messages.unavailable}</p>
        </section>
      </main>
    );
  }

  const canManage = authState.user.roles.some((role) => role === "admin" || role === "staff");

  if (!canManage) {
    return (
      <AppShell activeKey="venues" messages={allMessages.shell} user={authState.user}>
        <section className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl border-b border-border pb-5">
            <div className="flex items-center gap-3">
              <ShieldAlert aria-hidden className="h-5 w-5 text-primary" />
              <h1 className="text-2xl font-semibold">{messages.permissionDenied.title}</h1>
            </div>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">{messages.permissionDenied.description}</p>
          </div>
        </section>
      </AppShell>
    );
  }

  const [params, cookieStore] = await Promise.all([searchParams, cookies()]);
  const academyStructure = await getAcademyStructure(cookieStore.toString());

  return (
    <AppShell activeKey="venues" messages={allMessages.shell} user={authState.user}>
      <AcademicsManagementClient>
        <VenuesManagementPage messages={messages} searchParams={params ?? {}} structure={academyStructure} />
      </AcademicsManagementClient>
    </AppShell>
  );
}
