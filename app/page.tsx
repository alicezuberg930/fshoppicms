"use client"
import { useState } from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { login } from "./services/auth.service"
import { PATH } from "@/app/common/path";
import Image from "next/image"

const LoginPage: React.FC = () => {
  const [phone, setPhone] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const router = useRouter()

  const loginAction = async () => {
    const response = await login(phone, password)
    if (response?.error) {
      toast.error(response.error)
    } else {
      toast.success("Đăng nhập thành công")
      router.push(PATH.CATEGORIES)
    }
  }

  return (
    <div className="h-screen relative" style={{ background: "url('../assets/wall_1.jpg')" }}>
      <div className="mx-auto pt-24 px-8 max-w-[500px]">
        <Image className="mx-auto" width={200} height={120} alt="logo" src="/logo.png" />
        <div className="mt-4 w-full rounded-lg login-body bg-[rgba(255,255,255,0.2)] px-4 py-8">
          <div className="font-bold text-white text-lg border-double border-b-4">Site: fshoppii.com</div>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mt-6">
              <div className="">
                <input type="text" onChange={(e) => setPhone(e.target.value)} className="border-gray-300 p-2 border focus:border-blue-500 rounded-md w-full outline-none" placeholder="Username" />
              </div>
            </div>
            <div className="mt-6">
              <div className="">
                <input type="password" onChange={(e) => setPassword(e.target.value)} className="border-gray-300 p-2 border focus:border-blue-500 rounded-md w-full outline-none" placeholder="Password" />
              </div>
            </div>
            <div className="mt-6 w-fit">
              <div onClick={() => loginAction()} className="text-white bg-[#5bc0de] px-12 py-2 rounded-md">
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