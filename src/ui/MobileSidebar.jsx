/* eslint-disable no-unused-vars */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SheetClose, SheetContent } from "@/components/ui/sheet";
import { useAuthContext } from "@/contexts/AuthContextProv";
import { LogIn, Pen, Search, ShoppingCart, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

function MobileSidebar({ navLinks, setIsMenuOpen }) {
  const { setOpenModal } = useAuthContext();

  return (
    <SheetContent
      side="left"
      className="w-[300px] bg-primary border-r border-[#1E1E24] [&>button]:hidden px-4 "
    >
      <div className="relative">
        <SheetClose asChild>
          <button className="absolute top-5 right-2 text-white hover:text-myGray">
            <X className="w-6 h-6" />
          </button>
        </SheetClose>
      </div>

      <div className="flex flex-col gap-8 pt-10">
        {/* Search Bar in Mobile Menu */}
        <div className="relative w-full mt-5">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A0A0A0]" />
          <Input
            type="search"
            placeholder="Search artwork, artists..."
            className="pl-10 pr-4 py-2 rounded-full bg-[#1E1E24] border-myPurple text-white placeholder-[#A0A0A0] focus-visible:ring-myPurple focus-visible:border-myPurple"
          />
        </div>

        <div className="flex justify-between">
          {/* Cart in Mobile Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              className="relative text-myGray-midum hover:text-myGray hover:bg-primary justify-start gap-2"
              asChild
            >
              <Link to="/cart" className="flex items-center gap-2">
                <div className="relative">
                  <ShoppingCart className="!w-5 !h-5" />

                  <span
                    className="absolute -top-3 -right-3 bg-myPurple text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                    aria-label="Cart items count"
                  >
                    3
                  </span>
                </div>
              </Link>
            </Button>
          </div>

          {/* sign Up Button in Mobile Menu  */}
          <Button
            onClick={() => setOpenModal("signup")}
            className="text-white bg-myGray-dark border-[#1E1E24] hover:bg-myGray-muted hover:text-white"
          >
            <Pen className="h-4 w-4 mr-2" />
            Sign Up
          </Button>
        </div>

        <nav className="flex flex-col gap-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.href}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors relative group ${
                  isActive ? "text-myPurple" : "text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.name}
                  {!isActive && (
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-myPurple transition-all duration-300"></span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
    </SheetContent>
  );
}

export default MobileSidebar;
