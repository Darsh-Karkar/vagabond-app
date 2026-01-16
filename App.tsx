
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './views/Dashboard';
import { PlanFlow } from './views/PlanFlow';
import { TripOverview } from './views/TripOverview';
import { MapView } from './views/MapView';
import { Journey } from './views/Journey';
import { Profile } from './views/Profile';

const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/plan/new" element={<PlanFlow />} />
        <Route path="/trip/:id/overview" element={<TripOverview />} />
        <Route path="/trip/:id/map" element={<MapView />} />
        <Route path="/journey" element={<Journey />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
};

export default App;
