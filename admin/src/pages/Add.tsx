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
    } catch (error) {
      toast.error("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl px-8 py-8">
      <form
        className="flex flex-col gap-6"
        onSubmit={onSubmitHandler}
      >
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-gray-700">
            Upload Image
          </p>

          <label htmlFor="image" className="cursor-pointer w-fit">
            <img
              src={
                image
                  ? URL.createObjectURL(image)
                  : assets.upload_area
              }
              alt="Upload"
              className="w-32 h-32 object-cover rounded-lg border border-gray-200 hover:border-orange-400 transition"
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
          <p className="text-sm font-medium text-gray-700">
            Product name
          </p>

          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here..."
            className="w-full max-w-lg px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-orange-500 transition"
          />
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-gray-700">
            Product description
          </p>

          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows={6}
            placeholder="Write content here..."
            className="w-full max-w-lg px-4 py-3 border border-gray-300 rounded-lg outline-none resize-none focus:border-orange-500 transition"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-gray-700">
              Product category
            </p>

            <select
              onChange={onChangeHandler}
              value={data.category}
              name="category"
              className="w-48 px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-orange-500 transition"
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
            <p className="text-sm font-medium text-gray-700">
              Product price
            </p>

            <input
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              name="price"
              placeholder="$20"
              className="w-48 px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-orange-500 transition"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-32 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
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