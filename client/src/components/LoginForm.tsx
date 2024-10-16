import { Mail, PhoneCall, SquareUser, User } from "lucide-react";
import CustomInput from "./CustomInput";
import { Button } from "./ui/button";

const LoginForm = () => {
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
            <CustomInput placeholder="Name" type="text">
              <User className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            </CustomInput>
            <CustomInput placeholder="Phone no." type="text">
              <PhoneCall className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            </CustomInput>
            <CustomInput placeholder="Company Name" type="text">
              <User className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            </CustomInput>
            <CustomInput placeholder="Company Email" type="email">
              <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            </CustomInput>
            <CustomInput placeholder="Employee Size" type="number">
              <SquareUser className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            </CustomInput>
            <p className="text-center py-2 lg:px-8">
              By clicking on proceed you wil accept our{" "}
              <span className="text-blue-500">Terms</span> &{" "}
              <span className="text-blue-500">Conditions</span>
            </p>
            <Button>Signup</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
