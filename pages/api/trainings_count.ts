import { NextApiRequest, NextApiResponse } from 'next';
import { getTrainingCount } from '@/utils/supabase/trainings'; // Assurez-vous du bon chemin

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Handling API request:', req.method, req.url);

  if (req.method === 'GET') {
    try {
      const trainingsCount = await getTrainingCount();
      if (trainingsCount) {
        const count = trainingsCount[0].count; // Assurez-vous que cette ligne est correcte selon la structure de vos données
        console.log('Training count:', count);
        res.status(200).json({ count });
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