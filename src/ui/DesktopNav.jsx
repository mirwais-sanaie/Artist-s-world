import { Link, NavLink } from "react-router-dom";

function DesktopNav({ navLinks }) {
  return (
    <div className="hidden md:flex items-center gap-10">
      <Link to="/" className="flex items-center gap-2 font-bold text-lg">
        <span className="text-myPurple">Art</span>
        <span className="text-white">Center</span>
      </Link>

      <nav className="flex items-center gap-6">
        {navLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.href}
            className={({ isActive }) =>
              `text-sm font-medium transition-colors relative group ${
                isActive ? "text-white" : "text-[#A0A0A0] hover:text-white"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {link.name}
                <span
                  className={`absolute bottom-0 left-0 h-[2px] bg-myPurple transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

export default DesktopNav;
