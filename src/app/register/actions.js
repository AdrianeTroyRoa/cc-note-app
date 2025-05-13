"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "../../../utils/supabase/server";
import { postUser } from "../db/users";

export async function signup(formData) {
  const supabase = await createClient();

  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  if (password !== confirmPassword) {
    console.error({error: "Passwords do not match."})
    redirect("/error")
  }

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    console.error(error)
    redirect("/error");
  }

  const customUserRecord = {
    name: formData.get("name"),
    email: formData.get("email"),
  };

  try {
    await postUser(customUserRecord);
  } catch (e) {
    console.error(error);
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}
