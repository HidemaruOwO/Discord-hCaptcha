import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Auth from "components/Auth";

export default function Page() {
  const [serverId, setServerId] = useState<string>("");
  const [userId, setUserId] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      // ?s=serverId&u=userId
      setServerId(router.query.s as string);
      setUserId(router.query.u as string);
    }
  }, [router.isReady]);

  return <Auth serverId={serverId} userId={userId} />;
}
