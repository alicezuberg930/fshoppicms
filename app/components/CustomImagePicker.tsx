"use client"
import { useEffect, useState } from "react";
import { icons } from "../common/icons";

const CustomImagePicker: React.FC<{ images?: string[], setImages: (v: File[]) => void, isMultiple?: boolean }> = ({ images, setImages, isMultiple = true }) => {
  const [files, setFiles] = useState<string[]>(images || []);
  const [fileEnter, setFileEnter] = useState<boolean>(false);
  const { IoImagesOutline } = icons

  useEffect(() => {
    setFiles(images || [])
  }, [images])

  console.log(files);

  return (
    <div className="max-w-5xl">
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
          const tempFiles: File[] = []
          const blobUrls: string[] = [];
          if (e.dataTransfer.items) {
            [...e.dataTransfer.items].forEach((item, i) => {
              if (item.kind === "file") {
                const file = item.getAsFile();
                if (file) {
                  tempFiles.push(file)
                  blobUrls.push(URL.createObjectURL(file))
                }
                const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
                fileInput.files = e.dataTransfer.files
                // console.log(fileInput.files);
                // console.log(`items file[${i}].name = ${file?.name}`)
              }
            });
            setImages(tempFiles)
            setFiles(blobUrls)
          } else {
            [...e.dataTransfer.files].forEach((file, i) => {
              console.log(`… file[${i}].name = ${file.name}`);
            });
          }
        }}
        className={`${fileEnter ? "border-4" : "border-2"} ${files.length < 1 ? 'block' : 'hidden'} bg-white flex flex-col w-full max-w-64 h-72 border-dashed items-center justify-center`}
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
          onChange={(e) => {
            const files = e.target.files;
            if (files) {
              const tempFiles: File[] = []
              const blobUrls: string[] = []
              for (let i = 0; i < files?.length; i++) {
                tempFiles.push(files[i])
                blobUrls.push(URL.createObjectURL(files[i]))
              }
              setFiles(blobUrls);
              setImages(tempFiles)
            }
          }}
        />
      </div>

      <div className={`${files.length > 0 ? 'block' : 'hidden'}`}>
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
            setFiles([]);
            setImages([])
          }}
          className="mt-6 p-3 py-2 bg-red-500 text-white rounded-md"
        >
          Đặt lại
        </button>
      </div>
    </div >
  )
}

export default CustomImagePicker