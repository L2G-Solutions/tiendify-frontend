import Link from 'next/link';

/**
 * This page customizes the 404 error page, to provide a better user experience.
 * It should be used as a fallback for any unknown routes in the application.
 *
 * - Displays an error message when a requested resource is not found.
 * - Provides a link to navigate back to the homepage.
 *
 * @returns {JSX.Element} The not found page UI.
 */
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
