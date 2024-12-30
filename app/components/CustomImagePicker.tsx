'use client'
import { Dispatch, DragEvent, SetStateAction, useEffect, useState } from 'react'
import { icons } from '../common/icons'
import Image from 'next/image'
import { toast } from 'react-toastify'

const CustomImagePicker: React.FC<{
  images?: string[],
  setImages?: Dispatch<SetStateAction<File[]>>,
  isMultiple?: boolean,
  resetAll?: boolean,
  limit?: number,
  id: string,
  showTitle?: boolean,
  isDisabled?: boolean,
  hideEdit?: boolean
}> = ({ images, setImages, isMultiple = true, resetAll = false, limit = isMultiple ? 9 : 1, id, showTitle = true, isDisabled = false, hideEdit = false }) => {
  const [tempfiles, setFiles] = useState<{ file: File, url: string }[]>([])
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const { RiImageAddFill, FaRegTrashAlt, MdModeEdit } = icons

  useEffect(() => {
    // Load initial images if provided
    if (images && images[0] != "") {
      const initialFiles = images.map((image, i) => ({
        file: new File([], `file-${i}`), // Dummy File for existing images
        url: image,
      }))
      setFiles(initialFiles)
    }
  }, [images])

  useEffect(() => {
    if (resetAll == true) resetImages()
  }, [resetAll])

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.dataTransfer.items.length > limit) toast.error(`Bạn chỉ có thể tải lên không quá ${limit} file`)
    const newFiles: { file: File, url: string }[] = []
    if (e.dataTransfer.items) {
      [...e.dataTransfer.items].forEach((item) => {
        if (item.kind === 'file') {
          const file = item.getAsFile()
          if (file) {
            const url = URL.createObjectURL(file)
            newFiles.push({ file, url })
          }
        }
      })
    }
    setFiles((prev) => [...prev, ...newFiles].slice(0, limit))
    setImages && setImages((prev) => [...prev, ...newFiles.map(f => f.file)].slice(0, limit))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files!.length > limit) toast.error(`Bạn chỉ có thể tải lên không quá ${limit} file`)
    if (files) {
      let newFiles: { file: File, url: string }[] = []
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const url = URL.createObjectURL(file)
        newFiles.push({ file, url })
      }
      newFiles = newFiles.slice(0, 8)
      setFiles(prev => [...prev, ...newFiles].slice(0, limit))
      setImages && setImages(prev => [...prev, ...newFiles.map(f => f.file)].slice(0, limit))
    }
  }

  const handleDragStart = (index: number) => {
    setDraggedIndex(index)
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault()
    if (draggedIndex === null || draggedIndex === index) return

    setFiles((prev) => {
      const updatedFiles = [...prev]
      const [draggedFile] = updatedFiles.splice(draggedIndex, 1)
      updatedFiles.splice(index, 0, draggedFile)
      return updatedFiles
    })

    setDraggedIndex(index)
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
    setImages && setImages(tempfiles.map(f => f.file))
  }

  const resetImages = () => {
    tempfiles.forEach(f => URL.revokeObjectURL(f.url))
    setFiles([])
    setImages && setImages([])
  }

  return (
    <div className='text-blue-500 flex flex-wrap gap-3'>
      {/* Image list */}
      <div className={`${tempfiles.length > 0 ? 'block' : 'hidden'}`}>
        <div className='flex flex-wrap gap-3 image-container'>
          {
            tempfiles.map((file, i) => (
              <div draggable key={i} className='group'
                onDragStart={() => handleDragStart(i)}
                onDragOver={(e) => handleDragOver(e, i)}
                onDragEnd={handleDragEnd}
              >
                <div className='rounded-md overflow-hidden relative h-20 w-20 bg-gray-300'>
                  <Image fill className='object-cover'
                    src={file.url}
                    alt={`Uploaded file ${i}`}
                    sizes='width: 100%, height: 100%'
                  />
                  {
                    !hideEdit && <div className='group-hover:block hidden'>
                      <div className='text-white w-full py-1 bg-[#000000b3] bottom-0 left-0 right-0 absolute flex items-center justify-center'>
                        <span className='pr-3'>
                          <MdModeEdit size={16} />
                        </span>
                        <span>|</span>
                        <span className='pl-3' onClick={() => {
                          setFiles(prev => prev.filter((_, index) => index != i))
                          setImages && setImages(prev => prev.filter((_, index) => index != i))
                        }}>
                          <FaRegTrashAlt size={16} />
                        </span>
                      </div>
                    </div>
                  }
                </div>
              </div>
            ))
          }
        </div>
      </div>
      {/* Dropzone */}
      <div onDragOver={(e) => { e.preventDefault() }} onDrop={handleDrop}
        className={`${tempfiles.length < limit ? 'block' : 'hidden'} bg-white flex flex-col border border-dashed rounded-md items-center justify-center h-20 w-20`}
      >
        <label htmlFor={id} className='flex flex-col justify-center items-center'>
          <RiImageAddFill size={24} />
          {showTitle && <span className='text-xs text-center'>Thêm hình ảnh ({tempfiles.length}/{limit})</span>}
        </label>
        <input multiple={isMultiple} disabled={isDisabled} type='file' accept='image/*' id={id} className='hidden option-file-input' onChange={handleFileChange} />
      </div>
    </div>
  )
}

export default CustomImagePicker
