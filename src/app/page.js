"use server"

import Home from "./Home";
import { createClient } from "../../utils/supabase/server";
import { redirect } from "next/navigation";
import { getUser } from "./db/users";

export default async function Page() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/login");
  }

  const user = await getUser(data.user.email);
  return <Home username={user.name} />;
}
