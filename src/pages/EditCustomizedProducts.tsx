import { ImageUpload, InputWithLabel, Sidebar } from "../components";
import { HiOutlineSave } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SimpleInput from "../components/SimpleInput";
import SelectInput from "../components/SelectInput";
import { customizationCategories, fabricType } from "../utils/data";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import CustomizationController from "../controllers/CustomizationController";
import { Loader } from "../components/common/Loader/Loader";

const EditCustomizedProducts = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loader, setLoader] = useState<boolean>(false);
  const product = location.state?.product; // Retrieve the product data

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    fabricType: "",
    color: "",
    price: "",
    extraImgPrice: "",
    discountAmount: "",
    imgFront: null as File | null,
    imgBack: null as File | null,
  });

  // Pre-populate form with product data on mount
  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (file: File | null, name: string) => {
    setFormData((prevData) => ({ ...prevData, [name]: file }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(true);
    const formDataToSubmit = new FormData();
    for (const key in formData) {
      if (formData[key] instanceof File) {
        formDataToSubmit.append(key, formData[key]);
      } else {
        formDataToSubmit.append(key, formData[key]);
      }
    }

    try {
      const response = await CustomizationController.updateProduct(
        formDataToSubmit,
        product.id
      );
      toast.success("Product updated successfully");
      console.log("Product updated successfully:", response);
      navigate("/customized-products");
    } catch (error) {
      console.error("Error updated product:", error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="h-auto border-t border-blackSecondary flex dark:bg-blackPrimary bg-whiteSecondary">
      <Sidebar />
      <div className="dark:bg-blackPrimary bg-whiteSecondary w-full">
        <div className="py-10">
          <div className="px-4 sm:px-6 lg:px-8 pb-8 border-b border-gray-800 flex justify-between items-center max-sm:flex-col gap-5">
            <h2 className="text-3xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
              Edit Customized Product
            </h2>
            <button
              onClick={handleSubmit}
              className="dark:bg-whiteSecondary bg-blackPrimary w-48 py-2 text-lg flex items-center justify-center gap-x-2"
            >
              <HiOutlineSave className="dark:text-blackPrimary text-whiteSecondary text-xl" />
              <span className="dark:text-blackPrimary text-whiteSecondary font-semibold">
                Update product
              </span>
            </button>
          </div>

          {/* Form Section */}
          <form
            onSubmit={handleSubmit}
            className="px-4 sm:px-6 lg:px-8 pb-8 pt-8 grid grid-cols-2 gap-x-10 max-xl:grid-cols-1 max-xl:gap-y-10"
          >
            {/* Left Section */}
            <div>
              <h3 className="text-2xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
                Product Details
              </h3>

              <div className="mt-4 flex flex-col gap-5">
                <InputWithLabel label="Title">
                  <SimpleInput
                    type="text"
                    placeholder="Enter product title..."
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </InputWithLabel>

                <InputWithLabel label="Category">
                  <SelectInput
                    selectList={customizationCategories}
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                  />
                </InputWithLabel>

                <InputWithLabel label="Fabric Type">
                  <SelectInput
                    selectList={fabricType}
                    name="fabricType"
                    value={formData.fabricType}
                    onChange={handleChange}
                  />
                </InputWithLabel>

                <InputWithLabel label="Color">
                  <SimpleInput
                    type="text"
                    placeholder="Enter product color..."
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                  />
                </InputWithLabel>
              </div>

              <h3 className="text-2xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary mt-16">
                Pricing
              </h3>

              <div className="mt-4 flex flex-col gap-5">
                <InputWithLabel label="Base Pricing">
                  <SimpleInput
                    type="number"
                    placeholder="Enter base price..."
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                  />
                </InputWithLabel>

                <InputWithLabel label="Back Image Price">
                  <SimpleInput
                    type="number"
                    placeholder="Enter back image price..."
                    name="extraImgPrice"
                    value={formData.extraImgPrice}
                    onChange={handleChange}
                  />
                </InputWithLabel>

                <InputWithLabel label="Discount Amount">
                  <SimpleInput
                    type="number"
                    placeholder="Enter discount amount..."
                    name="discountAmount"
                    value={formData.discountAmount}
                    onChange={handleChange}
                  />
                </InputWithLabel>
              </div>
            </div>

            {/* Right Section */}
            <div>
              <h3 className="text-2xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
                Product Images
              </h3>

              <div className="flex flex-col gap-5 mt-4">
                <ImageUpload
                  label="Front Image"
                  name="imgFront"
                  onChange={(file) => handleFileChange(file, "imgFront")}
                />
                <ImageUpload
                  label="Back Image"
                  name="imgBack"
                  onChange={(file) => handleFileChange(file, "imgBack")}
                />
                <img src={formData.imgFront} />
                <img src={formData.imgBack} />
              </div>
            </div>
          </form>
        </div>
      </div>
      {loader && <Loader />}
    </div>
  );
};

export default EditCustomizedProducts;
