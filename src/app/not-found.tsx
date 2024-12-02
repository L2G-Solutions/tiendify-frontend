import Link from 'next/link';

export default async function NotFoundPage() {
  return (
    <section className="px-20">
      <main className="w-full flex flex-col justify-center items-center gap-4">
        <h2 className="text-primary font-bold">Oops! Resource not found</h2>
        <p>
          Sorry, we couldn&apos;t find that. Please return to our{' '}
          <Link href="/" className="underline text-primary">
            homepage
          </Link>
          .
        </p>
        <img
          src="/illustrations/not-found.svg"
          alt="Not found illustration"
          className="max-w-[70%] md:max-w-[40%] lg:max-w-[25%]"
        />
      </main>
    </section>
  );
}
