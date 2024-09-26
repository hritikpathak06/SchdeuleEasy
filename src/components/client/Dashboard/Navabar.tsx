"use client";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Boxes,
  BoxIcon,
  BuildingIcon,
  CircleUser,
  GroupIcon,
  Home,
  Layers3,
  LineChart,
  Menu,
  MoonIcon,
  Package,
  Package2,
  Phone,
  Search,
  ShoppingCart,
  SunIcon,
  User,
  Users,
  UsersIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";


const Navbar = () => {
  const pathname = usePathname();


  const router = useRouter();


  return (
    <header className="flex md:w-[100%] md:ml-auto h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 sticky top-0 z-50">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col  w-[300px]">
          <nav className="grid gap-2 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              {/* <Image src="/logo.jpg" alt="Qtee.Ai" width="40" height="20" /> */}
              <Image
                src="/Qtee.ai-preview.png"
                alt="Logo"
                width={100}
                height={40}
                // className={theme === 'dark' ? 'invert' : ''}
                className="invert"
              />
              {/* <span className="text-white">Qtee.Ai</span> */}
            </Link>
            <Link
              href={`/dashboard`}
              className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 
              ${
                pathname.includes("dashboard")
                  ? "bg-muted text-primary"
                  : " text-muted-foreground"
              }
              hover:text-foreground`}
            >
              <LineChart className="h-5 w-5" />
              Dashboard
            </Link>
            {/* <Link
              href="/analysis"
              className={`mx-[-0.65rem] flex items-center gap-4
              ${
                pathname.includes("analysis")
                  ? "bg-muted text-primary"
                  : "text-muted-foreground"
              } 
              rounded-xl px-3 py-2  hover:text-foreground`}
            >
              <BuildingIcon className="h-5 w-5" />
              Analysis
            </Link> */}
            <Link
              href="/product"
              className={`mx-[-0.65rem] flex items-center gap-4
              ${
                pathname.includes("product")
                  ? "bg-muted text-primary"
                  : "text-muted-foreground"
              } 
              rounded-xl px-3 py-2  hover:text-foreground`}
            >
              <BoxIcon className="h-5 w-5" />
              Product
            </Link>
            <Link
              href="/parameters"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                pathname.includes("parameters")
                  ? "bg-muted text-primary"
                  : "text-muted-foreground"
              }  transition-all hover:text-primary`}
            >
              <Layers3 className="h-4 w-4" />
              Parameters
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1">
        {/* <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
            />
          </div>
        </form> */}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator /> */}
          <DropdownMenuItem className="cursor-pointer" >Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* <Button onClick={toggleTheme} className=" rounded-full">
        {theme === "light" ? (
          <SunIcon className=" h-5 w-5" />
        ) : (
          <MoonIcon className=" h-5 w-5" />
        )}
      </Button> */}
    </header>
  );
};

export default Navbar;
