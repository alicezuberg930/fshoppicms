"use client"
import { useState } from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { login } from "../services/auth.action"
import { PATH } from "../common/path"

const LoginPage: React.FC = () => {
  const [phone, setPhone] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const router = useRouter()

  const loginAction = async () => {
    try {
      const response = await login(phone, password)
      toast.success(response)
      router.push(PATH.CATEGORIES)
    } catch (error) {
      toast.error(error as string)
    }
  }

  return (
    <div className="w-full h-screen relative" style={{ background: "url('../assets/wall_1.jpg')" }}>
      <div className="w-1/4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <img className="mx-auto w-3/5" src="../logo.png" />
        <div className="mt-4 rounded-lg login-body bg-[rgba(255,255,255,0.2)] px-4 py-8">
          <div className="font-bold text-white text-xl border-double border-b-4">Site: fshoppii.com</div>
          {/* <form onSubmit={(e) => e.preventDefault()}> */}
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
            <div onClick={() => loginAction()} className="text-white bg-[#5bc0de] px-16 py-2 rounded-md">
              <button>Log In</button>
            </div>
          </div>
          {/* </form> */}
        </div>
      </div>
    </div>
  )
}

export default LoginPage