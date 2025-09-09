import { Link, useLocation } from "react-router-dom";
import {
  HouseIcon,
  InfoIcon,
  StarIcon,
  HelpCircleIcon,
  PhoneIcon,
  UserIcon,
  MenuIcon,
  LogOutIcon,
  Wallet2Icon,
  AlignStartVertical,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetMyProfileQuery } from "@/redux/api/userApi";
import { authApi, useLogoutUserMutation } from "@/redux/api/authApi";
import { Skeleton } from "@/components/ui/skeleton";
import { useDispatch } from "react-redux";
import { handleApiError } from "@/utils/handleApiError";
import { toast } from "react-toastify";
import { getDashboardPath } from "@/utils/getDashboardPath";
import { ModeToggle } from "./ModeToggler";
import { motion } from "framer-motion";

const navigationLinks = [
  { href: "/", label: "হোম", icon: HouseIcon },
  { href: "/about", label: "আমাদের সম্পর্কে", icon: InfoIcon },
  { href: "/projects", label: "ফ্ল্যাটসমূহ", icon: StarIcon },
  // { href: "/pricing", label: "উইশলিস্ট", icon: DollarSignIcon },
  { href: "/faq", label: "প্রশ্নোত্তর", icon: HelpCircleIcon },
  { href: "/contact", label: "যোগাযোগ", icon: PhoneIcon },
];

