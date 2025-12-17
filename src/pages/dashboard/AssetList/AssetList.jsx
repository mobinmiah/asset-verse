  import { useQuery } from "@tanstack/react-query";
  import React, { useState } from "react";
  import useAxiosSecure from "../../../hooks/useAxiosSecure";
  import Loading from "../../../components/Loading/Loading";
  import { useForm } from "react-hook-form";
  import Swal from "sweetalert2";

  const AssetList = () => {
    const axiosSecure = useAxiosSecure();
    const [editingAsset, setEditingAsset] = useState(null);
    const [searchText, setSearchText] = useState("");

    const {
      data: assets = [],
      isLoading,
      refetch,
    } = useQuery({
      queryKey: ["assets", searchText],
      queryFn: async () => {
        const res = await axiosSecure.get(`/assets?searchText=${searchText}`);
        return res.data;
      },
    });

    const { register, handleSubmit, reset } = useForm();

    const openEditModal = (e, asset) => {
      e.preventDefault();
      setEditingAsset(asset);
      reset({
        productName: asset.productName,
        productImage: asset.productImage,
        productType: asset.productType,
        productQuantity: asset.productQuantity,
      });
    };

    const handleEditAsset = async (data) => {
      if (!editingAsset) return;

      const updatedAsset = {
        productName: data.productName,
        productImage: data.productImage,
        productType: data.productType,
        productQuantity: Number(data.productQuantity),
      };

      try {
        await axiosSecure.patch(`/assets/${editingAsset._id}`, updatedAsset);
        Swal.fire({
          title: "Updated!",
          text: "Asset updated successfully.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        setEditingAsset(null);
        await refetch();
      } catch (error) {
        Swal.fire("Error", "Failed to update asset", error.message);
      }
    };
    const handleDeleteAsset = (id) => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure.delete(`/assets/${id}`).then((res) => {
            if (res.data.deletedCount) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your product has been deleted.",
                icon: "success",
              });
            }
          });
        }
      });
    };
    if (isLoading) return <Loading />;

    return (
      <div className="py-10 px-4 sm:px-6 lg:px-10 rounded-lg shadow-sm shadow-neutral bg-base-100">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-primary">
          All Assets : ({assets.length})
        </h2>

        {/* Search */}
        <div className="flex justify-center mb-6">
          <div className="w-full max-w-sm">
            <label className="input flex items-center gap-2 w-full">
              <svg
                className="h-5 w-5 opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
              <input
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                type="search"
                className="grow input-bordered w-full"
                placeholder="Search Asset"
              />
            </label>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table table-compact w-full">
            <thead>
              <tr>
                <th>#</th>
                <th className="min-w-[120px]">Name</th>
                <th>Quantity</th>
                <th className="min-w-[140px]">Date Added</th>
                <th className="min-w-[140px]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((product, index) => (
                <tr key={product._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-10 w-10 sm:h-12 sm:w-12">
                          <img
                            src={product.productImage}
                            alt={product.productName}
                          />
                        </div>
                      </div>
                      <div className="truncate">
                        <div className="font-bold truncate">
                          {product.productName}
                        </div>
                        <div className="text-xs sm:text-sm opacity-50 truncate">
                          {product.productType}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{product.productQuantity}</td>
                  <td>{new Date(product.createdAt).toLocaleString()}</td>
                  <th className="flex flex-wrap gap-1">
                    <button
                      onClick={() => openEditModal(product)}
                      className="btn btn-primary btn-xs flex-1 sm:flex-none"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteAsset(product._id)}
                      className="btn btn-error btn-xs flex-1 sm:flex-none"
                    >
                      Delete
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Edit Modal */}
        {editingAsset && (
          <dialog open className="modal modal-bottom sm:modal-middle">
            <div className="modal-box max-w-md w-full sm:max-w-lg">
              <h3 className="text-xl font-bold mb-6 text-center text-primary">
                Edit Asset
              </h3>
              <form
                onSubmit={handleSubmit(handleEditAsset)}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                <div className="sm:col-span-2">
                  <label className="label">Product Name</label>
                  <input
                    {...register("productName")}
                    className="input input-bordered w-full"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="label">Product Image URL</label>
                  <input
                    {...register("productImage")}
                    className="input input-bordered w-full"
                  />
                </div>

                <div>
                  <label className="label">Product Type</label>
                  <select
                    {...register("productType")}
                    className="select w-full border-primary outline-none font-normal"
                  >
                    <option value="Returnable">Returnable</option>
                    <option value="Non-returnable">Non-returnable</option>
                  </select>
                </div>

                <div>
                  <label className="label">Total Quantity</label>
                  <input
                    type="number"
                    {...register("productQuantity")}
                    className="input input-bordered w-full"
                  />
                </div>

                <div className="sm:col-span-2 flex flex-col sm:flex-row gap-2 mt-4">
                  <button type="submit" className="btn btn-primary flex-1">
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingAsset(null)}
                    className="btn btn-outline flex-1"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </dialog>
        )}
      </div>
    );
  };

  export default AssetList;
