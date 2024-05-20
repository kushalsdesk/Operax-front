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
} from "@nextui-org/react";
import { signIn, auth } from "@/services/firebase.service";
import { User, onAuthStateChanged, signOut } from "firebase/auth";
import { useUserStore } from "@/utils/store";
import axios from "redaxios";

interface userPropes {
  isLoggedIn: boolean;
}
const Login: React.FC<userPropes> = ({ isLoggedIn }) => {
  const router = useRouter();
  const [image, setImage] = useState<string | undefined>(undefined);
  const [email, setEmail] = useState<string | null>(null);

  const isSignedIn = () => {
    onAuthStateChanged(auth, async (user: User | null) => {
      if (user) {
        //
        localStorage.setItem("LoggedIn", "true");
        setEmail(user.email);
        //
        const cachedImage = localStorage.getItem("userImage");
        //
        if (cachedImage) {
          setImage(cachedImage);
        } else {
          const apiUrl = "https://operax.cyclic.cloud/api/user/";
          //const apiUrl = "http://localhost:8080/api/user/";
          const response = await axios.get(apiUrl + user.email);
          //
          if (response) {
            setImage(response.data.photoUrl);
            localStorage.setItem("userImage", response.data.photoUrl);
          }
        }
      } else {
        localStorage.removeItem("LoggedIn");
        localStorage.removeItem("userImage");
        router.push("/");
      }
    });
  };

  useEffect(() => {
    isSignedIn();
  });

  const handleSignIn = async () => {
    try {
      const user = await signIn();

      const requestObj = {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      };
      const apiUrl = "https://operax.cyclic.cloud/api/user/";
      //const apiUrl = "http://localhost:8080/api/user";
      //
      const response = await axios.post(apiUrl, requestObj);
      //
      setImage(response.data.photoUrl);
      setEmail(response.data.email);
      localStorage.setItem("userImage", response.data.photoUrl);
      localStorage.setItem("LoggedIn", "true");
      window.location.reload();
    } catch (err) {
      console.log("Error While Signing In", err);
      throw new Error();
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    localStorage.removeItem("LoggedIn");
    localStorage.removeItem("userImage");
    setImage(undefined);
  };
  return (
    <>
      {isLoggedIn ? (
        <div className="flex items-center justify-center gap-4 ">
          <Dropdown backdrop="blur">
            <DropdownTrigger>
              <Avatar as="button" radius="md" size="md" src={image} />
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem key="library" color="primary">
                <Button
                  className="w-full"
                  radius="sm"
                  size="sm"
                  variant="light"
                  onPress={(e) => {
                    router.push(`/collection/${email}`);
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
                  onPress={() => {
                    handleSignOut();
                    window.location.reload();
                  }}
                >
                  Sign Out
                </Button>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      ) : (
        <Button
          className={`font-semibold leading-6`}
          variant="light"
          size="md"
          onPress={() => {
            handleSignIn();
          }}
        >
          Log in <span aria-hidden="true">&rarr;</span>
        </Button>
      )}
    </>
  );
};

export default Login;
