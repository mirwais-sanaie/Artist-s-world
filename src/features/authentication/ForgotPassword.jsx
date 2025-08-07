import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  requestOtpCode,
  verifyOtpCode,
  updatePassword,
} from "@/services/apiAuth";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function ForgotPassword({ open, onOpenChange }) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onRequestCode = async ({ email }) => {
    try {
      await requestOtpCode(email);
      setEmail(email);
      setStep(2);
      toast.success("Verification code sent to your email");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onVerifyCode = async ({ code }) => {
    try {
      await verifyOtpCode(email, code);
      setStep(3);
      toast.success("Code verified");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onResetPassword = async ({ newPassword }) => {
    try {
      await updatePassword(newPassword);
      toast.success("Password updated. You can log in now.");
      onOpenChange(false);
      setStep(1);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-background border-none shadow-lg bg-primary text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {step === 1 && "Reset Password"}
            {step === 2 && "Enter Code"}
            {step === 3 && "Set New Password"}
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            {step === 1 && "Enter your email to receive a code"}
            {step === 2 && "Check your email for a 6-digit code"}
            {step === 3 && "Enter your new password"}
          </DialogDescription>
        </DialogHeader>

        {step === 1 && (
          <form onSubmit={handleSubmit(onRequestCode)} className="space-y-4">
            <div>
              <Label>Email</Label>
              <Input
                className="my-3"
                {...register("email", { required: true })}
                placeholder="example@example.com"
                type="email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">Email is required</p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full mt-2 bg-myPurple hover:bg-myPurple-hover"
            >
              Send Code
            </Button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit(onVerifyCode)} className="space-y-4">
            <div>
              <Label>Verification Code</Label>
              <Input
                className="my-3"
                {...register("code", { required: true })}
                placeholder="6-digit code"
              />
              {errors.code && (
                <p className="text-red-500 text-sm">Code is required</p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full mt-2 bg-myPurple hover:bg-myPurple-hover"
            >
              Verify
            </Button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleSubmit(onResetPassword)} className="space-y-4">
            <div>
              <Label>New Password</Label>
              <Input
                {...register("newPassword", { required: true, minLength: 6 })}
                type="password"
              />
              {errors.newPassword && (
                <p className="text-red-500 text-sm">Minimum 6 characters</p>
              )}
            </div>

            <div>
              <Label>Confirm Password</Label>
              <Input
                {...register("confirmPassword", {
                  required: true,
                  validate: (value) =>
                    value === watch("newPassword") || "Passwords don't match",
                })}
                type="password"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full mt-2 bg-myPurple hover:bg-myPurple-hover"
            >
              Update Password
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
