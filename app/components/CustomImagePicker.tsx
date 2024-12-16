"use client"
import { Dispatch, DragEvent, SetStateAction, useEffect, useState } from "react";
import { icons } from "../common/icons";
import Image from "next/image";

const CustomImagePicker: React.FC<{
  images?: string[],
  setImages: Dispatch<SetStateAction<File[]>>,
  isMultiple?: boolean,
  resetAll?: boolean,
}> = ({ images, setImages, isMultiple = true, resetAll = false }) => {
  const [files, setFiles] = useState<{ file: File; url: string }[]>([]);
  const [fileEnter, setFileEnter] = useState<boolean>(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const { IoImagesOutline } = icons;

  useEffect(() => {
    // Load initial images if provided
    if (images) {
      const initialFiles = images.map((image, i) => ({
        file: new File([], `file-${i}`), // Dummy File for existing images
        url: image,
      }));
      setFiles(initialFiles);
    }
  }, [images]);

  useEffect(() => {
    if (resetAll == true) resetImages()
  }, [resetAll])

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setFileEnter(false);

    const newFiles: { file: File; url: string }[] = [];
    if (e.dataTransfer.items) {
      [...e.dataTransfer.items].forEach((item) => {
        if (item.kind === "file") {
          const file = item.getAsFile();
          if (file) {
            const url = URL.createObjectURL(file);
            newFiles.push({ file, url });
          }
        }
      });
    } else {
      [...e.dataTransfer.files].forEach((file) => {
        const url = URL.createObjectURL(file);
        newFiles.push({ file, url });
      });
    }

    setFiles((prev) => [...prev, ...newFiles]);
    setImages((prev) => [...prev, ...newFiles.map(({ file }) => file)]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles: { file: File; url: string }[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const url = URL.createObjectURL(file);
        newFiles.push({ file, url });
      }
      setFiles(newFiles);
      setImages(newFiles.map(({ file }) => file));
    }
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    setFiles((prev) => {
      const updatedFiles = [...prev];
      const [draggedFile] = updatedFiles.splice(draggedIndex, 1);
      updatedFiles.splice(index, 0, draggedFile);
      return updatedFiles;
    });

    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setImages(files.map(({ file }) => file));
  };

  const resetImages = () => {
    files.forEach(({ url }) => URL.revokeObjectURL(url));
    setFiles([]);
    setImages([]);
  };

  return (
    <div className="max-w-5xl">
      {/* Dropzone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setFileEnter(true);
        }}
        onDragLeave={() => setFileEnter(false)}
        onDrop={handleDrop}
        className={`${fileEnter ? "border-4" : "border-2"} ${files.length < 1 ? "block" : "hidden"} bg-white flex flex-col w-full max-w-56 h-64 border-dashed items-center justify-center`}
      >
        <label htmlFor="file" className="h-full flex flex-col gap-6 justify-center items-center text-center">
          <IoImagesOutline className="w-16 h-16" fill="#347ab6" />
          <span className="text-sm">Nhấn vào để tải ảnh lên hoặc kéo thả</span>
        </label>
        <input
          name="file"
          multiple={isMultiple}
          id="file"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* Images */}
      <div className={`${files.length > 0 ? "block" : "hidden"}`}>
        <div className="flex flex-wrap overflow-scroll gap-2 h-64 image-container">
          {
            files.map((file, index) => (
              <div
                key={index}
                className="bg-gray-200 rounded-md relative w-full max-w-56 h-64"
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
              >
                <Image
                  fill
                  className="object-cover rounded-md"
                  src={file.url}
                  alt={`Uploaded file ${index}`}
                  sizes="width: 100%, height: 100%"
                />
              </div>
            ))
          }
        </div>
        <div
          onClick={resetImages}
          className="cursor-pointer w-fit mt-6 p-3 py-2 bg-red-500 text-white rounded-md"
        >
          Đặt lại
        </div>
      </div>
    </div>
  );
};

export default CustomImagePicker;
