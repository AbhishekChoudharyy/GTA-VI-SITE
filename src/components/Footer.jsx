// Footer.jsx
const Footer = () => {
  return (
    <footer className="bg-[#0a0a0a] text-white py-8 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="font-zentry text-lg md:text-8xl font-semibold text-[#ff5e5e] leading-snug">
          GTA VI
        </h2>

        <hr className="my-6 border-[#ff5e5e]/30" />

        <div className="font-circular-web flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 gap-2">
          <p>© 2025 WebDrave. All rights reserved.</p>
          <p>Made With ❤️ by <a href="webdrave.com"><u>WebDrave</u></a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
