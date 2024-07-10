import { createClient } from "./client";

export const getCommentById = async (id: string) => {
  const supabase = createClient();
  console.log('id', id);
  const { data, error } = await supabase.from('training_comments').select('*').eq('id', id).single();
  if (error) {
    console.log('id', id);

    console.error(error);
    return null;
  }
  return data;
};



export const deleteCommentById = async (id: string) => {
    const supabase = createClient();
    const { error } = await supabase.from('training_comments').delete().eq('id', id);
    if (error) {
      console.error('Erreur lors de la suppression du commentaire:', error.message);
      return false;
    }
    return true;
  };