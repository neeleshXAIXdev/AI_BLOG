import { useLoader } from "../context/LoaderContext";

const GlobalLoader = () => {
  const { loading } = useLoader();

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Loader */}
      <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-8 py-6 flex flex-col items-center gap-4 shadow-xl">
        {/* Spinner */}
        <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>

        <p className="text-white text-sm">Please wait...</p>
      </div>
    </div>
  );
};

export default GlobalLoader;
