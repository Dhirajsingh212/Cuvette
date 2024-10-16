import { BASE_URL } from "@/api";
import { isLoggedIn } from "@/atoms/atom";
import CustomInput from "@/components/CustomInput";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { CircleCheck, Mail, PhoneCall } from "lucide-react";
import { useEffect, useState } from "react";
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
            value={(verificationData && verificationData.companyEmail) || ""}
            changeHandler={() => {}}
            placeholder="Email"
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
          <CustomInput
            name="phoneNumber"
            value={(verificationData && verificationData.phoneNumber) || ""}
            changeHandler={() => {}}
            placeholder="Phone no."
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
          <Button>Verify</Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
