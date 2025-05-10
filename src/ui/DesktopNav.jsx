import { ArrowDown, ArrowUp, ChevronDown, ChevronUp } from "lucide-react";
import { useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";

function DesktopNav({ navLinks }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropDownRef = useRef(null);

  const handlerLeave = () => {
    setIsOpen(false);
  };

  return (
    <div className="hidden md:flex items-center gap-10">
      <Link to="/" className="">
        <img src="/Logo.png" alt="" width={55} height={55} />
      </Link>

      <nav className="flex items-center gap-6">
        {navLinks.map((link) =>
          link.children ? (
            // For links with dropdown
            <div key={link.name} className="relative">
              <div
                className="cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
              >
                <div
                  className={`text-[15px] flex font-medium transition-colors relative text-[#A0A0A0] hover:text-white`}
                >
                  {link.name}
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 absolute top-1 -right-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4 absolute top-1 -right-4" />
                  )}
                </div>
              </div>

              {isOpen && (
                <div
                  ref={dropDownRef}
                  onMouseLeave={handlerLeave}
                  className="absolute left-0 mt-2 bg-myGray-dark shadow-lg transition-all duration-200 z-100 w-40"
                >
                  {link.children?.map((child) => (
                    <NavLink
                      key={child.name}
                      to={child.href}
                      className="flex items-center px-4 py-2 text-sm text-white hover:bg-myGray-muted"
                      onClick={() => setIsOpen(false)}
                    >
                      {child.icon}
                      {child.name}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ) : (
            // For normal links
            <NavLink
              key={link.name}
              to={link.href}
              className={({ isActive }) =>
                `text-[15px] font-medium transition-colors relative group ${
                  isActive ? "text-white" : "text-[#A0A0A0] hover:text-white"
                }`
              }
            >
              {link.name}
              {/* <span
                    className={`absolute bottom-0 left-0 h-[2px] bg-myPurple transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span> */}
            </NavLink>
          )
        )}
      </nav>
    </div>
  );
}

export default DesktopNav;
