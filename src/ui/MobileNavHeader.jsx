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
        <div className="flex space-x-2 items-center justify-end">
          <Link
            to={"/createpost"}
            variant="ghost"
            size="icon"
            title="Create new post"
            className="text-myGray-midum cursor-pointer hover:text-myGray hover:bg-primary"
          >
            <ArrowUpFromLine className="!w-6 !h-6" />
          </Link>

          <div>
            <img
              className="rounded-full border-2 border-myGray-muted hover:border-myPurple cursor-pointer"
              src="https://www.gravatar.com/avatar/0c4f50181f487eb9824604d450bc6196.jpg?size=240&amp;d=https%3A%2F%2Fwww.artstation.com%2Fassets%2Fdefault_avatar.jpg"
              alt=""
              width="33"
              height="33"
            ></img>
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
