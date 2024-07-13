import { NextApiRequest, NextApiResponse } from 'next';
import { getUsers, getUsersCount } from '@/utils/supabase/users'; // Assurez-vous du bon chemin

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Handling API request:', req.method, req.url);

  if (req.method === 'GET') {
    try {
      const users= await getUsers();
      if (users) {
        const count = users; 
        console.log('User count:', users);
        res.status(200).json({ users });
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