import { useRef } from "react";
import Button from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { useNavigate } from "react-router-dom";

export function Signup() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  function signup(): any {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;



    try {
    const response: any = axios.post(BACKEND_URL + "/api/v1/signup", {
      username: username,
      password: password,
    });
    console.log(response);
    if(response.status === 201){
      navigate("/signin");
    }

    } catch (err: any) {
      console.log("Backend error:", err.response?.data);
    }

    alert("Signup successful!");

  }
  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white rounded min-w-48 px-8 py-8 shadow-2xl">
        <div className="text-2xl font-semibold text-center pb-3 text-gray-700">Signup</div>
        <Input placeholder="Username" ref={usernameRef} />
        <Input placeholder="Password" ref={passwordRef} />
        <div className="flex justify-center pb-2 pt-2 px-2">
          <Button
            onClick={signup}
            variant="primary"
            text="Signup"
            fullWidth={true}
          />
        </div>
      </div>
    </div>
  );
}
