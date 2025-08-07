import { useState, useEffect } from "react";
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
import { useVerifyOTP, useSignUpWithOTP } from "@/services/apiAuth";
import { toast } from "react-toastify";

const OTP_RESEND_DELAY = 120;

export default function OTPVerification({
  open,
  onOpenChange,
  email,
  onVerificationSuccess,
}) {
  const [resendDisabled, setResendDisabled] = useState(true);
  const [resendTimeLeft, setResendTimeLeft] = useState(OTP_RESEND_DELAY);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const { mutate: verifyOTP, isPending } = useVerifyOTP();
  const { mutate: resendOTP } = useSignUpWithOTP();
  const [sendError, setSendError] = useState(null);

  useEffect(() => {
    if (resendTimeLeft > 0) {
      const timer = setTimeout(() => {
        setResendTimeLeft(resendTimeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setResendDisabled(false);
    }
  }, [resendTimeLeft]);

  const onSubmit = (data) => {
    verifyOTP(
      {
        email: String(email).trim(),
        token: String(data.otp).trim(),
      },
      {
        onSuccess: (userData) => {
          toast.success("Email verified successfully!");
          onVerificationSuccess(userData);
        },
        onError: (error) => {
          console.error("Verification Error:", {
            email,
            otp: data.otp,
            error,
          });

          let errorMessage = error.message;
          if (error.message.includes("expired")) {
            errorMessage =
              "Verification code has expired. Please request a new code.";
            setResendDisabled(false);
            setResendTimeLeft(0);
          } else if (error.message.includes("invalid")) {
            errorMessage = "Invalid Verification code. Please check the code.";
          }

          toast.error(errorMessage, { autoClose: 5000 });
        },
      }
    );
  };

  const handleResend = () => {
    setSendError(null);
    setResendDisabled(true);
    setResendTimeLeft(OTP_RESEND_DELAY);

    resendOTP(email, {
      onSuccess: () => {
        toast.success("New Verification code sent successfully!");
      },
      onError: (error) => {
        console.error("Resend OTP error:", error);
        const message = error.message.includes("rate limit")
          ? "You've reached the maximum OTP requests. Please wait before trying again."
          : "Failed to resend OTP. Please try again.";
        setSendError(message);
        setResendDisabled(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-background border-none shadow-lg bg-primary text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Verify Your Email
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            We've sent a 6-digit OTP to {email}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="otp">Enter Verification Code</Label>
            <Input
              {...register("otp", {
                required: "Verification code is required",
                pattern: {
                  value: /^\d{6}$/,
                  message: "Must be 6 digits",
                },
              })}
              id="otp"
              type="text"
              inputMode="numeric"
              placeholder="123456"
              className="border-myPurple focus-visible:ring-myPurple focus-visible:border-myPurple text-white"
              autoFocus
              onChange={(e) => {
                e.target.value = e.target.value.replace(/\D/g, "").slice(0, 6);
              }}
            />
            {errors.otp && (
              <p className="text-red-500 text-sm">{errors.otp.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full mt-2 bg-myPurple hover:bg-myPurple-hover"
            disabled={isPending}
          >
            {isPending ? "Verifying..." : "Verify Email"}
          </Button>

          <div className="text-center text-sm text-gray-400">
            <Button
              type="button"
              onClick={handleResend}
              disabled={resendDisabled}
              variant="ghost"
              className="text-myPurple hover:underline"
            >
              {resendDisabled
                ? `Resend in ${resendTimeLeft}s`
                : "Resend Verification code"}
            </Button>
            {sendError && (
              <div className="text-red-500 text-sm text-center mt-2">
                {sendError}
              </div>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
