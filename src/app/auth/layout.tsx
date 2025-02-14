/**
 * Layout component for authentication pages, providing a structured container for authentication-related views.
 *
 * @param {Readonly<{ children: React.ReactNode }>} props - The child components to be rendered within the layout.
 * @returns {JSX.Element} The authentication layout structure.
 */
export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="flex max-h-full">
      <section className="flex-1 px-20 flex flex-col gap-8">{children}</section>
    </main>
  );
}
