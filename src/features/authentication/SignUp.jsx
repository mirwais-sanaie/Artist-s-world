import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import GoogleIcon from "./GoogleIcon";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useSignUp } from "@/services/apiAuth";
import { toast } from "react-toastify";
import { useAuthContext } from "@/contexts/AuthContextProv";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function SignUp({ open, onOpenChange, onSwitchToSignIn }) {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const { mutate: signUp, isPending } = useSignUp();
  const { setUser } = useAuthContext();

  function onSubmit(data) {
    signUp(data, {
      onSuccess: (data) => {
        setUser(data?.user);
        toast.success("Signed up successfully!", { position: "top-center" });
        reset();
      },
      onError: (error) => {
        toast.error(error.message, { position: "top-center" });
      },
    });
  }

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

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                {...register("email", { required: "Email is required" })}
                id="email"
                type="email"
                placeholder="your@email.com"
                className={
                  " border-myPurple focus-visible:ring-myPurple focus-visible:border-myPurple selection:bg-myPurple text-white"
                }
              />
            </div>
            {/* password info */}
            <div className="grid gap-2 relative">
              <Label htmlFor="password">Password</Label>
              <Input
                {...register("password", {
                  required: "Password is required",
                  minLength: 6,
                })}
                id="password"
                type={showPassword ? "text" : "password"}
                className={
                  "pr-10 border-myPurple focus-visible:ring-myPurple focus-visible:border-myPurple selection:bg-myPurple text-white"
                }
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] text-gray-400 hover:text-white"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {/* */}

            <Button
              type="submit"
              className="w-full mt-2 bg-myPurple hover:bg-myPurple-hover"
              disabled={isPending}
            >
              {isPending ? "Signing up..." : "Sign Up"}
            </Button>
          </div>
        </form>

        <div className="text-sm text-center text-gray-400">
          Already have an account?&nbsp;
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
