import React, { useState } from "react";
import { assets } from "../assets/assets";
import api from "../api/axios";
import { toast } from "react-toastify";

function Add() {
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  const onChangeHandler = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;

    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!image) {
      toast.error("Please select an image");
      return;
    }

    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("image", image);

    try {
      setLoading(true);

      const response = await api.post("/add", formData);

      if (response.data.success) {
        setData({
          name: "",
          description: "",
          price: "",
          category: "Salad",
        });

        setImage(null);
        toast.success(response.data.message);
      }
    } catch {
      toast.error("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-10">
      <div className="mb-7">
        <p className="text-sm font-semibold text-orange-500">MENU MANAGEMENT</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Add a food item</h1>
        <p className="mt-2 text-sm text-slate-500">Add a new dish to your menu and make it available to customers.</p>
      </div>
      <form
        className="flex flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8"
        onSubmit={onSubmitHandler}
      >
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold text-slate-700">
            Upload Image
          </p>

          <label htmlFor="image" className="group w-fit cursor-pointer">
            <img
              src={
                image
                  ? URL.createObjectURL(image)
                  : assets.upload_area
              }
              alt="Upload"
              className="h-36 w-36 rounded-xl border border-dashed border-slate-300 bg-slate-50 object-cover transition group-hover:border-orange-400 group-hover:bg-orange-50"
            />
          </label>

          <input
            onChange={(e) => {
              const file = e.target.files?.[0];

              if (file) {
                setImage(file);
              }
            }}
            type="file"
            id="image"
            accept="image/*"
            required
            hidden
          />
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold text-slate-700">
            Product name
          </p>

          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here..."
            className="w-full max-w-2xl rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
          />
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold text-slate-700">
            Product description
          </p>

          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows={6}
            placeholder="Write content here..."
            className="w-full max-w-2xl resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
          />
        </div>

        <div className="flex flex-col gap-6 sm:flex-row">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold text-slate-700">
              Product category
            </p>

            <select
              onChange={onChangeHandler}
              value={data.category}
              name="category"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100 sm:w-52"
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold text-slate-700">
              Product price
            </p>

            <input
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              name="price"
              placeholder="$20"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 sm:w-52"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex w-40 items-center justify-center rounded-xl bg-orange-500 py-3 text-sm font-semibold text-white shadow-sm shadow-orange-200 transition hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          ) : (
            "ADD"
          )}
        </button>
      </form>
    </div>
  );
}

export default Add;