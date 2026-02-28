// components/BookLoader.tsx
export default function BookLoader() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative w-24 h-32 animate-bounce-slow">
        {/* Book spine */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-700 rounded-l-lg shadow-lg origin-left animate-book-open" />
        
        {/* Book pages */}
        <div className="absolute inset-0 left-1 bg-gradient-to-r from-stone-100 to-stone-200 rounded-r-lg shadow-lg overflow-hidden">
          <div className="h-full w-full animate-page-flip">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-1 bg-stone-300 my-2 mx-3 rounded"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        </div>
        
        {/* Bookmark */}
        <div className="absolute -top-2 left-1/2 w-1 h-8 bg-red-400 rounded-t-lg animate-sway" />
      </div>
      <p className="mt-6 text-amber-700 font-medium animate-pulse">Turning pages...</p>
    </div>
  );
}