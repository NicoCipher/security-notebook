import AdminNav from "@/components/admin/AdminNav";
import { ToastProvider } from "@/components/admin/Toast";

export const metadata = {
  title: "Admin — Notebook",
  robots: "noindex, nofollow",
};

export default function DashboardLayout({ children }) {
  return (
    <ToastProvider>
      <div className="min-h-screen flex flex-col md:flex-row">
        <AdminNav />
        <main className="flex-1 px-6 py-8 md:px-10 md:py-10">
          <div className="max-w-3xl">{children}</div>
        </main>
      </div>
    </ToastProvider>
  );
}
