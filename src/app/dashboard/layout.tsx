import { DashboardMenu } from '@/components/dashboard/DashboardMenu';

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="flex max-h-full">
      <DashboardMenu />
      <section className="flex-1 px-20 flex flex-col gap-8">{children}</section>
    </main>
  );
}
