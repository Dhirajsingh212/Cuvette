import { isLoggedIn } from "@/atoms/atom";
import CustomInput from "@/components/CustomInput";
import Sidebar from "@/components/Sidebar";
import { CircleCheck, Mail, PhoneCall } from "lucide-react";
import { useRecoilState } from "recoil";

const Settings = () => {
  const [isLoggedInState, setIsLoggedInState] = useRecoilState(isLoggedIn);

  if (!isLoggedInState) {
    return (
      <div className="pt-4 text-xl font-light text-gray-500">Loggin first</div>
    );
  }

  return (
    <div className="border-t flex flex-row">
      <Sidebar />
      <div className=" p-2 w-full overflow-y-scroll h-[89vh] no-scrollbar">
        <p className="text-xl font-semibold text-blue-500 pb-4">
          Check for verifications
        </p>
        <div className="flex flex-col gap-4 w-full max-w-lg mx-auto p-4 sm:p-8  border border-blue-500 shadow-xl rounded-lg ">
          <CustomInput
            name="companyEmail"
            value={""}
            changeHandler={() => {}}
            placeholder="Email"
            type="email"
          >
            <CircleCheck className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          </CustomInput>
          <CustomInput
            name="phoneNumber"
            value={""}
            changeHandler={() => {}}
            placeholder="Phone no."
            type="text"
          >
            <PhoneCall className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          </CustomInput>
        </div>
      </div>
    </div>
  );
};

export default Settings;
