'use client'

import { Admin } from "@/components";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Page() {
  const { user } = useAuthContext() as { user: any };
  const router = useRouter();
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    if (user && !user.reloadUserInfo.emailLinkSignin) {
      setShow(true);
      return;
    }
    
    // Redirect to the home page if the user is not logged in
    router.push("/");
  }, [user]);

  return (
    show && <Admin />
  );
}

export default Page;
