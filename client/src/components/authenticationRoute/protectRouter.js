// components/AuthenticatedRoute.js
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const ProtectRouter = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter();
    let token = localStorage.getItem("token");
    const isAuthenticated = () => {
      if (token) {
        return true;
      }
    };

    useEffect(() => {
      (async () => {
        if (!isAuthenticated()) {
          router.push("/login");
        }
      })();
    }, [router]);

    return isAuthenticated() ? <WrappedComponent {...props} /> : null;
  };

  return Wrapper;
};

export default ProtectRouter;
