import { useState } from "react"
import Input from "./Input"
import { FiArrowRight, FiEye, FiEyeOff, FiLock, FiMail } from "react-icons/fi"
import Button from "./Button"
import { useNavigate } from "react-router-dom"



const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const handleSubmitLogin = (e: React.FormEvent) => {
        e.preventDefault()
        navigate("/admin")
    }
    return(
        <form action="" onSubmit={handleSubmitLogin}>
            <Input
                label="E-Mail"
                type="email"
                placeholder="Seu e-mail cadastrado"
                icon={<FiMail/>}
                required
            />
            <div className="relative mb-12">
                <Input
                    label="Senha"
                    type={showPassword ? "text" : "password"}
                    placeholder="Informe sua senha"
                    icon={<FiLock/>}
                    required
                    autoComplete="current-password"
                />
                <button
                    type="button"
                    className="absolute right-3 top-12 text-gray-400"
                    onClick={() => setShowPassword((prev) => !prev)}
                >
                    { showPassword ? <FiEyeOff/> : <FiEye/>}
                </button>
            </div>

            <Button type="submit">
                    Acessar <span className="ml-2"> <FiArrowRight/> </span>
            </Button>

            
        </form>
    )
}

export default LoginForm