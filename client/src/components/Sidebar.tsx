import { House, PlusCircleIcon, Settings } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="w-14 border-r px-2 pt-4">
      <div className="flex flex-col gap-4">
        <a href="/dashboard">
          <House className="text-gray-500" />
        </a>
        <a href="/dashboard/create">
          <PlusCircleIcon className="text-gray-500" />
        </a>
        <a href="/settings">
          <Settings className="text-gray-500" />
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
