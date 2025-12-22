import React from 'react';
import AssetList from '../AssetList/AssetList';
import AssetTypePieChart from '../Charts/AssetTypePielChrat/AssetTypePielChrat';

const HRDashboard = () => {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4 text-center text-primary">HR Dashboard</h2>
        <AssetTypePieChart></AssetTypePieChart>
        <AssetList />
      </div>
    );
};

export default HRDashboard;