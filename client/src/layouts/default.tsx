import { Link } from "@nextui-org/link";

import { Navbar } from "@/components/navbar";
import { Toaster } from "sonner";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (

    <div className=" flex flex-col h-screen ">
      <Toaster/>
      <main className="  px-6 flex-grow pt-16">
        {children}
      </main>
      <footer className="w-full flex items-center justify-center py-3">
        Link to github
      </footer>
    </div>
  );
}
