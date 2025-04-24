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

export default function SignUp({ open, onOpenChange, onSwitchToSignIn }) {
  const { register, handleSubmit, reset } = useForm();
  const { mutate: signUp, isPending } = useSignUp();
  const { setUser } = useAuthContext();

  function onSubmit(data) {
    console.log(data);
    signUp(data, {
      onSuccess: (data) => {
        console.log("User signed up successfully:", data);
        setUser(data.user);
        toast.success("Logid succesfully!", {
          position: "top-center",
        });
        reset();
      },
      onError: (error) => {
        console.error("Sign up error:", error.message);
      },
    });
  }
  function onError(error) {
    console.log(error);
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

        <form action="" onSubmit={handleSubmit(onSubmit, onError)}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className={
                  " border-myPurple focus-visible:ring-myPurple focus-visible:border-myPurple selection:bg-myPurple text-white"
                }
                id="email"
                type="email"
                placeholder="your@email.com"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className={
                  " border-myPurple focus-visible:ring-myPurple focus-visible:border-myPurple text-white selection:bg-myPurple"
                }
                id="password"
                type="password"
                placeholder="password"
              />
            </div>
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
