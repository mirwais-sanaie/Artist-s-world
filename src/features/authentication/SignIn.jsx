import { useState } from "react";
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
import { useForm } from "react-hook-form";
import { useSignIn } from "@/services/apiAuth";
import { toast } from "react-toastify";
import { useAuthContext } from "@/contexts/AuthContextProv";
import { Eye, EyeOff } from "lucide-react";

export default function SignIn({ open, onOpenChange, onSwitchToSignUp }) {
  const { register, handleSubmit, reset } = useForm();
  const { mutate: signIn, isPending } = useSignIn();
  const { setUser } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);

  function onSubmit(data) {
    signIn(data, {
      onSuccess: (data) => {
        setUser(data?.user);
        toast.success("Logged in successfully!", {
          position: "top-center",
        });
        reset();
      },
      onError: (error) => {
        toast.error(error.message, {
          position: "top-center",
        });
      },
    });
  }

  function onError(error) {
    toast.error(error.message, {
      position: "top-center",
    });
  }

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

          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  {...register("email", {
                    required: "Email is required",
                  })}
                  className="border-myPurple focus-visible:ring-myPurple focus-visible:border-myPurple selection:bg-myPurple text-white"
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                />
              </div>

              <div className="grid gap-2 relative">
                <Label htmlFor="password">Password</Label>
                <Input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  className="pr-10 border-myPurple focus-visible:ring-myPurple focus-visible:border-myPurple text-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-[30px] text-gray-400 hover:text-white"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              <Button
                type="submit"
                className="w-full mt-2 bg-myPurple hover:bg-myPurple-hover"
                disabled={isPending}
              >
                {isPending ? "Signing In..." : "Sign In"}
              </Button>
            </div>
          </form>
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
            Sign Up
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
