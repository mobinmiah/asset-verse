import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";

const   AssetList = () => {
  const axiosSecure = useAxiosSecure();
  const { data: assets = [], isLoading } = useQuery({
    queryKey: ["assets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/assets");
      return res.data;
    },
  });

  if(isLoading){
    return <Loading></Loading>
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-center text-primary">
        All Assets : ({assets.length})
      </h2>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Date Added</th>
              <th>Acions</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((product, index) => (
              <tr key={product._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={product.productImage}
                          alt={`Product Image ${product.productName}`}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{product.productName}</div>
                      <div className="text-sm opacity-50">
                        {product.productType}
                      </div>
                    </div>
                  </div>
                </td>
                <td>{product.productQuantity}</td>
                <td>{new Date(product.createdAt).toLocaleString()}</td>
                <th className="space-x-1">
                  <button className="btn btn-primary btn-xs">Edit</button>
                  <button className="btn btn-error btn-xs">Delete</button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssetList;
