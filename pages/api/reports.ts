import { NextApiRequest, NextApiResponse } from 'next';
import { getReports } from '@/utils/supabase/reports'; // Assurez-vous du bon chemin

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Handling API request:', req.method, req.url);

  if (req.method === 'GET') {
    try {
      const reports= await getReports();
      if (reports) {
        const count = reports; // Assurez-vous que cette ligne est correcte selon la structure de vos données
        console.log('Report count:', reports);
        res.status(200).json({ reports });
      } else {
        res.status(500).json({ error: 'Failed to get report count' });
      }
    } catch (error) {
      console.error('Failed to fetch report count:', error);
      res.status(500).json({ error: 'Failed to fetch report count' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}