import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center dark:bg-[#0B0F19] text-gray-900 dark:text-white">
      <div className="space-y-4 max-w-md">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-50 text-2xl font-bold text-brand-600 dark:bg-purple-950/60 dark:text-purple-300">
          404
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Page Not Found</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          The requested documentation page could not be found.
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl bg-brand-600 px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-brand-700 transition-colors"
          >
            Back to Documentation
          </Link>
        </div>
      </div>
    </div>
  );
}
