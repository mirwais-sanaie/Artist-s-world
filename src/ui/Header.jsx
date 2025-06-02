import { useState } from "react";
import {
  LogIn,
  Pen,
  Search,
  ShoppingCart,
  FileText,
  BriefcaseBusiness,
  ArrowUpFromLine,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MobileNavHeader from "./MobileNavHeader";
import MobileSidebar from "./MobileSidebar";
import { Sheet } from "@/components/ui/sheet";
import DesktopNav from "./DesktopNav";
import SignIn from "../features/authentication/SignIn";
import SignUp from "../features/authentication/SignUp";
import { useAuthContext } from "./../contexts/AuthContextProv";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { signOut } from "@/services/apiAuth";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { savedPosts } = useAuthContext();
  const {
    openModal,
    setOpenModal,
    isLogoutOpen,
    setIsLogoutOpen,
    setUser,
    user,
  } = useAuthContext();

  const navLinks = [
    { name: "Home", href: "/category/characterDesign" },
    { name: "About us", href: "/about" },
    {
      name: "Jobs",
      href: "/Jobs",
      children: [
        {
          name: "Post Job",
          href: "/jobs/postJobs",
          icon: <FileText className="w-4 h-4 mr-2" />,
        },
        {
          name: "Find Job",
          href: "/jobs/findJobs",
          icon: <BriefcaseBusiness className="w-4 h-4 mr-2" />,
        },
      ],
    },
  ];

  function handleLogOut() {
    signOut();
    setUser(null);
    setIsLogoutOpen(false);
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full supports-[backdrop-filter]:bg-[#101014] pt-2`}
    >
      <div className="flex h-15 items-center justify-between mx-auto">
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
            <Link
              to="/cart"
              className="relative text-myGray-midum cursor-pointer hover:text-myGray hover:bg-primary p-1 rounded"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-myPurple text-white text-[10px] rounded-full h-4 min-w-[1.25rem] flex items-center justify-center px-[2px]">
                {savedPosts?.length || 0}
              </span>
            </Link>

            {user?.aud === "authenticated" ? (
              <>
                <Link
                  to={"/createpost"}
                  variant="ghost"
                  size="icon"
                  title="Create new post"
                  className="text-myGray-midum cursor-pointer hover:text-myGray hover:bg-primary"
                >
                  <ArrowUpFromLine className="!w-6 !h-6" />
                </Link>

                <div className="w-[35px] h-[35px]">
                  <img
                    className="w-full h-full rounded-full object-cover border-2 border-myGray-muted hover:border-myPurple"
                    src={user?.user_metadata?.avatar_url}
                    alt="User Avatar"
                  />
                </div>

                <Button
                  onClick={() => setIsLogoutOpen(true)}
                  className="bg-myPurple hover:bg-myPurple-hover text-white cursor-pointer"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Log out
                </Button>

                {/* Logout Confirmation Dialog */}
                <Dialog open={isLogoutOpen} onOpenChange={setIsLogoutOpen}>
                  <DialogContent className="sm:max-w-[425px] bg-background border-none shadow-lg bg-primary text-white">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold">
                        Confirm Logout
                      </DialogTitle>
                      <DialogDescription className="text-gray-400">
                        Are you sure you want to sign out?
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-4 flex justify-end gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setIsLogoutOpen(false)}
                        className="text-white border-gray-600 hover:bg-gray-700"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleLogOut}
                        className="bg-red-500 hover:bg-red-600 text-white"
                      >
                        Log Out
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </>
            ) : (
              <>
                <div className="flex gap-2">
                  <Button
                    onClick={() => setOpenModal("signup")}
                    className="text-white bg-myGray-dark border-[#1E1E24] hover:bg-myGray-muted hover:text-white cursor-pointer"
                  >
                    <Pen className="h-4 w-4 mr-2" />
                    Sign Up
                  </Button>
                  <Button
                    onClick={() => setOpenModal("signin")}
                    className="bg-myPurple hover:bg-myPurple-hover text-white cursor-pointer"
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>

                  <SignIn
                    open={openModal === "signin"}
                    onOpenChange={(open) =>
                      setOpenModal(open ? "signin" : null)
                    }
                    onSwitchToSignUp={() => setOpenModal("signup")}
                  />

                  <SignUp
                    open={openModal === "signup"}
                    onOpenChange={(open) =>
                      setOpenModal(open ? "signup" : null)
                    }
                    onSwitchToSignIn={() => setOpenModal("signin")}
                  />
                </div>
              </>
            )}
          </div>
        </Sheet>
      </div>
    </header>
  );
}
