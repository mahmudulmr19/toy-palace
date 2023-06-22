import React, { useEffect, useState } from "react";
import Container from "../../components/global/Container";
import { Helmet } from "react-helmet-async";
import { useScrollTop } from "../../hooks";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

const EditToy = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState({});
  useEffect(() => {
    fetch(`https://toy-palace.vercel.app/api/toys/${id}`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);
  useScrollTop();
  const [loading, setLoading] = useState(false);
  const [nameError, setNameError] = useState("");
  const [toyNameError, setToyNameError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [quantityError, setQuantityError] = useState("");
  const [ratingError, setRatingError] = useState("");
  const [photoError, setPhotoError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    const form = e.target;
    const SellerName = form.SellerName.value;
    const sellerEmail = form.email.value;
    const ToyName = form.ToyName.value;
    const price = parseInt(form.price.value);
    const quantity = parseInt(form.quantity.value);
    const rating = parseInt(form.rating.value);
    const toyImage = form.toyImage.value;
    const subcategory = form.subcategory.value;
    const description = form.description.value;
    if (!ToyName) {
      setToyNameError("Toy Name is required");
    }
    if (!SellerName) {
      setNameError("Seller Name is required");
    }
    const priceNegitive = price < 0;
    if (priceNegitive) {
      setPriceError("Price is cannot be nagitive");
    }

    if (!price) {
      setPriceError("Price is required");
    }

    if (!quantity) {
      setQuantityError("Available Quantity is required");
    }
    if (!rating) {
      setRatingError("Rating is required");
    }
    if (!toyImage) {
      setPhotoError("Toy Image URL is required");
    }

    if (!description) {
      setDescriptionError("Description is required");
    }

    // prettier-ignore
    if(!ToyName || !SellerName || priceNegitive || !price || !quantity || !rating || !toyImage || !description){
      return setLoading(false)
    }
    else{
      setNameError("")
      setToyNameError("")
      setPriceError("")
      setQuantityError("")
      setRatingError("")
      setPhotoError("")
      setDescriptionError("")
    }

    const toyData = {
      sellerName: SellerName,
      sellerEmail,
      toyName: ToyName,
      price,
      availableQuantity: quantity,
      rating,
      toyImage,
      subcategory,
      description,
    };
    fetch(`https://toy-palace.vercel.app/api/toys/${id}`, {
      method: "PUT",
      body: JSON.stringify(toyData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        toast.success("Toy data updated successfully!");
        navigate("/my-toys");
      }
      if (!res.ok) {
        toast.error("Something went wrong");
      }
    });
  };
  return (
    <Container className="my-16">
      <Helmet>
        <title>Update Toy - Toy Palace</title>
      </Helmet>

      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold capitalize text-center">
        Update Toy
      </h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-screen-md mx-auto mt-20 grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div>
          <div className="relative">
            <input
              disabled={loading}
              type="text"
              id="SellerName"
              defaultValue={data?.sellerName}
              onChange={() => setNameError("")}
              className={`block px-4 pb-2.5 pt-4 w-full text-sm text-gray-900 ring-1 ${
                nameError ? "ring-red-500" : "ring-gray-300"
              } focus:ring-indigo-500 focus:shadow focus:shadow-[#673de6] bg-transparent rounded appearance-none focus:outline-none peer`}
              placeholder=" "
            />
            <label
              htmlFor="SellerName"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-4 peer-focus:px-4 peer-focus:text-indigo-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Seller Name
            </label>
          </div>
          <p className="mt-2 text-xs text-red-500">
            <span className="font-medium">{nameError}</span>
          </p>
        </div>

        <div className="relative">
          <input
            disabled
            type="text"
            defaultValue={data?.sellerEmail}
            id="email"
            className="block px-4 pb-2.5 pt-4 w-full text-sm text-gray-900 ring-1 ring-gray-300 focus:ring-indigo-500 focus:shadow focus:shadow-[#673de6] bg-transparent rounded appearance-none focus:outline-none peer"
            placeholder=" "
          />
          <label
            htmlFor="email"
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-4 peer-focus:px-4 peer-focus:text-indigo-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
          >
            Seller Email
          </label>
        </div>

        <div>
          <div className="relative">
            <input
              disabled={loading}
              type="text"
              id="ToyName"
              defaultValue={data?.toyName}
              onChange={() => setToyNameError("")}
              className={`block px-4 pb-2.5 pt-4 w-full text-sm text-gray-900 ring-1 ${
                toyNameError ? "ring-red-500" : "ring-gray-300"
              } focus:ring-indigo-500 focus:shadow focus:shadow-[#673de6] bg-transparent rounded appearance-none focus:outline-none peer`}
              placeholder=" "
            />
            <label
              htmlFor="ToyName"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-4 peer-focus:px-4 peer-focus:text-indigo-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Toy Name
            </label>
          </div>
          <p className="mt-2 text-xs text-red-500">
            <span className="font-medium">{toyNameError}</span>
          </p>
        </div>

        <div>
          <div className="relative">
            <input
              disabled={loading}
              type="number"
              id="price"
              defaultValue={data?.price}
              onChange={() => setPriceError("")}
              className={`block px-4 pb-2.5 pt-4 w-full text-sm text-gray-900 ring-1 ${
                priceError ? "ring-red-500" : "ring-gray-300"
              } focus:ring-indigo-500 focus:shadow focus:shadow-[#673de6] bg-transparent rounded appearance-none focus:outline-none peer`}
              placeholder=" "
            />
            <label
              htmlFor="price"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-4 peer-focus:px-4 peer-focus:text-indigo-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Toy Price
            </label>
          </div>
          <p className="mt-2 text-xs text-red-500">
            <span className="font-medium">{priceError}</span>
          </p>
        </div>

        <div>
          <div className="relative">
            <input
              disabled={loading}
              type="number"
              id="quantity"
              defaultValue={data?.availableQuantity}
              onChange={() => setQuantityError("")}
              className={`block px-4 pb-2.5 pt-4 w-full text-sm text-gray-900 ring-1 ${
                quantityError ? "ring-red-500" : "ring-gray-300"
              } focus:ring-indigo-500 focus:shadow focus:shadow-[#673de6] bg-transparent rounded appearance-none focus:outline-none peer`}
              placeholder=" "
            />
            <label
              htmlFor="quantity"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-4 peer-focus:px-4 peer-focus:text-indigo-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Toy Available Quantity
            </label>
          </div>
          <p className="mt-2 text-xs text-red-500">
            <span className="font-medium">{quantityError}</span>
          </p>
        </div>

        <div>
          <div className="relative">
            <input
              disabled={loading}
              type="number"
              id="rating"
              defaultValue={data?.rating}
              max={5}
              onChange={() => setRatingError("")}
              className={`block px-4 pb-2.5 pt-4 w-full text-sm text-gray-900 ring-1 ${
                ratingError ? "ring-red-500" : "ring-gray-300"
              } focus:ring-indigo-500 focus:shadow focus:shadow-[#673de6] bg-transparent rounded appearance-none focus:outline-none peer`}
              placeholder=" "
            />
            <label
              htmlFor="rating"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-4 peer-focus:px-4 peer-focus:text-indigo-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Rating
            </label>
          </div>
          <p className="mt-2 text-xs text-red-500">
            <span className="font-medium">{ratingError}</span>
          </p>
        </div>

        <div>
          <div className="relative">
            <input
              disabled={loading}
              type="url"
              id="toyImage"
              defaultValue={data?.toyImage}
              onChange={() => setPhotoError("")}
              className={`block px-4 pb-2.5 pt-4 w-full text-sm text-gray-900 ring-1 ${
                photoError ? "ring-red-500" : "ring-gray-300"
              } focus:ring-indigo-500 focus:shadow focus:shadow-[#673de6] bg-transparent rounded appearance-none focus:outline-none peer`}
              placeholder=" "
            />
            <label
              htmlFor="toyImage"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-4 peer-focus:px-4 peer-focus:text-indigo-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Toy Image URL
            </label>
          </div>
          <p className="mt-2 text-xs text-red-500">
            <span className="font-medium">{photoError}</span>
          </p>
        </div>

        <div className="relative">
          <select
            disabled
            value={data.subcategory}
            id="subcategory"
            className="block px-4 pb-2.5 pt-4 w-full text-sm text-gray-900 ring-1 ring-gray-300 focus:ring-indigo-500 focus:shadow focus:shadow-[#673de6] bg-transparent rounded appearance-none focus:outline-none peer"
          >
            <option value="Sports Car">Sports Car</option>
            <option value="Truck">Truck</option>
            <option value="Monster Truck">Monster Truck</option>
          </select>
          <label
            htmlFor="subcategory"
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-4 peer-focus:px-4 peer-focus:text-indigo-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
          >
            Sub Category
          </label>
        </div>

        <div className="lg:col-span-2">
          <div className="relative">
            <input
              disabled={loading}
              type="text"
              id="description"
              defaultValue={data?.description}
              onChange={() => setDescriptionError("")}
              className={`block px-4 py-6  w-full text-sm text-gray-900 ring-1 ${
                descriptionError ? "ring-red-500" : "ring-gray-300"
              } focus:ring-indigo-500 focus:shadow focus:shadow-[#673de6] bg-transparent rounded appearance-none focus:outline-none peer`}
              placeholder=" "
            />
            <label
              htmlFor="description"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-4 peer-focus:px-4 peer-focus:text-indigo-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Toy Description
            </label>
          </div>
          <p className="mt-2 text-xs text-red-500">
            <span className="font-medium">{descriptionError}</span>
          </p>
        </div>

        <button
          disabled={loading}
          className="lg:col-span-2 w-full bg-indigo-500 hover:bg-indigo-600 disabled:hover:bg-indigo-500 transition-all px-4 py-3 rounded font-semibold text-white"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-gray-200 animate-spin fill-indigo-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            "Update"
          )}
        </button>
      </form>
    </Container>
  );
};

export default EditToy;
