import { BASE_URL } from "@/api";
import { isLoggedIn } from "@/atoms/atom";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { format } from "date-fns";
import { X } from "lucide-react";
import { ChangeEvent, KeyboardEvent, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useRecoilState } from "recoil";

interface Form {
  title: string;
  description: string;
  experience: string;
  emails: string[];
  date: string;
}

const CreateJob = () => {
  const [formData, setFormData] = useState<Form>({
    title: "",
    description: "",
    experience: "",
    emails: [],
    date: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const validateEmails = (emails: string[]) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emails.every((email) => emailPattern.test(email));
  };

  const validateForm = () => {
    const { title, description, experience, emails, date } = formData;

    if (!title.trim()) {
      toast.error("Title is required.");
      return false;
    }

    if (title.length > 100) {
      toast.error("Title must be less than 100 characters.");
      return false;
    }

    if (!description.trim()) {
      toast.error("Description is required.");
      return false;
    }

    if (description.length > 500) {
      toast.error("Description must be less than 500 characters.");
      return false;
    }

    if (!experience.trim()) {
      toast.error("Experience is required.");
      return false;
    }

    if (emails.length === 0) {
      toast.error("At least one email is required.");
      return false;
    }

    if (!validateEmails(emails)) {
      toast.error("One or more emails are invalid.");
      return false;
    }

    if (!date) {
      toast.error("Date is required.");
      return false;
    }

    const today = new Date();
    const selectedDate = new Date(date);
    if (selectedDate < today) {
      toast.error("Date cannot be in the past.");
      return false;
    }

    return true;
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/jobs/create`,
        {
          ...formData,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        toast.success("Successfully posted");
        setFormData({
          title: "",
          description: "",
          experience: "",
          emails: [],
          date: "",
        });
      } else {
        toast.error("Failed to post");
      }
    } catch (err: any) {
      const msg = err.response.data.message;
      toast.error(`${msg}`);
    } finally {
      setIsLoading(false);
    }
  };

  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addEmail();
    } else if (
      e.key === "Backspace" &&
      inputValue === "" &&
      formData.emails.length > 0
    ) {
      removeEmail(formData.emails[formData.emails.length - 1]);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const addEmail = () => {
    const email = inputValue.trim().replace(/,+$/, "");
    if (email && !formData.emails.includes(email) && isValidEmail(email)) {
      setFormData((prev) => {
        return {
          ...prev,
          emails: [...prev.emails, email],
        };
      });
      setInputValue("");
    }
  };

  const removeEmail = (emailToRemove: string) => {
    setFormData((prev) => {
      return {
        ...prev,
        emails: formData.emails.filter((email) => email !== emailToRemove),
      };
    });
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const [isLoggedInState, _] = useRecoilState(isLoggedIn);

  if (!isLoggedInState) {
    return (
      <div className="flex flex-row justify-start pt-6 text-2xl font-light text-gray-500">
        Login first
      </div>
    );
  }

  return (
    <div className="border-t flex flex-row gap-2">
      <Sidebar />
      <div className=" p-2 w-full overflow-y-scroll h-[89vh] no-scrollbar">
        <p className="text-xl font-semibold text-blue-500 pb-4">Create Jobs</p>
        <div className="w-full max-w-lg mx-auto p-4 sm:p-8  border border-blue-500 shadow-xl rounded-lg ">
          <form onSubmit={submitHandler} className="space-y-4">
            <div className="sm:flex sm:items-center">
              <label
                htmlFor="jobTitle"
                className="block mb-1 sm:mb-0 sm:w-1/3 sm:text-right sm:pr-4"
              >
                Job Title
              </label>
              <div className="sm:w-2/3">
                <Input
                  id="jobTitle"
                  placeholder="Enter Job Title"
                  className="w-full"
                  value={formData.title}
                  name="title"
                  onChange={changeHandler}
                />
              </div>
            </div>

            <div className="sm:flex sm:items-start">
              <label
                htmlFor="jobDescription"
                className="block mb-1 sm:mb-0 sm:w-1/3 sm:text-right sm:pr-4 sm:pt-2"
              >
                Job Description
              </label>
              <div className="sm:w-2/3">
                <Textarea
                  id="jobDescription"
                  placeholder="Enter Job Description"
                  className="w-full"
                  rows={4}
                  name="description"
                  value={formData.description}
                  onChange={(e) => {
                    setFormData((prev) => {
                      return {
                        ...prev,
                        description: e.target.value,
                      };
                    });
                  }}
                />
              </div>
            </div>

            <div className="sm:flex sm:items-center">
              <label
                htmlFor="experienceLevel"
                className="block mb-1 sm:mb-0 sm:w-1/3 sm:text-right sm:pr-4"
              >
                Experience Level
              </label>
              <div className="sm:w-2/3">
                <Select
                  value={formData.experience}
                  onValueChange={(e) => {
                    setFormData((prev) => {
                      return {
                        ...prev,
                        experience: e,
                      };
                    });
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Experience Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entry">Entry Level</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="senior">Senior</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-start flex-col sm:flex-row ">
              <label
                htmlFor="addCandidate"
                className="w-full sm:w-1/3 text-start sm:text-right pr-4 text-sm font-medium text-gray-700"
              >
                Add Candidate
              </label>
              <div className="w-full sm:w-2/3 relative">
                <div className="flex flex-wrap items-center gap-1 p-2 border rounded-md bg-white">
                  {formData.emails.map((email, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-gray-100 text-gray-800 text-xs rounded-full px-2 py-1"
                    >
                      <span>{email}</span>
                      <button
                        onClick={() => removeEmail(email)}
                        className="ml-1 text-gray-500 hover:text-gray-700 focus:outline-none"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                  <Input
                    id="addCandidate"
                    type="text"
                    placeholder={
                      formData.emails.length === 0 ? "xyz@gmail.com" : ""
                    }
                    className="flex-grow border-none shadow-none focus:ring-0 p-0 text-sm"
                    ref={inputRef}
                    value={inputValue}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    onBlur={addEmail}
                  />
                </div>
              </div>
            </div>

            <div className="sm:flex sm:items-center">
              <label
                htmlFor="endDate"
                className="block mb-1 sm:mb-0 sm:w-1/3 sm:text-right sm:pr-4"
              >
                End Date
              </label>
              <div className="sm:w-2/3">
                <Input
                  id="endDate"
                  type="date"
                  className="w-full"
                  value={
                    formData.date ? format(formData.date, "yyyy-MM-dd") : ""
                  }
                  onChange={(e) =>
                    setFormData((prev) => {
                      return {
                        ...prev,
                        date: e.target.value,
                      };
                    })
                  }
                />
              </div>
            </div>

            <div className="mt-6 sm:flex sm:justify-end">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white"
              >
                Send
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateJob;
