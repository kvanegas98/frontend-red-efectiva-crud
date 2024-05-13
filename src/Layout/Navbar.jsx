import Logo from '../assets/logo.png';
const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-background"></div>
            <div className="navbar-content">
                <div className="title-container">
                    <img src={Logo} alt="Logo" className="navbar-logo" />
                    <div className="navbar-title">
                        <p>Prueba técnica CRUD</p>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
