'use client'
import { Dispatch, DragEvent, SetStateAction, useEffect, useState } from 'react';
import { icons } from '../common/icons';
import Image from 'next/image';
import { toast } from 'react-toastify';

const CustomImagePicker: React.FC<{
  images?: string[],
  setImages: Dispatch<SetStateAction<File[]>>,
  isMultiple?: boolean,
  resetAll?: boolean,
  limit?: number,
  isDisabled?: boolean
}> = ({ images, setImages, isMultiple = true, resetAll = false, limit = 9, isDisabled = false }) => {
  console.log({ limit, isDisabled });

  const [tempfiles, setFiles] = useState<{ file: File; url: string }[]>([]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const { RiImageAddFill, FaRegTrashAlt, MdModeEdit } = icons;

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
    if (e.dataTransfer.items.length > limit) toast.error(`Bạn chỉ có thể tải lên không quá ${limit} file`)
    const newFiles: { file: File; url: string }[] = [];
    if (e.dataTransfer.items) {
      [...e.dataTransfer.items].forEach((item) => {
        if (item.kind === 'file') {
          const file = item.getAsFile();
          if (file) {
            const url = URL.createObjectURL(file);
            newFiles.push({ file, url });
          }
        }
      });
    }
    setFiles((prev) => [...prev, ...newFiles].slice(0, limit));
    setImages((prev) => [...prev, ...newFiles.map(f => f.file).slice(0, limit)]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files!.length > limit) toast.error(`Bạn chỉ có thể tải lên không quá ${limit} file`)
    if (files) {
      let newFiles: { file: File; url: string }[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const url = URL.createObjectURL(file);
        newFiles.push({ file, url });
      }
      newFiles = newFiles.slice(0, 8)
      setFiles(prev => [...prev, ...newFiles].slice(0, limit));
      setImages(prev => [...prev, ...newFiles.map(f => f.file)].slice(0, limit));
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
    setImages(tempfiles.map(f => f.file));
  };

  const resetImages = () => {
    tempfiles.forEach(f => URL.revokeObjectURL(f.url));
    setFiles([]);
    setImages([]);
  };

  return (
    <div className='text-blue-500 flex flex-wrap gap-5'>
      {/* Image list */}
      <div className={`${tempfiles.length > 0 ? 'block' : 'hidden'}`}>
        <div className='flex flex-wrap gap-5 image-container'>
          {
            tempfiles.map((file, i) => (
              <div key={i} draggable
                className='group rounded-md overflow-hidden relative h-20 w-20 bg-gray-300'
                onDragStart={() => handleDragStart(i)}
                onDragOver={(e) => handleDragOver(e, i)}
                onDragEnd={handleDragEnd}
              >
                <Image fill className='object-cover'
                  src={file.url}
                  alt={`Uploaded file ${i}`}
                  sizes='width: 100%, height: 100%'
                />
                <div className='group-hover:block hidden'>
                  <div className='text-white w-full py-1 bg-[rgba(0,0,0,0.7)] bottom-0 left-0 right-0 absolute flex items-center justify-center'>
                    <button className='pr-3'>
                      <MdModeEdit size={16} />
                    </button>
                    <span>|</span>
                    <button className='pl-3' onClick={() => {
                      setFiles(prev => prev.filter((_, index) => index != i))
                      setImages(prev => prev.filter((_, index) => index != i))
                    }}>
                      <FaRegTrashAlt size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
      {/* Dropzone */}
      <div
        onDragOver={(e) => { e.preventDefault() }}
        // onDragLeave={() => setFileEnter(false)}
        onDrop={handleDrop}
        className={`${tempfiles.length < limit ? 'block' : 'hidden'} bg-white flex flex-col border border-dashed rounded-md items-center justify-center h-20 w-20`}
      >
        <label htmlFor='file' className='flex flex-col justify-center items-center text-center'>
          <RiImageAddFill size={24} />
          <span className='text-xs'>Thêm hình ảnh ({tempfiles.length}/9)</span>
        </label>
        <input
          name='file'
          multiple={isMultiple}
          id='file'
          type='file'
          accept='image/*'
          className='hidden'
          onChange={handleFileChange}
          disabled={isDisabled}
          readOnly={isDisabled}
        />
      </div>
    </div>
  );
};

export default CustomImagePicker;
