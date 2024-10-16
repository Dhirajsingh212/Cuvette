import { BASE_URL } from "@/api";
import { isLoggedIn } from "@/atoms/atom";
import axios from "axios";
import toast from "react-hot-toast";
import { useRecoilState } from "recoil";
import { Button } from "./ui/button";
import { useLocation } from "react-router-dom";

const Header = () => {
  const [isLoggedInState, setIsLoggedInState] = useRecoilState(isLoggedIn);
  const { pathname } = useLocation();

  return (
    <div className="flex flex-row justify-between items-center pb-2">
      <p className="text-4xl font-light text-gray-500">cuvette</p>
      <div className="flex flex-row gap-4 items-center ">
        <p className="font-light text-gray-500 text-xl">contact</p>
        {!isLoggedInState && (
          <a href={pathname === "/" ? "/login" : "/"}>
            <Button>{pathname === "/" ? "Log in" : "Sign up"}</Button>
          </a>
        )}
        {isLoggedInState && (
          <Button
            onClick={async () => {
              try {
                const response = await axios.post(
                  `${BASE_URL}/api/v1/auth/logout`,
                  {},
                  { withCredentials: true }
                );
                if (response.status === 200) {
                  toast.success("Logout successfully.");
                  setIsLoggedInState(false);
                } else {
                  toast.error("Failed to logout");
                }
              } catch (err) {
                toast.error("Something went wrong");
              }
            }}
          >
            Logout
          </Button>
        )}
      </div>
    </div>
  );
};

export default Header;
