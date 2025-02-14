import { DashboardMenu } from '@/components/dashboard/DashboardMenu';

/**
 * Layout component for the dashboard and all pages within it.
 *
 * - Includes the a dashboard menu as a sidebar that is always visible for navigation.
 * - Wraps child components inside a structured layout.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The content to be displayed within the layout.
 *
 * @returns {JSX.Element} The dashboard layout structure.
 */
export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="flex max-h-full">
      <DashboardMenu />
      <section className="flex-1 px-20 flex flex-col gap-8">{children}</section>
    </main>
  );
}
