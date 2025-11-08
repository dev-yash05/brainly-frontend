import { BrainIcon } from "../icons/BrainIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  return (
    <div className="h-screen bg-white border-r w-72 fixed top-0 left-0 pl-6">
        <div className="flex text-2xl items-center pt-8 pb-6 font-semibold ">
          <div className="text-purple-600 pr-2">
            <BrainIcon />
          </div>
          Brainly
        </div>
        <div className="pt-8 pl-4">
          <SidebarItem text="Twitter" icon={<TwitterIcon />} />
          <SidebarItem text="Youtube" icon={<YoutubeIcon />} />
        </div>

    </div>
  );
};

export default Sidebar;
