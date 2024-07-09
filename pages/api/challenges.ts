import { NextApiRequest, NextApiResponse } from 'next';
import { getChallenges } from '@/utils/supabase/challenges'; // Assurez-vous du bon chemin

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Handling API request:', req.method, req.url);

  if (req.method === 'GET') {
    try {
      const challenges= await getChallenges();
      if (challenges) {
        const count = challenges; // Assurez-vous que cette ligne est correcte selon la structure de vos données
        console.log('Challenge count:', challenges);
        res.status(200).json({ challenges });
      } else {
        res.status(500).json({ error: 'Failed to get challenge count' });
      }
    } catch (error) {
      console.error('Failed to fetch challenge count:', error);
      res.status(500).json({ error: 'Failed to fetch challenge count' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}