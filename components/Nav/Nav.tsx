import {
  Settings,
  Plus,
  ScanFace,
  Volleyball,
  PanelsTopLeft,
  User,
  LogOut,
  Calendar,
  Trophy,
} from "lucide-react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";

// Navigation menu data
const createMenuItems = [
  {
    href: "/create/game",
    icon: Volleyball,
    title: "Create Game",
    description: "Set up a new Football game",
  },
  {
    href: "/create/team",
    icon: ScanFace,
    title: "Create Team",
    description: "Form a new Football team",
  },
];

const accountMenuItems = [
  {
    href: "/settings",
    icon: Settings,
    title: "Settings",
    description: "Manage your account preferences",
  },
  {
    href: "/profile",
    icon: ScanFace,
    title: "Profile",
    description: "View and edit your profile",
  },
  {
    href: "/logout",
    icon: LogOut,
    title: "Sign Out",
    description: "Sign out of your account",
  },
];

export default async function Nav() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: teamData } = await supabase
    .from("teams")
    .select("*, seasons(*)")
    .eq("manager", user?.id)
    .single();

  console.log("teamData", teamData);

  return (
    <nav className="z-50 px-3 sm:px-5 py-3 bg-card bg-opacity-80 backdrop-blur-sm sticky top-0 w-full mx-auto border-b">
      <div className="max-w-7xl px-2 sm:px-4 py-2 mx-auto flex items-center">
        <Link href="/" className="mr-3 sm:mr-6">
          <Volleyball className="h-6 w-6" />
        </Link>

        <NavigationMenu>
          <NavigationMenuList className="space-x-1 sm:space-x-2">
            {user ? (
              <>
                {/* Dashboard Link */}
                <NavigationMenuItem>
                  <Link
                    href={`/team/${teamData?.id}?season_id=${teamData?.seasons?.[0]?.id}`}
                    legacyBehavior
                    passHref
                  >
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "px-2 sm:px-4"
                      )}
                    >
                      <PanelsTopLeft className="h-4 w-4 sm:mr-2" />
                      <span className="hidden sm:inline">Dashboard</span>
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                {/* Create Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="px-2 sm:px-4">
                    <Plus className="h-4 w-4 sm:mr-2" />
                    <span className="hidden sm:inline">Create</span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[200px] p-4 bg-card/95 backdrop-blur-sm border rounded-lg shadow-md">
                      <div className="grid gap-3">
                        {createMenuItems.map((item) => {
                          const IconComponent = item.icon;
                          return (
                            <NavigationMenuLink key={item.href} asChild>
                              <Link
                                href={item.href}
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-card/80 hover:text-foreground focus:bg-card/80 focus:text-foreground bg-transparent"
                              >
                                <div className="flex items-center">
                                  <IconComponent className="mr-2 h-4 w-4" />
                                  <div className="text-sm font-medium leading-none">
                                    {item.title}
                                  </div>
                                </div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  {item.description}
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          );
                        })}
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Account Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="px-2 sm:px-4">
                    <User className="h-4 w-4 sm:mr-2" />
                    <span className="hidden sm:inline">Account</span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[200px] p-4 bg-card/95 backdrop-blur-sm border rounded-lg shadow-md">
                      <div className="grid gap-3">
                        {accountMenuItems.map((item) => {
                          const IconComponent = item.icon;
                          return (
                            <NavigationMenuLink key={item.href} asChild>
                              <Link
                                href={item.href}
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-card/80 hover:text-foreground focus:bg-card/80 focus:text-foreground bg-transparent"
                              >
                                <div className="flex items-center">
                                  <IconComponent className="mr-2 h-4 w-4" />
                                  <div className="text-sm font-medium leading-none">
                                    {item.title}
                                  </div>
                                </div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  {item.description}
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          );
                        })}
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </>
            ) : (
              <NavigationMenuItem>
                <Link href="/login" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(navigationMenuTriggerStyle(), "px-2 sm:px-4")}
                  >
                    <User className="h-4 w-4 sm:mr-2" />
                    <span className="hidden sm:inline">Account</span>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
}
