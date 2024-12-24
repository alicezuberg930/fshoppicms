"use client"
import { FormEvent, useEffect } from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { login } from "./services/auth.service"
import { PATH } from "@/app/common/path"
import Image from "next/image"

const LoginPage: React.FC = () => {
  const router = useRouter()

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const credentials: any = Object.fromEntries(formData.entries())
    const response = await login(credentials.phone, credentials.password)
    if (response?.error) {
      toast.error(response.error)
    } else {
      toast.success("Đăng nhập thành công")
      router.push(PATH.CATEGORIES)
    }
  }

  return (
    <div className="h-screen w-full" style={{ background: "url('../assets/wall_1.jpg')" }}>
      <div className="mx-auto pt-24 px-8 max-w-[500px]">
        <Image className="mx-auto w-auto h-auto" priority width={200} height={120} alt="logo" src="/logo.png" />
        <div className="mt-4 w-full rounded-lg login-body bg-[rgba(255,255,255,0.2)] px-4 py-8">
          <div className="font-bold text-white text-lg border-double border-b-4">Site: fshoppii.com</div>
          <form onSubmit={handleLogin}>
            <div className="mt-6">
              <div className="">
                <input type="text" name="phone" className="border-gray-300 p-2 border focus:border-blue-500 rounded-md w-full outline-none" placeholder="Số điện thoại" autoComplete="on" />
              </div>
            </div>
            <div className="mt-6">
              <div className="">
                <input type="password" name="password" className="border-gray-300 p-2 border focus:border-blue-500 rounded-md w-full outline-none" placeholder="Mật khẩu" autoComplete="on" />
              </div>
            </div>
            <div className="mt-6 w-fit">
              <div className="text-white bg-[#5bc0de] px-12 py-2 rounded-md">
                <button>Log In</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage