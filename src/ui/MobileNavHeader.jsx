import { Button } from "@/components/ui/button";
import { SheetTrigger } from "@/components/ui/sheet";
import { useAuthContext } from "@/contexts/AuthContextProv";
import { ArrowUpFromLine, LogIn, Menu } from "lucide-react";
import { Link } from "react-router-dom";

function MobileNavHeader() {
  const { setOpenModal } = useAuthContext();
  const { user } = useAuthContext();

  return (
    <div className="md:hidden flex items-center justify-between w-full relative">
      <div className="flex-1 flex justify-start">
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:text-myGray hover:bg-transparent"
          >
            <Menu className="!h-7 !w-7" />
          </Button>
        </SheetTrigger>
      </div>

      {/* Logo */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <Link to="/">
          <img src="/Logo.png" width={55} height={55} alt="Logo" />
        </Link>
      </div>

      {user?.aud === "authenticated" ? (
        <div className="flex space-x-4 items-center justify-end">
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
        </div>
      ) : (
        <div className="flex-1 flex justify-end">
          <Button
            onClick={() => setOpenModal("signin")}
            className="bg-myPurple hover:bg-myPurple-hover text-white"
          >
            <LogIn className="h-4 w-4 mr-2" />
            Sign In
          </Button>
        </div>
      )}
    </div>
  );
}

export default MobileNavHeader;
