import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LogIn, Menu, Pen, Search, ShoppingCart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "User", href: "/user" },
    { name: "Shop", href: "/shop" },
    { name: "Jobs", href: "/Jobs" },
  ];

  // Desktop Navigation Component
  const DesktopNav = () => (
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

  // Mobile Navigation Components
  const MobileHeader = () => (
    <div className="md:hidden flex items-center justify-between w-full">
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:text-myGray hover:bg-transparent"
        >
          <Menu className="!h-7 !w-7" />
        </Button>
      </SheetTrigger>

      <Link
        to="/"
        className="flex items-center gap-2 font-bold text-lg mx-auto"
      >
        <span className="text-myaccent">Art</span>
        <span className="text-white">Station</span>
      </Link>

      {/* Replaced User icon with Sign In button */}
      <Button
        size="sm"
        className="bg-myaccent hover:bg-myaccent-hover text-white h-9 px-3 rounded-md"
        asChild
      >
        <Link to="/signin">
          <LogIn className="h-4 w-4" />
          <span>Sign In</span>
        </Link>
      </Button>
    </div>
  );

  const MobileSidebar = () => (
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
            className="pl-10 pr-4 py-2 rounded-full bg-[#1E1E24] border-myaccent text-white placeholder-[#A0A0A0] focus-visible:ring-myaccent focus-visible:border-myaccent"
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
                    className="absolute -top-3 -right-3 bg-myaccent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
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
            <Link to="/signin">
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
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </SheetContent>
  );

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-[#101014] bg-[#101014] backdrop-blur supports-[backdrop-filter]:bg-[#101014]/95 ${
        isScrolled ? "shadow-sm shadow-myaccent/10" : ""
      }`}
    >
      <div className="px-4 md:px-7 flex h-16 items-center justify-between mx-auto">
        <Sheet>
          {/* Mobile Navigation */}
          <MobileHeader />
          <MobileSidebar />

          {/* Desktop Navigation */}
          <DesktopNav />

          {/* Desktop Search and Auth */}
          {/* Larger Desktop Search Input */}
          <div className="hidden md:flex relative w-full max-w-lg mx-2">
            {/* Changed from max-w-md to max-w-lg */}
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A0A0A0]" />
            <Input
              type="search"
              placeholder="Search artwork, artists..."
              className="pl-10 pr-4 py-3 rounded-full bg-[#1E1E24] border-myaccent text-white placeholder-[#A0A0A0] focus-visible:ring-myaccent focus-visible:border-myaccent text-sm h-11" // Added h-11 and py-3
            />
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="relative text-myGray-midum hover:text-myGray hover:bg-primary"
            >
              <ShoppingCart className="!w-5 !h-5" />

              <span className="absolute -top-1 -right-1 bg-myaccent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </Button>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="text-white bg-myGray-dark border-[#1E1E24] hover:bg-myGray-muted hover:text-white"
                asChild
              >
                <Link to="/signin">
                  <Pen className="h-4 w-4 mr-2" />
                  Sign Up
                </Link>
              </Button>
              <Button
                size="sm"
                className="bg-myaccent hover:bg-myaccent-hover text-white"
                asChild
              >
                <Link to="/signup">
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Link>
              </Button>
            </div>
          </div>
        </Sheet>
      </div>
    </header>
  );
}
