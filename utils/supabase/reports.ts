import { createClient } from "./client";




export const getReports = async () => {
    const supabase = createClient();
    const { data, error } = await supabase.from('comment_reports').select('*');
    if (error) {
      console.error(error);
      return [];
    }
    return data;
  };



export const deleteReportById = async (id: string) => {
    const supabase = createClient();
    const { error } = await supabase.from('comment_reports').delete().eq('comment_id', id);
    if (error) {
      console.error('Erreur lors de la suppression du report:', error.message);
      return false;
    }
    return true;
  };