import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';


const DashboardPage = () => {


    const [userCount, setUserCount] = useState<number | null>(null);
    const [trainingCount, setTrainingCount] = useState<number | null>(null);

    useEffect(() => {
      const fetchUserCount = async () => {
        try {
          const response = await axios.get('/api/users_count'); 
          if (response.data && response.data.count !== undefined) {
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
          const response = await axios.get('/api/trainings_count'); // Assurez-vous que l'URL est correcte
          if (response.data && response.data.count !== undefined) {
            setTrainingCount(response.data.count);
          } else {
            console.error('Invalid response format:', response.data);
          }
        } catch (error) {
          console.error('Failed to fetch user count:', error);
        }
      };
  
      fetchUserCount();
      fetchTrainingCount();

    }, []);


  return (
    <div>
      <h1>Dashboard</h1>
      <h1>Nombre d'utilisateur: {userCount}</h1>    
      <h1>Nombre de trainings disponibles: {trainingCount}</h1>

    </div>
  );
};

export default DashboardPage;