import { Button } from "@/components/ui/button";
import { SheetTrigger } from "@/components/ui/sheet";
import { LogIn, Menu } from "lucide-react";
import { Link } from "react-router-dom";

function MobileNavHeader() {
  return (
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
        <span className="text-myPurple">Art</span>
        <span className="text-white">Center</span>
      </Link>

      {/* Replaced User icon with Sign In button */}
      <Button
        size="sm"
        className="bg-myPurple hover:bg-myPurple-hover text-white h-9 px-3 rounded-md"
        asChild
      >
        <Link to="/signin">
          <LogIn className="h-4 w-4" />
          <span>Sign In</span>
        </Link>
      </Button>
    </div>
  );
}

export default MobileNavHeader;
