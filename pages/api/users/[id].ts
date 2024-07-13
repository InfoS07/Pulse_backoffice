import { NextApiRequest, NextApiResponse } from 'next';
import { getUserById,  } from '@/utils/supabase/users'; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Handling API request:', req.method, req.url);

  if (req.method === 'GET') {
    console.log('req.query.id', req.query.id);
    try {
      const user = await getUserById(req.query.id as string);
      if (user) {
        console.log('Comment trouvé:', user);
        res.status(200).json({ user });
      } else {
        res.status(404).json({ error: 'Commentaire non trouvé' });
      }
    } catch (error) {
      console.error('Erreur lors de la récupération du useraire:', error);
      res.status(500).json({ error: 'Échec de la récupération du useraire' });
    }
  }  else {
    res.status(405).json({ error: 'Méthode non autorisée' });
  }
}
