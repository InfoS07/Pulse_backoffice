import { NextApiRequest, NextApiResponse } from 'next';
import { getUsersCount } from '@/utils/supabase/users'; // Assurez-vous du bon chemin

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Handling API request:', req.method, req.url);

  if (req.method === 'GET') {
    try {
      const usersCount = await getUsersCount();
      if (usersCount) {
        const count = usersCount[0].count; // Assurez-vous que cette ligne est correcte selon la structure de vos données
        console.log('User count:', count);
        res.status(200).json({ count });
      } else {
        res.status(500).json({ error: 'Failed to get user count' });
      }
    } catch (error) {
      console.error('Failed to fetch user count:', error);
      res.status(500).json({ error: 'Failed to fetch user count' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}