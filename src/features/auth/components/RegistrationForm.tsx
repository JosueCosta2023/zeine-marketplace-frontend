import { FiArrowRight, FiCamera, FiCheck, FiEye, FiEyeOff, FiLock, FiMail, FiPhone, FiUser } from "react-icons/fi"
import Input from "./Input"
import { useRef, useState } from "react"
import Button from "./Button"



const RegistrationForm = () => {

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [image, setImage] = useState<string| null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)


    const handleSubmitRegister = (e: React.FormEvent) => {
        e.preventDefault()
        alert("Bem vindo, cadastro realizado com sucesso.")
    }

    const handleImagechange = (e:React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files && e.target.files[0]){
            const reader = new FileReader()
            reader.onload = (ev) => setImage(ev.target?.result as string)

            reader.readAsDataURL(e.target.files[0])
        }
    }

    return(
        <form onSubmit={handleSubmitRegister}>
            {/* Perfil */}
            <section className="mb-12">
                <h3 className="text-lg font-semibold mb-5">Perfil</h3>

                {/* Input de imagem do perfil */}
                <div className="flex flex-col items-start mb-6">
                    <div
                        className="w-[120px] h-[120px] rounded-[10px] bg-gray-100 flex items-center justify-center cursor-pointer overflow-hidden bg-primartLight text-primary relative"
                        onClick={() =>  fileInputRef.current?.click()}
                        tabIndex={0}
                        aria-label="Selecionar imagem de perfil"
                    >
                        {image ? (
                            <>
                                <img src={image} alt="Imagem de perfil" className="w-full h-hull object-cover"/>
                                <span className="absolute bottom-[-2px] right-[-2px] bg-white rounded-full p-1 shadow">
                                    <FiCheck className="text-green-600 text-xl"/>
                                </span>
                            </>
                    
                        ) : ( <FiCamera/> )}

                        <input 
                            type="file" 
                            accept="image/"
                            className="hidden"
                            ref={fileInputRef}
                            onChange={handleImagechange}
                            />
                    </div>
                </div>

                <Input
                    label="Nome Completo"
                    type="text"
                    placeholder="Digite seu nome completo"
                    icon={<FiUser/>}
                    required
                
                />
                <Input
                    label="Telefone"
                    type="tel"
                    placeholder="(00) 0 0000 - 0000"
                    icon={<FiPhone/>}
                    required
                />
            </section>
            {/* Acesso */}
            <section className="mb-12">
                <h3 className="text-lg font-semibold mb-5">Acesso</h3>
                <Input
                    label="E-Mail"
                    type="email"
                    placeholder="Seu e-mail de acesso"
                    icon={<FiMail/>}
                    required
                
                />
                <div className="relative mb-4">
                    <Input
                        label="Senha"
                        type={showPassword ? "text": "password"}  
                        placeholder="Crie sua senha de acesso"            
                        icon={<FiLock/>}
                        required
                        autoComplete="new-password"      
                    />

                    <button
                        type="button"
                        className="absolute right-3 top-12 text-gray-400"
                        onClick={() => setShowPassword((prev) => !prev)}
                        tabIndex={0}
                        aria-label={showPassword ? "Ocultar senha" : "Exibir senha"}
                    >
                        {showPassword ? <FiEyeOff/> : <FiEye/> }
                    </button>
                </div>
                <div className="relative mb-4">
                    <Input
                        label="Confirmar Senha"
                        type={showConfirmPassword ? "text": "password"}  
                        placeholder="Confime sua senha de acesso"            
                        icon={<FiLock/>}
                        required
                        autoComplete="new-password"      
                    />

                    <button
                        type="button"
                        className="absolute right-3 top-12 text-gray-400"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        tabIndex={0}
                        aria-label={showConfirmPassword ? "Ocultar senha" : "Exibir senha"}
                    >
                        {showConfirmPassword ? <FiEyeOff/> : <FiEye/> }
                    </button>
                </div>
            </section>

            <Button type="submit">
                Cadastrar <span className="ml-2"><FiArrowRight/></span>
            </Button>
        </form>
    )
}

export default RegistrationForm