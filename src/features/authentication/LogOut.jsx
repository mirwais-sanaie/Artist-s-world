import { useAuthContext } from "@/contexts/AuthContextProv";
import { signOut } from "@/services/apiAuth";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

function LogOut() {
  const { isLogoutOpen, setIsLogoutOpen, setUser } = useAuthContext();

  function handleLogOut() {
    signOut();
    setUser(null);
    setIsLogoutOpen(false);
  }
  return (
    <>
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
  );
}

export default LogOut;
