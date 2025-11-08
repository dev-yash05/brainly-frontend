import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import Button from "./Button";
import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URL } from "../../config";

enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
}

//Controlled Component
export function CreateContentModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [type, setType]: any = useState(ContentType.Youtube);

  async function addContent() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;

    await axios.post(BACKEND_URL + "/api/v1/content", {
      title: title,
      link: link,
      type: type,
    }, {
    headers: {
      "Authorization": localStorage.getItem("token"),
    },
    } );
  }

  return (
    <div>
      {open && (
        <div className="w-screen h-screen bg-black/60 fixed top-0 left-0  flex justify-center">
          <div className="flex flex-col justify-center">
            <span className="bg-white opacity-100 p-4 rounded">
              <div className="flex justify-end pb-2">
                <div onClick={onClose} className="cursor-pointer">
                  <CrossIcon />
                </div>
              </div>
              <div>
                <Input ref={titleRef} placeholder={"Title"} />
                <Input ref={linkRef} placeholder={"Link"} />
              </div>
              <div>
                <h1>Type</h1>
                <div className="flex justify-center gap-1 p-4">
                  <Button
                    text="Youtube"
                    variant={
                      type === ContentType.Youtube ? "primary" : "secondary"
                    }
                    onClick={() => {
                      setType(ContentType.Youtube);
                    }}
                  />
                  <Button
                    text="Twitter"
                    variant={
                      type === ContentType.Twitter ? "primary" : "secondary"
                    }
                    onClick={() => {
                      setType(ContentType.Twitter);
                    }}
                  />
                </div>
              </div>
              <div className="flex justify-center">
                <Button variant="primary" text="Submit" onClick={addContent} />
              </div>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
