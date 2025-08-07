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
import { useForm } from "react-hook-form";
import { useSignIn } from "@/services/apiAuth";
import { toast } from "react-toastify";
import { useAuthContext } from "@/contexts/AuthContextProv";
import { Eye, EyeOff } from "lucide-react";
import ForgotPassword from "./ForgotPassword";

export default function SignIn({ open, onOpenChange, onSwitchToSignUp }) {
  const { register, handleSubmit, reset } = useForm();
  const { mutate: signIn, isPending } = useSignIn();
  const { setUser } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  function onSubmit(data) {
    signIn(data, {
      onSuccess: (data) => {
        setUser(data?.user);
        toast.success("Logged in successfully!", {
          position: "top-center",
        });
        reset();
        onOpenChange(false);
      },
      onError: (error) => {
        toast.error(error.message, {
          position: "top-center",
        });
      },
    });
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px] bg-background border-none shadow-lg bg-primary text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              Welcome Back
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Sign in to access your creative website
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <form onSubmit={handleSubmit(onSubmit)}>
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

                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => {
                      onOpenChange(false);
                      setShowForgotPassword(true);
                    }}
                    className="text-sm text-myPurple hover:underline"
                  >
                    Forgot password?
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

      <ForgotPassword
        open={showForgotPassword}
        onOpenChange={setShowForgotPassword}
      />
    </>
  );
}
