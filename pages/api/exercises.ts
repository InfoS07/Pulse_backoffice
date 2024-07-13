import { NextApiRequest, NextApiResponse } from 'next';
import { getExercises, addExercise } from '@/utils/supabase/exercises'; // Assurez-vous du bon chemin

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Handling API request:', req.method, req.url);

  if (req.method === 'GET') {
    try {
      const exercises = await getExercises();
      if (exercises) {
        res.status(200).json({ exercises });
      } else {
        res.status(500).json({ error: 'Failed to get exercises' });
      }
    } catch (error) {
      console.error('Failed to fetch exercises:', error);
      res.status(500).json({ error: 'Failed to fetch exercises' });
    }
  } else if (req.method === 'POST') {
    try {
      const { title, description, pod_count, difficulty, type } = req.body;
      const newExercise = { title, description, pod_count, difficulty, type };

      // Assurez-vous que votre fonction addExercise gère correctement l'insertion et génère un nouvel ID.
      const addedExercise = await addExercise(newExercise);

      res.status(201).json(addedExercise);
    } catch (error) {
      console.error('Failed to add exercise:', error);
      res.status(500).json({ error: 'Failed to add exercise' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
