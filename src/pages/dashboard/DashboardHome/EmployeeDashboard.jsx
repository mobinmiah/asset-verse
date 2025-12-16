import React from 'react';
import useAuth from '../../../hooks/useAuth';
import Loading from '../../../components/Loading/Loading';

const EmployeeDashboard = () => {
      const { user, loading } = useAuth();
      if (loading) {
        return <Loading></Loading>
      }
      return (
        <div className="m-2 p-3 bg-base-100 rounded-lg">
          <h3>{user.displayName || user.providerData.displayName} (User)</h3>
        </div>
      );
};

export default EmployeeDashboard;