import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useSignUp, useSignUpWithOTP } from "@/services/apiAuth";
import { toast } from "react-toastify";
import { useAuthContext } from "@/contexts/AuthContextProv";
import { Eye, EyeOff } from "lucide-react";
import ErrorText from "@/ui/ErrorText";
import OTPVerification from "./OTPVerification";

export default function SignUp({ open, onOpenChange, onSwitchToSignIn }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showOTPVerification, setShowOTPVerification] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [formData, setFormData] = useState(null);
  const { register, handleSubmit, reset, formState } = useForm();
  const { mutate: signUpWithEmail, isPending: isSignUpPending } = useSignUp();
  const { mutate: signUpWithOTP, isPending: isOTPPending } = useSignUpWithOTP();
  const { setUser } = useAuthContext();

  const { errors } = formState;

  function onSubmit(data) {
    if (!isValidEmail(data.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setFormData(data);
    setUserEmail(String(data.email).trim());

    signUpWithOTP(String(data.email).trim(), {
      onSuccess: () => {
        toast.success("Verification code has sent to your email!");
        setShowOTPVerification(true);
      },
      onError: (error) => {
        console.error("Verification code failed to send", error);
        toast.error(error.message || "Verification code failed to send");
      },
    });
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email));
  }

  function handleVerificationSuccess() {
    if (!formData) return;

    const image =
      typeof formData.image === "string" ? formData.image : formData.image[0];

    signUpWithEmail(
      { ...formData, image: image },
      {
        onSuccess: (data) => {
          setUser(data?.user);
          toast.success("Signed up successfully!", { position: "top-center" });
          reset();
          onOpenChange(false);
        },
        onError: (error) => {
          toast.error(error.message, { position: "top-center" });
        },
      }
    );
  }

  return (
    <>
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

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  {...register("fullName", { required: "Name is required" })}
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  className={
                    " border-myPurple focus-visible:ring-myPurple focus-visible:border-myPurple selection:bg-myPurple text-white"
                  }
                />
                {errors?.fullName?.message && (
                  <ErrorText>{errors.fullName.message}</ErrorText>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="profImg">Profile picture</Label>
                <input
                  type="file"
                  name="profImg"
                  accept="image/*"
                  {...register("image", {
                    required: "This field is required",
                  })}
                  className="file:bg-myPurple file:text-white file:border-none file:px-4 file:py-2 file:rounded file:cursor-pointer
               bg-color-card text-myGray border border-border focus:ring-2 focus:ring-myPurple"
                />
                {errors?.image?.message && (
                  <ErrorText>{errors.image.message}</ErrorText>
                )}
              </div>

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
                {errors?.email?.message && (
                  <ErrorText>{errors.email.message}</ErrorText>
                )}
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
                  className={
                    "pr-10 border-myPurple focus-visible:ring-myPurple focus-visible:border-myPurple selection:bg-myPurple text-white"
                  }
                  placeholder="Enter your password"
                />
                {errors?.password?.message && (
                  <ErrorText>{errors.password.message}</ErrorText>
                )}
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

              <Button
                type="submit"
                className="w-full mt-2 bg-myPurple hover:bg-myPurple-hover"
                disabled={isSignUpPending || isOTPPending}
              >
                {isSignUpPending || isOTPPending
                  ? "Sending Verification code..."
                  : "Sign Up"}
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

      <OTPVerification
        open={showOTPVerification}
        onOpenChange={setShowOTPVerification}
        email={userEmail}
        onVerificationSuccess={handleVerificationSuccess}
      />
    </>
  );
}
