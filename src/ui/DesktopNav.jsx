import { Link, NavLink } from "react-router-dom";

function DesktopNav({ navLinks }) {
  return (
    <div className="hidden md:flex items-center gap-10">
      <Link to="/" className="">
        <img src="/Logo.png" alt="" width={55} height={55} />
      </Link>

      <nav className="flex items-center gap-6">
        {navLinks.map((link) =>
          link.children ? (
            // For links with dropdown
            <div key={link.name} className="relative group ">
              <div
                className={`text-sm  font-medium transition-colors relative group-hover:text-white text-[#A0A0A0] hover:text-white cursor-pointer`}
              >
                {link.name}
                <span className="absolute bottom-0 left-0 h-[2px] bg-myPurple transition-all duration-300 w-0 group-hover:w-full "></span>
              </div>
              <div className="absolute  left-0 mt-2 bg-myGray-dark shadow-lg opacity-0 group-hover:opacity-100 group-hover:translate-y-1 transition-all duration-200 z-100 w-40">
                {link.children.map((child) => (
                  <NavLink
                    key={child.name}
                    to={child.href}
                    className="flex items-center px-4 py-2 text-sm text-white hover:bg-myGray-muted"
                  >
                    {child.icon}
                    {child.name}
                  </NavLink>
                ))}
              </div>
            </div>
          ) : (
            // For normal links
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
          )
        )}
      </nav>
    </div>
  );
}

export default DesktopNav;
