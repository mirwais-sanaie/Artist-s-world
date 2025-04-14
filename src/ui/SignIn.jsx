import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import GoogleIcon from "./GoogleIcon";

export default function SignIn({ open, onOpenChange, onSwitchToSignUp }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-background border-none shadow-lg bg-primary text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Welcome Back</DialogTitle>
          <DialogDescription className="text-gray-400">
            Sign in to access your creative dashboard
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <Button
            variant="outline"
            className="w-full gap-2 hover:bg-myGray-dark"
          >
            <GoogleIcon className="h-4 w-4" />
            Continue with Google
          </Button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-gray-400">
                Or continue with email
              </span>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                className={
                  " border-myPurple focus-visible:ring-myPurple focus-visible:border-myPurple"
                }
                id="email"
                type="email"
                placeholder="your@email.com"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                className={
                  " border-myPurple focus-visible:ring-myPurple focus-visible:border-myPurple"
                }
                id="password"
                type="password"
                placeholder="password"
              />
            </div>
            <Button
              type="submit"
              className="w-full mt-2 bg-myPurple hover:bg-myPurple-hover"
            >
              Sign In
            </Button>
          </div>
        </div>

        <div className="text-sm text-center text-gray-400">
          Don't have an account?{" "}
          <span
            className="underline-offset-4 hover:underline cursor-pointer"
            onClick={() => {
              onOpenChange(false);
              onSwitchToSignUp();
            }}
          >
            Sign up
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
