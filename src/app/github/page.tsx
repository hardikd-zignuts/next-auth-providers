import { auth, signIn, signOut } from "@/auth";
import { Session } from "next-auth";
import Image from "next/image";

export default async function Home() {
  const session = (await auth()) as Session | null;
  const data = session?.user;

  return (
    <main className="flex flex-col items-center justify-between p-24">
      {data && (
        <div className="mt-10">
          <Image
            width={200}
            height={200}
            src={data?.image as string}
            alt="Hello"
          />
          <h3>{data?.name}</h3>
          <h3>{data?.email}</h3>
        </div>
      )}
      <form
        className="mt-80"
        action={async () => {
          "use server";
          if (data) await signOut();
          await signIn("github");
        }}
      >
        <button
          className="border-2 border-black p-2 rounded-md hover:bg-black hover:text-white transition-all duration-200"
          type="submit"
        >
          {data ? "Sign out" : "Signin with GitHub"}
        </button>
      </form>
    </main>
  );
}
