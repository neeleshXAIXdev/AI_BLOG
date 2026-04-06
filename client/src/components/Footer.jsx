const Footer = () => {
  return (
    <div className="border-t border-white/10 mt-10 ">
      <div className="max-w-6xl mx-auto py-6 px-4 text-center text-gray-400">
        <h2 className="text-lg font-semibold text-white mb-2">
          AI Blog Platform
        </h2>

        <p className="text-sm">Built with ❤️ using MERN + AI</p>

        <p className="text-xs mt-2">
          © {new Date().getFullYear()} All rights reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
