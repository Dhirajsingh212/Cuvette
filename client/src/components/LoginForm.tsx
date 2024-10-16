import { BASE_URL } from "@/api";
import axios from "axios";
import { Mail } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import CustomInput from "./CustomInput";
import { Button } from "./ui/button";
import { useSetRecoilState } from "recoil";
import { isLoggedIn } from "@/atoms/atom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const setIsLoggedInStateValue = useSetRecoilState(isLoggedIn);

  const submitHandler = async () => {
    if (!email.trim()) {
      toast.error("email is required");
      return;
    }
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${BASE_URL}/api/v1/auth/login`,
        {
          email,
        },
        { withCredentials: true }
      );
      if (response.status === 200) {
        toast.success("Successfully signed up.");
        setIsLoggedInStateValue(true);
        setEmail("");
        navigate("/dashboard");
      } else {
        throw new Error("Something went wrong.");
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to login");
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
            Login
            <span className="text-base font-thin">
              Lorem, ipsum dolor sit amet.
            </span>
          </p>
          <div className="flex flex-col gap-4">
            <CustomInput
              value={email}
              name="email"
              changeHandler={(e: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(e.target.value);
              }}
              placeholder="Company Email"
              type="email"
            >
              <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            </CustomInput>
            <Button disabled={isLoading} onClick={submitHandler}>
              Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
