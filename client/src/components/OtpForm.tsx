import { BASE_URL } from "@/api";
import axios from "axios";
import { Mail, PhoneCall } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import CustomInput from "./CustomInput";
import { Button } from "./ui/button";

const OtpForm = () => {
  const [formData, setFormData] = useState({
    mobileOtp: "",
    emailOtp: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const validateOtp = (otp: string) => {
    const otpPattern = /^[0-9]{6}$/;
    return otpPattern.test(otp);
  };

  const submitHandler = async () => {
    const { mobileOtp, emailOtp } = formData;

    if (!validateOtp(mobileOtp)) {
      return toast.error("Mobile OTP must be a 6-digit number.");
    }

    if (!validateOtp(emailOtp)) {
      return toast.error("Email OTP must be a 6-digit number.");
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/auth/verify/otp`,
        { ...formData },
        { withCredentials: true }
      );
      if (response.status === 200) {
        navigate("/dashboard");
        toast.success("Verfied otp");
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

  return (
    <div className="flex flex-row justify-between lg:px-10 w-full h-screen">
      <div className="lg:visible hidden max-w-xl lg:flex flex-col justify-center items-center">
        <p className="font-light text-xl text-gray-600">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus
          numquam id maiores atque iste explicabo cum, obcaecati facere
          corrupti, labore dolores modi aperiam sit sed ipsum enim minima
          debitis architecto possimus accusamus nisi corporis voluptas quam
          velit? Consequatur, ea? Quis rerum doloribus aspernatur optio fuga
          dolore maiores odio aliquid quia.
        </p>
      </div>
      <div className="flex flex-col lg:items-end justify-center w-full ">
        <div className="border shadow-xl border-blue-500 p-4 rounded-xl lg:w-8/12 ">
          <p className="flex flex-col gap-2 items-center text-xl font-semibold py-4">
            Sign up
            <span className="text-base font-thin">
              Lorem, ipsum dolor sit amet.
            </span>
          </p>
          <div className="flex flex-col gap-4">
            <CustomInput
              name="emailOtp"
              value={formData.emailOtp}
              changeHandler={changeHandler}
              placeholder="Email OTP"
              type="number"
            >
              <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            </CustomInput>
            <CustomInput
              name="mobileOtp"
              value={formData.mobileOtp}
              changeHandler={changeHandler}
              placeholder="Moblie OTP"
              type="number"
            >
              <PhoneCall className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            </CustomInput>
            <Button disabled={isLoading} onClick={submitHandler}>
              Verify
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpForm;
