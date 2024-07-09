import { NextApiRequest, NextApiResponse } from 'next';
import { getTrainings} from '@/utils/supabase/trainings'; // Assurez-vous du bon chemin

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Handling API request:', req.method, req.url);

  if (req.method === 'GET') {
    try {
      const trainings= await getTrainings();
      if (trainings) {
        const count = trainings; // Assurez-vous que cette ligne est correcte selon la structure de vos données
        console.log('Training count:', trainings);
        res.status(200).json({ trainings });
      } else {
        res.status(500).json({ error: 'Failed to get training count' });
      }
    } catch (error) {
      console.error('Failed to fetch training count:', error);
      res.status(500).json({ error: 'Failed to fetch training count' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}