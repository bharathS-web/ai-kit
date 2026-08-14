import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "./components/ThemeContext";

export const metadata: Metadata = {
  title: "AI Kit - React UI Components for AI Products",
  description:
    "React components for AI product UIs — PromptBox, MessageBubble, ApprovalCard, Thinking, and human-in-the-loop workflows.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-gray-900 antialiased dark:bg-[#0B0F19] dark:text-gray-100 transition-colors">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
