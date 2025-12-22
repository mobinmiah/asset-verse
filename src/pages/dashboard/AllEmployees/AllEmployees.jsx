import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";
import { Helmet } from "react-helmet";

const AllEmployees = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: employees = [],
    isLoading,
    //  refetch,
  } = useQuery({
    queryKey: ["employees"], // unique key
    queryFn: async () => {
      const res = await axiosSecure.get("/users/employee");
      return res.data; // array of employees with assetCount
    },
    staleTime: 1000 * 10, // optional: 10s
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <Loading />;
console.log(employees)
  return (
    <div>
        <Helmet><title>MyEmployees</title></Helmet>
      <h2 className="text-2xl font-bold mb-4">
        My Employees ({employees.length})
      </h2>
      {/* <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Photo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Join Date</th>
              <th>Assets Count</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp._id}>
                <td>
                  <img
                    src={emp.photoURL || "/placeholder.png"}
                    alt={emp.name}
                    className="w-12 h-12 rounded-full"
                  />
                </td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{new Date(emp.createdAt).toLocaleDateString()}</td>
                <td>{emp.assetCount}</td>
                <td>
                  <button
                    className="btn btn-xs btn-error"
                    //  onClick={() => handleRemoveEmployee(emp.email)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
            {employees.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center text-gray-500">
                  No employees found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div> */}
    </div>
  );
};

export default AllEmployees;
