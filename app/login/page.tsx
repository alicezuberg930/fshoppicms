"use client"

import { login } from "@/app/services/api"
import { saveToken } from "@/app/services/loginSlice"
import { useState } from "react"
import { toast } from "react-toastify"
import { useDispatch } from "react-redux"
import { useRouter } from "next/navigation"

const LoginPage: React.FC = () => {
  const [phone, setPhone] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const dispatch = useDispatch()
  const router = useRouter()

  const signIn = async () => {
    try {
      const data = await login(phone, password);
      toast.success(data)
      dispatch(saveToken(data))
      router.push("/cms/products/current")
    } catch (error) {
      toast.error(error as string)
    }
  }

  return (
    <div className="w-full h-screen relative" style={{ background: "url('../assets/wall_1.jpg')" }}>
      <div className="w-1/4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-[220px] h-[50px] mx-auto" style={{ background: "url('../assets/login_logo.png')" }}></div>
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
            <div onClick={() => signIn()} className="text-white bg-[#5bc0de] px-16 py-2 rounded-md">
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