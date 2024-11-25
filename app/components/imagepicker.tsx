"use client"
import { useState } from "react";
import { icons } from "../common/icons";

const CustomImagePicker: React.FC = () => {
  const [files, setFiles] = useState<string[]>([]);
  const [fileEnter, setFileEnter] = useState<boolean>(false);
  const { IoImagesOutline } = icons

  return (
    <div className="max-w-5xl">
      {
        files.length == 0 ? (
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setFileEnter(true);
            }}
            onDragLeave={() => {
              setFileEnter(false);
            }}
            onDragEnd={(e) => {
              e.preventDefault();
              setFileEnter(false);
            }}
            onDrop={(e) => {
              e.preventDefault();
              setFileEnter(false);
              if (e.dataTransfer.items) {
                const blobUrls: string[] = [];
                [...e.dataTransfer.items].forEach((item, i) => {
                  if (item.kind === "file") {
                    const file = item.getAsFile();
                    if (file) {
                      blobUrls.push(URL.createObjectURL(file))
                    }
                    console.log(`items file[${i}].name = ${file?.name}`)
                  }
                });
                setFiles(blobUrls)
              } else {
                [...e.dataTransfer.files].forEach((file, i) => {
                  console.log(`… file[${i}].name = ${file.name}`);
                });
              }
            }}
            className={`${fileEnter ? "border-4" : "border-2"} bg-white flex flex-col w-full max-w-64 h-72 border-dashed items-center justify-center`}
          >
            <label
              htmlFor="file"
              className="h-full flex flex-col gap-6 justify-center items-center text-center"
            >
              <IoImagesOutline className="w-16 h-16" fill="#347ab6" />
              <span className="text-sm">
                Nhấn vào để tải ảnh lên hoặc kéo thả
              </span>
            </label>
            <input
              multiple
              id="file"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const files = e.target.files;
                if (files) {
                  console.log(e.target.files);
                  const blobUrls: string[] = []
                  for (let i = 0; i < files?.length; i++) {
                    blobUrls.push(URL.createObjectURL(files[i]))
                  }
                  setFiles(blobUrls);
                }
              }}
            />
          </div>
        ) : (
          <div className="">
            <div className="flex flex-wrap overflow-scroll gap-2 h-72">
              {
                files.map((file, i) => {
                  return (
                    <object
                      key={i}
                      className="object-cover rounded-md w-full max-w-64 h-72"
                      data={file}
                      type="image/png" //need to be updated based on type of file
                    />
                  )
                })
              }
            </div>
            <button
              onClick={() => {
                setFiles([]); console.log(files);
              }}
              className="mt-6 p-3 py-2 bg-red-500 text-white rounded-md"
            >
              Đặt lại
            </button>
          </div>
        )
      }
    </div>
  )
}

export default CustomImagePicker