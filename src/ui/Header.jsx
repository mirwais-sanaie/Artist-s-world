import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LogIn, Pen, Search, ShoppingCart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MobileNavHeader from "./MobileNavHeader";
import MobileSidebar from "./MobileSidebar";
import { Sheet } from "@/components/ui/sheet";
import DesktopNav from "./DesktopNav";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-[#101014] bg-[#101014] backdrop-blur supports-[backdrop-filter]:bg-[#101014]/95 ${
        isScrolled ? "shadow-sm shadow-myPurple/10" : ""
      }`}
    >
      <div className=" flex h-16 items-center justify-between mx-auto">
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          {/* Mobile Navigation */}
          <MobileNavHeader />
          <MobileSidebar setIsMenuOpen={setIsMenuOpen} navLinks={navLinks} />

          {/* Desktop Navigation */}
          <DesktopNav navLinks={navLinks} />

          {/* Larger Desktop Search Input */}
          <div className="hidden md:flex relative w-full max-w-lg mx-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A0A0A0]" />
            <Input
              type="search"
              placeholder="Search artwork, artists..."
              className="pl-10 pr-4 py-3 rounded-full bg-[#1E1E24] border-myPurple text-white placeholder-[#A0A0A0] focus-visible:ring-myPurple focus-visible:border-myPurple text-sm h-11"
            />
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="relative text-myGray-midum hover:text-myGray hover:bg-primary"
            >
              <ShoppingCart className="!w-5 !h-5" />

              <span className="absolute -top-1 -right-1 bg-myPurple text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
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
                className="bg-myPurple hover:bg-myPurple-hover text-white"
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
