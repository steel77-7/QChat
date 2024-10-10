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

export default function Signup() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
const navigate = useNavigate()

  //sending request
  const handleClick = async (e: any) => {
    e.preventDefault();
    

    if (password !== cpassword) return toast.error("Passwords do not match");
console.log(import.meta.env)
    try {
      const {data} = await apiCall({
        url: "user/register",
        method: "POST",
        reqData: { username, email, password },
      });

      if(!data) {
        return toast.error("Error occured while registration");
      }
      console.table(data)
       toast.success(data)
       navigate('/')
    } catch (error) {
        console.error(error)
    }
  };


  return (
    <>
      <div className="fixed h-full w-full flex justify-center items-center  ">
        <Card
          className="bg-transparent border border-purple-500 text-white shadow-xl"
          isBlurred
        >
          <CardHeader className="flex justify-center text-4xl bg-purple-600 rounded-t-lg py-4 bg-gradient-to-r from-purple-700 via-purple-800 to-purple-900">
            <h1>Create an Account</h1>
          </CardHeader>
          <CardBody className="p-6">
            <form
              action=""
              className="flex flex-col gap-6 justify-center items-center"
            >
              <Input
                label="Username"
                type="text"
                placeholder="Enter your username"
                fullWidth
                variant="bordered"
                className=" text-white  placeholder-purple-300"
                size={"lg"}
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
              <Input
                label="Email"
                type="email"
                placeholder="Enter your email"
                fullWidth
                variant="bordered"
                className=" text-white placeholder-purple-300"
                size={"lg"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                fullWidth
                variant="bordered"
                className=" text-white placeholder-purple-300"
                size={"lg"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Input
                label="Confirm Password"
                type="password"
                placeholder="Confirm your password"
                fullWidth
                variant="bordered"
                className=" text-white placeholder-purple-300"
                size={"lg"}
                value={cpassword}
                onChange={(e) => setCPassword(e.target.value)}
              />
              <Divider className="my-4 border-purple-500" />
              <Button
                type="submit"
                className="bg-purple-500 hover:bg-purple-600 w-full py-3 text-lg"
                onClick={handleClick}
              >
                Sign Up
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
