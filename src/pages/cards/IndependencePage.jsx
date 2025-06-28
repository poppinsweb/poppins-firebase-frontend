import React from 'react';
import { useFetchData } from '../../services/hooks/useFetchData';
import CardQuestions from '../../components/cards/CardQuestions.jsx';

const IndependencePage = () => {
  const { data: questionsData, loading, error } = useFetchData(`${import.meta.env.VITE_API_URL}/evaluation`);

  if(loading) return <p>Loading...</p>
  if(error) return <p>Error loading data: {error.message}</p>
  return (
    <div>
      {questionsData && questionsData?.length > 0 ? (
        <>
          <CardQuestions questionsData={Array.isArray(questionsData) ? questionsData: []} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default IndependencePage;
