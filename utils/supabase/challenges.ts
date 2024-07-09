import { createClient } from "./client";

export const getChallenges = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.from('challenges').select('*');
  if (error) {
    console.error(error);
    return [];
  }
  return data;
};