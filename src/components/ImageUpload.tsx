import React, { useState } from "react";

interface ImageUploadProps {
  label: string;
  name: string;
  onChange: (file: File | null) => void; // Accept onChange prop
}

const ImageUpload: React.FC<ImageUploadProps> = ({ label, name, onChange }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        onChange(file); // Call the onChange handler with the selected file
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
      onChange(null); // Call the onChange handler with null if no file is selected
    }
  };

  return (
    <div className="flex flex-col items-center w-full mt-5">
      <label
        htmlFor={name}
        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-700 border-dashed rounded-lg cursor-pointer dark:bg-blackPrimary bg-whiteSecondary dark:hover:border-gray-600 hover:border-gray-500"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-8 h-8 mb-4 text-blackPrimary dark:text-whiteSecondary"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-blackPrimary dark:text-whiteSecondary">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs dark:text-whiteSecondary text-blackPrimary">
            SVG, PNG, JPG or GIF (MAX. 800x400px)
          </p>
        </div>
        <input
          id={name}
          name={name}
          type="file"
          className="hidden"
          onChange={handleImageChange}
        />
      </label>
      {imagePreview && (
        <div className="mt-2">
          <img
            src={imagePreview}
            alt="Uploaded Preview"
            className="w-full h-auto rounded-lg"
          />
        </div>
      )}
      <span className="text-sm text-gray-600">{label}</span>
    </div>
  );
};

export default ImageUpload;
