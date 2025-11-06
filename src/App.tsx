import { useState } from "react";
import Button from "./components/Button";
import Card from "./components/Card";
import { CreateContentModal } from "./components/CreateContentModal";
import { PlusIcon } from "./icons/PlusIcon";
import { ShareIcon } from "./icons/ShareIcon";
import Sidebar from "./components/Sidebar";

function App() {
  const [modalOpen, setModalOpen] = useState(false);

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
          <Card
            title="Twitter post"
            link="https://x.com/DilumSanjaya/status/1984665204840632681"
            type="twitter"
          />
          <Card
            title="YouTube video"
            link="https://www.youtube.com/watch?v=5E6wCa7_xcc"
            type="youtube"
          />
          <Card
            title="Youtube Video"
            link="https://youtu.be/7kf1SACqlRw?si=GBraY4pqv_4V8krd"
            type="youtube"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
