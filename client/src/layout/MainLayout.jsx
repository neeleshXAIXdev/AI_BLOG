import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="bg-[#0f172a] min-h-screen text-white flex flex-col">
      <Navbar />

      <main className="flex-1 pt-20 px-4">{children}</main>

      <Footer />
    </div>
  );
};

export default MainLayout;
