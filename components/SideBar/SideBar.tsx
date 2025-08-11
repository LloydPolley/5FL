import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  Calendar,
  Gamepad2,
  Users,
  Plus,
  Settings,
  LogOut,
  User,
} from "lucide-react";

export default async function SideBar() {
  const createItems = [
    { href: "/create/season", label: "Season", icon: Calendar },
    { href: "/create/game", label: "Game", icon: Gamepad2 },
    { href: "/create/team", label: "Team", icon: Users },
  ];

  const manageItems = [
    { href: "/edit/season", label: "Season", icon: Calendar },
    { href: "/edit/game", label: "Game", icon: Gamepad2 },
    { href: "/edit/team", label: "Team", icon: Users },
  ];

  return (
    <div className="basis-1/4 h-fit">
      {/* Header */}
      <div className="pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-semibold text-slate-900 dark:text-white">
              Lloyd
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Admin</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Create Section */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Plus className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wide">
              Create/Edit
            </p>
          </div>
          <Separator className="mb-3" />
          <div className="space-y-1">
            {createItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link key={item.href} href={item.href}>
                  <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-all duration-200 group cursor-pointer">
                    <IconComponent className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Manage Section */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Settings className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wide">
              Manage
            </p>
          </div>
          <Separator className="mb-3" />
          <div className="space-y-1">
            {manageItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link key={item.href} href={item.href}>
                  <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-all duration-200 group cursor-pointer">
                    <IconComponent className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <div className="pt-4">
        <Button
          variant="destructive"
          className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 border-none shadow-md hover:shadow-lg transition-all duration-200"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
}
