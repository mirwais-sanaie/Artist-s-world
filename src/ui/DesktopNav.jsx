import { Link } from "react-router-dom";

function DesktopNav({ navLinks }) {
  return (
    <div className="hidden md:flex items-center gap-10">
      <Link to="/" className="flex items-center gap-2 font-bold text-lg">
        <span className="text-myaccent">Art</span>
        <span className="text-white">Station</span>
      </Link>

      <nav className="flex items-center gap-6">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.href}
            className="text-sm font-medium text-[#A0A0A0] hover:text-white transition-colors relative group"
          >
            {link.name}
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-myaccent transition-all duration-300 group-hover:w-full"></span>
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default DesktopNav;
