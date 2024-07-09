import { createClient } from "./client";




export const getTrainings = async () => {
    const supabase = createClient();
    const { data, error } = await supabase.from('training').select('*');
    if (error) {
      console.error(error);
      return [];
    }
    return data;
  };



export const getTrainingCount = async () => {
    const supabase = createClient();
    const { data, error } = await supabase.from('training').select('count', { count: 'exact' });
    console.log('data', data);
    if (error) {
        console.log('error', error);
      console.error(error);
      return 0;
    }
    return data;
  };