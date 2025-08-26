const PerfilUserPage = () => {

    const user = JSON.parse(localStorage.getItem("user") || "{}")

    console.log(user)
    
    return (
        <div>
            Pagina de configurações do usuario
            <h3>{user.name}</h3>
            <h4>{user.phone}</h4>
            <h4>{user.email}</h4>
            <img src={user.photo} className="w-[40px] h-[40px]"/>
            <h4>{user.password}</h4>
        </div>
    )
}

export default PerfilUserPage