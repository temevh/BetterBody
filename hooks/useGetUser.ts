import { supabase } from "@/utils/supabase";

export async function useGetUser() {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) throw new Error("Not authenticated");
  return user;
}
