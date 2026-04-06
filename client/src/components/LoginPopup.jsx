import { useNavigate } from "react-router-dom";

const LoginPopup = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Glass Card */}
      <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 w-[90%] max-w-sm text-white shadow-xl animate-fadeIn">
        <h2 className="text-xl font-bold mb-3 text-center">
          🔒 Login Required
        </h2>

        <p className="text-gray-300 text-center mb-6">
          You must be logged in to perform this action.
        </p>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/login")}
            className="flex-1 bg-blue-500 hover:bg-blue-600 py-2 rounded-lg"
          >
            Login
          </button>

          <button
            onClick={onClose}
            className="flex-1 bg-white/20 hover:bg-white/30 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;
