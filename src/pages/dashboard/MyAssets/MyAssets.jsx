import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";

const MyAssets = () => {
  const axiosSecure = useAxiosSecure();

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const { data: assets = [], isLoading } = useQuery({
    queryKey: ["myAssets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/my-assets");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  const filteredAssets = assets.filter((asset) => {
    const matchesName = asset.assetName
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesType = typeFilter ? asset.assetType === typeFilter : true;

    return matchesName && matchesType;
  });

  return (
    <div className="p-6 space-y-4">
      <Helmet>
        <title>My Assets | AssetVerse</title>
      </Helmet>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl font-bold">My Assets</h2>

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="Search asset..."
            className="input input-bordered"
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="select select-bordered"
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="Returnable">Returnable</option>
            <option value="Non-returnable">Non-returnable</option>
          </select>

          <button onClick={() => window.print()} className="btn btn-outline">
            Print
          </button>
        </div>
      </div>

      <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Asset</th>
              <th>Type</th>
              <th>Company</th>
              <th>Request Date</th>
              <th>Approval Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredAssets.map((asset) => (
              <tr key={asset._id}>
                <td className="flex items-center gap-3">
                  <img
                    src={asset.assetImage}
                    className="w-10 h-10 rounded"
                    alt=""
                  />
                  {asset.assetName}
                </td>

                <td>{asset.assetType}</td>
                <td>{asset.companyName}</td>
                <td>{new Date(asset.requestDate).toLocaleDateString()}</td>
                <td>
                  {asset.approvalDate
                    ? new Date(asset.approvalDate).toLocaleDateString()
                    : "—"}
                </td>

                <td>
                  <span
                    className={`badge 
                    ${asset.status === "Approved" && "badge-success"}
                    ${asset.status === "Pending" && "badge-warning"}
                    ${asset.status === "Rejected" && "badge-error"}
                    ${asset.status === "Returned" && "badge-neutral"}
                  `}
                  >
                    {asset.status}
                  </span>
                </td>

                <td>
                  {asset.status === "Approved" &&
                    asset.assetType === "Returnable" && (
                      <button className="btn btn-xs btn-error">Return</button>
                    )}
                </td>
              </tr>
            ))}

            {filteredAssets.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-500">
                  No assets found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAssets;
