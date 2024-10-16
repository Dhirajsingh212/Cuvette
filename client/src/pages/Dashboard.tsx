import JobsCard from "@/components/JobsCard";
import Sidebar from "@/components/Sidebar";

const Dashboard = () => {
  return (
    <div className="border-t flex flex-row gap-2">
      <Sidebar />
      <div className=" p-2 w-full overflow-y-scroll h-[89vh] no-scrollbar">
        <p className="text-xl font-semibold text-blue-500 pb-4">Posted Jobs</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 100 }).map((_, index: number) => {
            return <JobsCard key={index} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
