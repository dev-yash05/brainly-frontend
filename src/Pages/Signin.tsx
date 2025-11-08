import { useRef } from "react";
import Button from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { useNavigate } from "react-router-dom";

export function Signin() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  async function signin(): Promise<void> {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    try {
      const response: any = await axios.post(BACKEND_URL + "/api/v1/signin", {
        username: username,
        password: password,
      });

      const jwt = response.data.token;
      localStorage.setItem("token", jwt);
      alert("Signin successful!");
      navigate("/dashboard");
    } catch (err: any) {
      console.log("Backend error:", err.response?.data);
    }
  }
  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white rounded border min-w-48">
        <Input placeholder="Username" ref={usernameRef} />
        <Input placeholder="Password" ref={passwordRef} />
        <div className="flex justify-center pb-2 pt-2 px-2">
          <Button
            onClick={signin}
            variant="primary"
            text="Signin"
            fullWidth={true}
          />
        </div>
      </div>
    </div>
  );
}
