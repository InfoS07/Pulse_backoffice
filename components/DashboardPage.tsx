import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface Training {
  id: number;
  title: string;
  description: string;
  created_at: string;
  repetitions: number;
  author_id: number;
}

const DashboardPage = () => {
  const [userCount, setUserCount] = useState<number | null>(null);
  const [trainingCount, setTrainingCount] = useState<number | null>(null);
  const [trainings, setTrainings] = useState<Training[]>([]);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await axios.get('/api/users_count');
        if (response.data && response.data !== undefined) {
          setUserCount(response.data.count);
        } else {
          console.error('Invalid response format:', response.data);
        }
      } catch (error) {
        console.error('Failed to fetch user count:', error);
      }
    };

    const fetchTrainingCount = async () => {
      try {
        const response = await axios.get('/api/trainings_count');
        if (response.data && response.data.count !== undefined) {
          setTrainingCount(response.data.count);
        } else {
          console.error('Invalid response format:', response.data);
        }
      } catch (error) {
        console.error('Failed to fetch training count:', error);
      }
    };

    const fetchTrainings = async () => {
      try {
        const responsetrain = await axios.get('/api/trainings');
        if (responsetrain.data && Array.isArray(responsetrain.data.trainings)) {
          setTrainings(responsetrain.data.trainings);
        } else {
          console.error('trainings non trouvées');
        }
      } catch (error) {
        console.error('Échec de la récupération des trainings');
        console.error('Failed to fetch trainings:', error);
      }
    };

    fetchUserCount();
    fetchTrainingCount();
    fetchTrainings();
  }, []);

  // Transformer les données pour obtenir le nombre de trainings par jour
  const trainingDataByDate = trainings.reduce((acc: Record<string, number>, training) => {
    const date = new Date(training.created_at).toISOString().split('T')[0];
    if (!acc[date]) {
      acc[date] = 0;
    }
    acc[date]++;
    return acc;
  }, {});

  const chartData = Object.keys(trainingDataByDate)
    .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
    .map(date => ({
      date,
      entrainements: trainingDataByDate[date],
    }));

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1 style={{ fontSize: '4em', marginBottom: '20px' }}>PULSE</h1>
      <h1>Bienvenue !</h1>

      <div style={{ margin: '20px 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: '100%', maxWidth: '600px', marginBottom: '20px' }}>
          <h2>Informations Générales</h2>
          <table style={{ width: '100%', border: '1px solid #ccc', borderRadius: '5px', textAlign: 'left' }}>
            <tbody>
              <tr>
                <td style={{ padding: '10px' }}>Nombre d'utilisateurs</td>
                <td style={{ padding: '10px', textAlign: 'right' }}>{userCount}</td>
              </tr>
              <tr>
                <td style={{ padding: '10px' }}>Nombre de trainings disponibles</td>
                <td style={{ padding: '10px', textAlign: 'right' }}>{trainingCount}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ width: '100%', maxWidth: '800px' }}>
          <h2>Activité</h2>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="entrainements" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