export default function Navbar() {
  const { data: profileData, isLoading } = useGetMyProfileQuery();
  const [logout] = useLogoutUserMutation();
  const dispatch = useDispatch();
  const location = useLocation();
  const userData = profileData?.data?.data;

  const isAuthenticated = !!userData;

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(authApi.util.resetApiState());
      toast.error("Logout successfully!");
    } catch (err) {
      console.error("Failed to logout:", err);
      handleApiError(err);
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full border-b border-border bg-background/95 backdrop-blur-sm text-foreground z-50 px-4 md:px-6"
    >
      <div className="flex h-16 items-center justify-between gap-4 max-w-7xl mx-auto">
        {/* Left: Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2"
        >
          <Link
            to="/"
            className="text-xl font-bold flex items-center gap-2 relative group"
            style={{ color: "var(--primary)" }}
          >
            {/* Animated gradient border container */}
            <motion.div
              whileHover={{
                rotate: 5,
                scale: 1.1,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 15,
              }}
              className="relative p-0.5 rounded-lg bg-gradient-to-r from-primary via-teal-500 to-teal-500 background-animate"
            >
              {/* Main logo container */}
              <motion.div
                initial={{ scale: 1 }}
                animate={{
                  scale: [1, 1.02, 1],
                  boxShadow: [
                    "0 0 0px rgba(230, 0, 118, 0)",
                    "0 0 15px rgba(230, 0, 118, 0.3)",
                    "0 0 0px rgba(230, 0, 118, 0)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 5,
                }}
                className="w-10 h-10 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-bold relative overflow-hidden"
              >
                {/* Subtle background shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                />

                {/* DW text with subtle bounce */}
                <motion.span
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 7 }}
                  className="relative z-10 flex items-center space-x-2"
                >
                  <span>SN</span>
                  {/* <img
                    src="/public/logo.png" // React automatically serves this from public/
                    alt="logo"
                    className="w-6 h-6 md:w-8 md:h-8" // adjust size as needed
                  /> */}
                </motion.span>
              </motion.div>
            </motion.div>

            {/* Text with gradient animation */}
            <motion.span
              className="hidden sm:inline-block bg-gradient-to-r from-primary to-teal-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{
                scale: 1.05,
                backgroundImage:
                  "linear-gradient(to right, var(--primary), #0d9488, var(--primary))",
                transition: { duration: 0.3 },
              }}
            >
              স্বপ্ননীড়
            </motion.span>

            {/* Subtle pulsing dot indicator */}
            <motion.div
              className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
              }}
            />
          </Link>
        </motion.div>

        {/* Middle: Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="gap-1">
            {navigationLinks.map((link, index) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.href;

              return (
                <NavigationMenuItem key={index}>
                  <NavigationMenuLink asChild>
                    <Link
                      to={link.href}
                      className={`relative flex items-center gap-2 px-3 py-2 font-medium transition-colors rounded-md ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      <motion.div
                        whileHover={{ y: -2 }}
                        whileTap={{ y: 0 }}
                        className="flex items-center gap-2"
                      >
                        {Icon && (
                          <Icon
                            size={16}
                            className={
                              isActive
                                ? "text-primary-foreground"
                                : "text-muted-foreground"
                            }
                          />
                        )}
                        {link.label}
                      </motion.div>

                      {isActive && (
                        <motion.div
                          layoutId="navbar-indicator"
                          className="absolute inset-0 bg-primary rounded-md -z-10"
                          initial={false}
                          transition={{
                            type: "spring",
                            bounce: 0.2,
                            duration: 0.6,
                          }}
                        />
                      )}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right: Auth Section */}
        <div className="flex items-center gap-2">
          {isLoading ? (
            <div className="flex items-center gap-4">
              <Skeleton className="h-8 w-20 rounded-md bg-muted" />
              <Skeleton className="h-8 w-20 rounded-md bg-muted" />
            </div>
          ) : !isAuthenticated ? (
            <>
              <Link to="/login">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button variant="ghost" className="text-foreground ">
                    লগইন
                  </Button>
                </motion.div>
              </Link>
              <Link to="/signup">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    সাইন আপ
                  </Button>
                </motion.div>
              </Link>
              <ModeToggle />
            </>
          ) : (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-none">
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Avatar className="border border-border cursor-pointer hover:border-primary transition-colors">
                      <AvatarImage
                        src={
                          userData.profilePhoto ||
                          "https://via.placeholder.com/40"
                        }
                        alt={userData.name}
                      />
                      <AvatarFallback className="bg-muted">
                        <UserIcon className="text-muted-foreground" size={18} />
                      </AvatarFallback>
                    </Avatar>
                  </motion.div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="bg-card text-card-foreground border-border w-56"
                >
                  <DropdownMenuLabel className="flex flex-col p-4">
                    <span className="font-semibold">{userData.name}</span>
                    <span className="text-sm text-muted-foreground font-normal">
                      {userData.email}
                    </span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-border" />
                  {userData && (
                    <>
                      <DropdownMenuItem
                        asChild
                        className="cursor-pointer focus:bg-secondary focus:text-foreground"
                      >
                        <Link
                          to={getDashboardPath(userData.role)}
                          className="flex items-center gap-2"
                        >
                          <AlignStartVertical size={16} />
                          Dashboard
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}

                  <DropdownMenuItem
                    asChild
                    className="cursor-pointer focus:bg-secondary focus:text-foreground"
                  >
                    <Link to="/wallet" className="flex items-center gap-2">
                      <Wallet2Icon size={16} />
                      Wallet
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-border" />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer text-destructive focus:bg-secondary focus:text-destructive"
                  >
                    <LogOutIcon size={16} className="mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <ModeToggle />
            </>
          )}
        </div>

        {/* Mobile Menu (Hamburger) */}
        <div className="md:hidden z-20">
          <Popover>
            <PopoverTrigger asChild>
              <motion.div whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-foreground hover:text-primary hover:bg-secondary"
                >
                  <MenuIcon size={20} />
                </Button>
              </motion.div>
            </PopoverTrigger>
            <PopoverContent
              align="end"
              className="w-56 bg-card p-3 rounded-lg border-border"
            >
              <div className="flex flex-col gap-2">
                {navigationLinks.map((link, index) => {
                  const Icon = link.icon;
                  const isActive = location.pathname === link.href;

                  return (
                    <Link
                      key={index}
                      to={link.href}
                      className={`flex items-center gap-2 px-3 py-2 transition-colors rounded-md ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-foreground hover:text-primary hover:bg-secondary"
                      }`}
                    >
                      {Icon && (
                        <Icon
                          size={16}
                          className={
                            isActive
                              ? "text-primary-foreground"
                              : "text-muted-foreground"
                          }
                        />
                      )}
                      {link.label}
                    </Link>
                  );
                })}

                <div className="border-t border-border my-2"></div>

                {isLoading ? (
                  <div className="flex flex-col gap-2 p-2">
                    <Skeleton className="h-8 w-full rounded-md bg-muted" />
                    <Skeleton className="h-8 w-full rounded-md bg-muted" />
                  </div>
                ) : !isAuthenticated ? (
                  <div className="flex flex-col gap-2">
                    <Link to="/login">
                      <Button
                        variant="link"
                        className="w-full border-border hover:bg-secondary"
                      >
                        লগইন
                      </Button>
                    </Link>
                    <Link to="/signup">
                      <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                        সাইন আপ
                      </Button>
                    </Link>
                    <ModeToggle />
                  </div>
                ) : (
                  <>
                    <div className="px-3 py-2 text-sm text-muted-foreground">
                      লগইন in as {userData.name}
                    </div>
                    <Link
                      to={getDashboardPath(userData.role)}
                      className="flex items-center gap-2 px-3 py-2 text-foreground hover:text-primary transition-colors rounded-md hover:bg-secondary"
                    >
                      <AlignStartVertical
                        size={16}
                        className="text-muted-foreground"
                      />
                      Dashboard
                    </Link>
                    <Link
                      to="/wallet"
                      className="flex items-center gap-2 px-3 py-2 text-foreground hover:text-primary transition-colors rounded-md hover:bg-secondary"
                    >
                      <Wallet2Icon
                        size={16}
                        className="text-muted-foreground"
                      />
                      Wallet
                    </Link>
                    <ModeToggle />

                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-3 py-2 text-destructive hover:text-destructive/80 transition-colors rounded-md hover:bg-secondary text-left"
                    >
                      <LogOutIcon size={16} className="text-muted-foreground" />
                      Logout
                    </button>
                  </>
                )}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </motion.header>
  );
}
