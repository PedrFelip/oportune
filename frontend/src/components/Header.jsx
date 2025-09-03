import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Search } from "lucide-react";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md">
      <div className="flex items-center space-x-4">
        <img
          src="/src/assets/logo_oportune.png"
          alt="Oportune"
          className="h-10"
        />
      </div>
      <div className="flex items-center justify-center flex-1 px-4">
        <div className="relative w-full max-w-lg">
          <Input
            type="search"
            placeholder="Buscar vagas..."
            className="pl-10"
          />
          <Search className="absolute w-5 h-5 text-gray-500 left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        {/* <Button variant="ghost" size="icon">
            <Bell className="w-6 h-6" />
          </Button> */}
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
