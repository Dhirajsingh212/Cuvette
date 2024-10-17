import { BASE_URL } from "@/api";
import { isLoggedIn } from "@/atoms/atom";
import CustomInput from "@/components/CustomInput";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { CircleCheck, Mail, PhoneCall } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { useRecoilState } from "recoil";

interface Verfication {
  otpVerified: boolean;
  emailVerified: boolean;
  companyEmail: string;
  phoneNumber: string;
}

const Settings = () => {
  const [isLoggedInState, _] = useRecoilState(isLoggedIn);
  const [verificationData, setVerificationData] = useState<Verfication>();
  const [formData, setFormData] = useState({
    emailOtp: "",
    phoneNumberOtp: "",
  });
  const [flag, setFlag] = useState(false);
  const [countdown, setCountdown] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchVerificationData() {
      if (!isLoggedInState) return;

      const response = await axios.get(
        `${BASE_URL}/api/v1/auth/check/verification`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        setVerificationData(response.data.userData);
      }
    }
    fetchVerificationData();
  }, []);

  useEffect(() => {
    // Cleanup the timer when the component is unmounted
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const startCountdown = () => {
    setFlag(true);
    setCountdown(120); // 120 seconds for 2 minutes

    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          setFlag(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const sendHandler = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/auth/get/otp`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        toast.success("OTP sent successfully.");
        startCountdown();
      } else {
        throw new Error("Something went wrong");
      }
    } catch (err: any) {
      const msg = err.response.data.message;
      toast.error(`${msg}`);
    }
  };

  const validateOtp = (otp: string) => {
    const otpPattern = /^[0-9]{6}$/;
    return otpPattern.test(otp);
  };

  const verifyHandler = async () => {
    const { phoneNumberOtp, emailOtp } = formData;

    if (!validateOtp(phoneNumberOtp)) {
      return toast.error("Mobile OTP must be a 6-digit number.");
    }

    if (!validateOtp(emailOtp)) {
      return toast.error("Email OTP must be a 6-digit number.");
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/auth/verify/otp`,
        {
          emailOtp: emailOtp,
          mobileOtp: phoneNumberOtp,
        },
        { withCredentials: true }
      );
      if (response.status === 200) {
        toast.success("Verfied otp");
        setFormData({
          phoneNumberOtp: "",
          emailOtp: "",
        });
        window.location.reload();
      } else {
        throw new Error("Something went wrong");
      }
    } catch (err: any) {
      const msg = err.response.data.message;
      toast.error(`${msg}`);
    } finally {
      setIsLoading(false);
    }
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  if (!isLoggedInState) {
    return (
      <div className="pt-4 text-xl font-light text-gray-500">Loggin first</div>
    );
  }

  return (
    <div className="border-t flex flex-row">
      <Sidebar />
      <div className="p-2 w-full overflow-y-scroll h-[89vh] no-scrollbar">
        <p className="text-xl font-semibold text-blue-500 pb-4">
          Check for verifications
        </p>
        <div className="flex flex-col gap-4 w-full max-w-lg mx-auto p-4 sm:p-8 border border-blue-500 shadow-xl rounded-lg ">
          <p>Email - {verificationData && verificationData.companyEmail}</p>
          <CustomInput
            name="emailOtp"
            value={formData.emailOtp}
            changeHandler={changeHandler}
            placeholder="Email OTP"
            type="email"
            disabled={
              verificationData && verificationData.emailVerified ? true : false
            }
          >
            {verificationData && verificationData.emailVerified ? (
              <CircleCheck className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            ) : (
              <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            )}
          </CustomInput>
          <p>Phone no. - {verificationData && verificationData.phoneNumber}</p>
          <CustomInput
            name="phoneNumberOtp"
            value={formData.phoneNumberOtp}
            changeHandler={changeHandler}
            placeholder="Phone no. OTP"
            type="text"
            disabled={
              verificationData && verificationData.otpVerified ? true : false
            }
          >
            {verificationData && verificationData.otpVerified ? (
              <CircleCheck className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            ) : (
              <PhoneCall className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            )}
          </CustomInput>
          {verificationData &&
            (!verificationData.otpVerified ||
              !verificationData.emailVerified) && (
              <>
                <Button disabled={flag} onClick={sendHandler}>
                  Send
                </Button>
                {countdown > 0 && (
                  <p className="text-gray-500 mt-2">
                    You can resend the OTP in {Math.floor(countdown / 60)}m{" "}
                    {countdown % 60}s
                  </p>
                )}
                <Button disabled={isLoading} onClick={verifyHandler}>
                  Verify
                </Button>
              </>
            )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
