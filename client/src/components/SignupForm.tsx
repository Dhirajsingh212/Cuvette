import { Mail, PhoneCall, SquareUser, User } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import CustomInput from "./CustomInput";
import { Button } from "./ui/button";
import axios from "axios";
import { BASE_URL } from "@/api";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { isLoggedIn } from "@/atoms/atom";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    companyName: "",
    companyEmail: "",
    employeeSize: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const setIsLoggedInStateValue = useSetRecoilState(isLoggedIn);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const validatePhoneNumber = (phoneNumber: string) => {
    const regex = /^\+?[1-9][0-9]{7,14}$/;
    return regex.test(phoneNumber);
  };

  const submitHandler = async () => {
    setIsLoading(true);
    const { name, phoneNumber, companyName, companyEmail, employeeSize } =
      formData;

    if (
      !name ||
      !phoneNumber ||
      !companyName ||
      !companyEmail ||
      !employeeSize
    ) {
      toast.error("All fields are required.");
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      toast.error("Please enter a valid phone number.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(companyEmail)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    const employeeSizeNum = Number(employeeSize);
    if (isNaN(employeeSizeNum) || employeeSizeNum <= 0) {
      toast.error("Employee size must be a positive number.");
      return;
    }
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/auth/signup`,
        {
          ...formData,
          employeeSize: employeeSizeNum,
        },
        { withCredentials: true }
      );
      if (response.status === 200) {
        toast.success("Successfully signed up.");
        setIsLoggedInStateValue(true);
        setFormData({
          name: "",
          phoneNumber: "",
          companyName: "",
          companyEmail: "",
          employeeSize: "",
        });
        navigate("/verify/otp");
      } else {
        throw new Error("Something went wrong.");
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to signup.");
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
              name="name"
              changeHandler={changeHandler}
              value={formData.name}
              placeholder="Name"
              type="text"
            >
              <User className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            </CustomInput>
            <CustomInput
              name="phoneNumber"
              value={formData.phoneNumber}
              changeHandler={changeHandler}
              placeholder="Phone no."
              type="text"
            >
              <PhoneCall className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            </CustomInput>
            <CustomInput
              name="companyName"
              value={formData.companyName}
              changeHandler={changeHandler}
              placeholder="Company Name"
              type="text"
            >
              <User className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            </CustomInput>
            <CustomInput
              name="companyEmail"
              value={formData.companyEmail}
              changeHandler={changeHandler}
              placeholder="Company Email"
              type="email"
            >
              <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            </CustomInput>
            <CustomInput
              name="employeeSize"
              value={formData.employeeSize}
              changeHandler={changeHandler}
              placeholder="Employee Size"
              type="number"
            >
              <SquareUser className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            </CustomInput>
            <p className="text-center py-2 lg:px-8">
              By clicking on proceed you wil accept our{" "}
              <span className="text-blue-500">Terms</span> &{" "}
              <span className="text-blue-500">Conditions</span>
            </p>
            <Button disabled={isLoading} onClick={submitHandler}>
              Signup
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
