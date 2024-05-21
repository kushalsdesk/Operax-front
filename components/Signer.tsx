
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  user,
} from "@nextui-org/react";
import { signIn, auth } from "@/services/firebase.service";
import { signOut } from "firebase/auth";
import axios from "redaxios";
import useUserStore from "@/store/user.store";


export const LoginButton: React.FC = () => {
  const { loginStatus } = useUserStore();

  const handleSignIn = async () => {
    try {
      const currUser = await signIn(); // Replace with your actual sign-in logic
      if (currUser) {
        loginStatus({
          firstName: currUser?.displayName?.split(' ')[0] || "",
          avatarImg: currUser?.photoURL || "",
          emailId: currUser?.email || "",
        })
      }
    } catch (error) {
      console.error("Error signing in:", error);
      // Handle sign-in error gracefully (e.g., display an error message)
    }
  }

  return (
    <>
      <Button
        className={`font-semibold leading-6`}
        variant="light"
        size="md"
        onPress={(e) => {
          handleSignIn()
        }}
      >
        Sign in <span aria-hidden="true">&rarr;</span>
      </Button>
    </>
  );
};


export const UserProfile: React.FC = () => {
  const router = useRouter();
  const { user, isLoggedIn, logoutStatus } = useUserStore();

  useEffect(() => {
    return () => { };
  }, [isLoggedIn]);

  const handleSignOut = async () => {
    await signOut(auth);
    logoutStatus();
  }

  return (
    <>
      <div className="flex items-center justify-center gap-4 ">
        <Dropdown backdrop="blur">
          <DropdownTrigger>
            <Avatar as="button" radius="md" size="md" src={user?.avatarImg} />
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem key="library" color="primary">
              <Button
                className="w-full"
                radius="sm"
                size="sm"
                variant="light"
                onPress={(e) => {
                  router.push(`/collection/${user?.emailId}`);
                }}
              >
                My Collection
              </Button>
            </DropdownItem>
            <DropdownItem key="signout" color="danger">
              <Button
                className="w-full"
                radius="sm"
                size="sm"
                variant="light"
                onPress={(e) => handleSignOut()}
              >
                Sign Out
              </Button>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div >
    </>
  );
};


