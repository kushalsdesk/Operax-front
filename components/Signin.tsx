"use client";

import React, { useEffect, useState } from "react";
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
import { useUserStore } from "@/store/user.store";

const { isLoggedIn } = useUserStore.getState();

const handleSignIn = async () => {
  await signIn();
}
export const Signer: React.FC = () => {

  return (
    <div
      className={`lg:flex lg:flex-1 lg:justify-end md:flex cursor-pointer flex `}
    >
      {isLoggedIn ? <UserProfile /> : <LoginButton />}
    </div>
  )
}
export const LoginButton: React.FC = () => {
  return (
    <>
      <Button
        className={`font-semibold leading-6`}
        variant="light"
        size="md"
        onPress={async () => {
          await signIn();
        }}
      >
        Log in <span aria-hidden="true">&rarr;</span>
      </Button>
    </>
  );
};

export const UserProfile: React.FC = () => {
  const { user, loginStatus } = useUserStore();
  const router = useRouter();
  return (
    <>
      <div className="flex items-center justify-center gap-4 ">
        <Dropdown backdrop="blur">
          <DropdownTrigger>
            <Avatar as="button" radius="md" size="md" src={user?.photoUrl} />
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem key="library" color="primary">
              <Button
                className="w-full"
                radius="sm"
                size="sm"
                variant="light"
                onPress={(e) => {
                  router.push(`/collection/${user?.firstName}`);
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
                onPress={(e) => handleSignIn()
                }
              >
                Sign Out
              </Button>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </>
  );
};



