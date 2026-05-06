export default function LoadingSkeleton() {
  return (
    <div className="space-y-5 p-6">
      {[0, 1, 2].map((item) => (
        <div key={item} className={`flex ${item % 2 ? 'justify-end' : 'justify-start'}`}>
          <div className="w-3/4 max-w-2xl rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="shimmer h-4 w-2/3 rounded-full" />
            <div className="shimmer mt-3 h-4 w-full rounded-full" />
            <div className="shimmer mt-3 h-4 w-1/2 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
