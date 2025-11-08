import { useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import { CreateContentModal } from "../components/CreateContentModal";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import Sidebar from "../components/Sidebar";
import { useContent } from "../hooks/useContent";

function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const contents = useContent();
  console.log(contents);
  

  return (
    <div>
      <Sidebar />
      <div className="pl-4 ml-72 min-h-screen bg-gray-100 border-2 border-gray-400">
        <CreateContentModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
          }}
        />
        <div className="bg-blue-100 text-black p-4 flex gap-4">
          <Button
            onClick={() => {
              setModalOpen(true);
            }}
            variant="primary"
            text="Add Content"
            startIcon={<PlusIcon />}
          />
          <Button
            variant="secondary"
            text="Share Brain"
            startIcon={<ShareIcon />}
          />
        </div>
        <div className="flex gap-4">
          {contents.map(({ type, title, link}) =>           (<Card
            title={title}
            link={link}
            type={type}
          />))}

        </div>
      </div>
    </div>
  );
}

export default Dashboard;
