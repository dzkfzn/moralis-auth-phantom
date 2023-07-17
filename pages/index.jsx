import React, { useEffect, useTransition } from "react";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { Typography } from "@web3uikit/core";
import { useSession } from "next-auth/react";
import PhantomBtn from "../app/components/loginBtn/phantomBtn";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(() => {
      session && status === "authenticated" && router.push("./user");
    });
  }, [session, status]);

  useEffect(() => {
    startTransition(() => {
      session && console.log(session);
    });
  }, [session]);

  return (
    <div className={styles.body}>
      {!isPending && (
        <div className={styles.card}>
          <>
            {!session ? (
              <>
                <Typography variant="body18">
                  Select Wallet for Authentication
                </Typography>
                <br />
                <PhantomBtn />
              </>
            ) : (
              <Typography variant="caption14">Loading...</Typography>
            )}
          </>
        </div>
      )}
    </div>
  );
}
