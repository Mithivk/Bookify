// app/dashboard/loading.tsx
import BookLoader from "../components/BookLoader";

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <BookLoader />
    </div>
  );
}