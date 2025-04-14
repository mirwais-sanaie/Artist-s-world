import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import GoogleIcon from "./GoogleIcon";

export default function SignUp({ open, onOpenChange, onSwitchToSignIn }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-background border-none shadow-lg bg-primary text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Create an Account
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Join our creative community today.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <Button
            variant="outline"
            className="w-full gap-2 hover:bg-myGray-dark cursor-pointer"
          >
            <GoogleIcon className="h-4 w-4" />
            Sign up with Google
          </Button>
        </div>

        <div className="text-sm text-center text-gray-400">
          Already have an account?{" "}
          <span
            className="underline-offset-4 hover:underline cursor-pointer"
            onClick={() => {
              onOpenChange(false);
              onSwitchToSignIn();
            }}
          >
            Sign in
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
