'use client'

import { Admin } from "@/components";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function Page() {
  const { user } = useAuthContext() as { user: any }; // Use 'as' to assert the type as { user: any }
  const router = useRouter();

  useEffect(() => {
    // Redirect to the home page if the user is not logged in
    if (user == null) {
      router.push("/");
    }

    if (user.reloadUserInfo.emailLinkSignin){
      router.push("/");
    }
  }, [user, router]);

  return (
    <Admin />
  );
}

export default Page;
