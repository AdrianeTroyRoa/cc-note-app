"use server";

import Home from "./Home";
import { createClient } from "../../utils/supabase/server";
import { redirect } from "next/navigation";
import { getUser } from "./db/users";
import { getNotesById } from "./db/notes";

export default async function Page() {
  const supabase = createClient();

  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError) {
      console.error("Authentication error:", authError.message);
      return redirect("/login?error=auth_failed");
    }

    if (!user) {
      console.warn("Unauthenticated access attempt");
      return redirect("/login");
    }

    const foundUser = await getUser(user.email);

    if (!foundUser) {
      console.warn(`User not found in database: ${user.email}`);
      return redirect("/onboarding?error=profile_not_found");
    }

    if (!foundUser.id || !foundUser.name) {
      console.error("Invalid user data structure:", foundUser);
      return redirect("/error?code=invalid_user_data");
    }

    let notes = [];
    try {
      const rawNotes = await getNotesById(foundUser.id);
      // Convert Date objects to ISO strings
      notes = rawNotes.map((note) => ({
        ...note,
        createdAt: note.createdAt?.toISOString(),
      }));
    } catch (notesError) {
      console.error("Failed to fetch notes:", notesError);
    }

    const clientSafeData = {
      username: foundUser.name,
      userId: foundUser.id,
      oldNotes: notes,
    };

    return <Home {...clientSafeData} />;
  } catch (error) {
    console.error("Unexpected page error:", error);
    return redirect("/error?code=server_error");
  }
}
