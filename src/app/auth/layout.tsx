export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="flex max-h-full">
      <section className="flex-1 px-20 flex flex-col gap-8">{children}</section>
    </main>
  );
}
