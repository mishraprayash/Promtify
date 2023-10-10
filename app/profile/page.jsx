"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [myPrompts, setMyPrompts] = useState([]);

  useEffect(() => {
    try {
      const fetchPrompts = async () => {
        const response = await fetch(`/api/users/${session?.user.id}/prompts`);
        if(response.ok){
          const data = await response.json();
          setMyPrompts(data);
        }
        else{
            console.log('Could not fecth the data');
        }
      };
      if (session?.user.id) {
        fetchPrompts();
      }
    } catch (error) {}
  }, [session?.user.id,myPrompts]);

  
  return (
    <Profile
      name={session?.user.name}
      email={session?.user.email}
      desc={`Welcome, ${session?.user.name}, This is your profile page.`}
      data={myPrompts}
    />
  );
};

export default MyProfile;
