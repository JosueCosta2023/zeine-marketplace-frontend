import { useState } from "react"
import Input from "./Input"
import { FiArrowRight, FiEye, FiEyeOff, FiLock, FiMail } from "react-icons/fi"
import Button from "./Button"


const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false)
    return(
        <form action="">
            <Input
                label="E-Mail"
                type="email"
                placeholder="Seu e-mail cadastrado"
                icon={<FiMail/>}
                required
            />
            <div className="relative">
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
                    className="absolute right-3 top-9 text-gray-400"
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