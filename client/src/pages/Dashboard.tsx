import { BASE_URL } from "@/api";
import JobsCard from "@/components/JobsCard";
import Sidebar from "@/components/Sidebar";
import axios from "axios";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [jobData, setJobData] = useState([]);

  useEffect(() => {
    async function fetchJobData() {
      const response = await axios.get(`${BASE_URL}/api/v1/jobs/getAllJob`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setJobData(response.data.jobData);
      }
    }
    fetchJobData();
  }, []);

  return (
    <div className="border-t flex flex-row gap-2">
      <Sidebar />
      <div className=" p-2 w-full overflow-y-scroll h-[89vh] no-scrollbar">
        <p className="text-xl font-semibold text-blue-500 pb-4">Posted Jobs</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobData.map((job, index: number) => {
            return <JobsCard job={job} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
