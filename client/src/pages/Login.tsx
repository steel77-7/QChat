import apiCall from "@/utils/apiCall";
import {
  Input,
  Button,
  Divider,
  Card,
  CardHeader,
  CardBody,
} from "@nextui-org/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const handleClick = async () => {

   const {data,status}= await apiCall({url:'user/login',method:"POST", reqData:{identifier:email,password}})
  if(status!==200){ 
    return toast.error(data.data)
  }
  navigate('/')
  };

  return (
    <>
      <div className="fixed h-full w-full flex justify-center items-center">
        <Card
          className="bg-transparent border border-purple-600 text-white shadow-xl"
          isBlurred
        >
          <CardHeader className="flex justify-center text-4xl bg-purple-800 rounded-t-lg py-4 bg-gradient-to-r from-purple-700 via-purple-800 to-purple-900">
            <h1>Login to Your Account</h1>
          </CardHeader>
          <CardBody className="p-6">
            <form
              action=""
              className="flex flex-col gap-6 justify-center items-center"
            >
              <Input
                label="Email"
                type="email"
                placeholder="Enter your email"
                fullWidth
                variant="bordered"
                className="text-white placeholder-purple-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                fullWidth
                variant="bordered"
                className="text-white placeholder-purple-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Divider className="my-4 border-purple-500" />
              <Button
                className="bg-purple-500 hover:bg-purple-600 w-full py-3 text-lg"
                onClick={handleClick}
              >
                Log In
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
