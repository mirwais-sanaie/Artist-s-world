import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SheetClose, SheetContent } from "@/components/ui/sheet";
import { Pen, Search, ShoppingCart, X } from "lucide-react";
import { Link } from "react-router-dom";

function MobileSidebar({ navLinks, setIsMenuOpen }) {
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
            variant="outline"
            className="text-white bg-myGray-dark border-[#1E1E24] hover:bg-myGray-muted hover:text-white justify-start gap-2"
            asChild
          >
            <Link to="/signin" onClick={() => setIsMenuOpen(false)}>
              <Pen className="h-4 w-4" />
              Sign Up
            </Link>
          </Button>
        </div>

        <nav className="flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-sm font-medium text-[#A0A0A0] hover:text-white transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </SheetContent>
  );
}

export default MobileSidebar;
