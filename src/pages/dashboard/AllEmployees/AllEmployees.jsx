import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";

const AllEmployees = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: employees = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/employee");
      return res.data;
    },
    staleTime: 1000 * 10,
  });

  if (isLoading) return <Loading />;

  if (isError) {
    return <p className="text-center text-red-500">Failed to load employees</p>;
  }

  return (
    <div className="p-4">
      <Helmet>
        <title>My Employees | AssetVerse</title>
      </Helmet>

      <h2 className="text-2xl font-bold mb-4">
        My Employees ({employees.length})
      </h2>

      <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Photo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Join Date</th>
              <th>Assets</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp) => (
              <tr key={emp._id}>
                <td>
                  <img
                    src={emp.photoURL || emp.photo || "/placeholder.png"}
                    alt={emp.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </td>
                <td className="font-medium">{emp.name}</td>
                <td>{emp.email}</td>
                <td>
                  {emp.createdAt
                    ? new Date(emp.createdAt).toLocaleDateString()
                    : "—"}
                </td>
                <td>
                  <span className="badge badge-primary">{emp.assetCount}</span>
                </td>
                <td>
                  <button className="btn btn-xs btn-error" disabled>
                    Remove
                  </button>
                </td>
              </tr>
            ))}

            {employees.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center text-gray-500 py-6">
                  No employees found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllEmployees;
