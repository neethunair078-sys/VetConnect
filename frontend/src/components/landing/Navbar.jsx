import LogoIcon from '../../assets/logo-icon.png'
import Container from '../layout/Container';

const Navbar = () => {

    const navItems = [
        { name: "Home", href: "#home" },
        { name: "About Us", href: "#about" },
        { name: "Service", href: "#service" },
        // { name: "Food", href: "#food" },
        { name: "Blog", href: "#blog" },
    ];



    return (
        <>
            <Container className='bg-light'>
                <nav className="h-[70px] flex items-center justify-between">
                    {/* Logo Icon */}
                    <img src={LogoIcon} alt="Logo icon" />

                    {/* Navigation */}
                    <div className="hidden md:flex items-center gap-10">

                        {navItems.map((item, index) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className={`text-[13px] font-semibold transition-colors duration-200
                                ${
                                    index === 0
                                    ? "text-text-primary"
                                    : "text-[#4B4541] hover:text-primary"
                                }
                                `}
                            >
                                {item.name}
                            </a>
                        ))}

                    </div>


                    {/* Sign Up */}
          <button
            className="
              bg-primary
              text-white
              text-[13px]
              font-semibold
              px-6
              py-2.5
              rounded-full
              hover:opacity-90
              transition
            "
          >
            Sign Up
          </button>


                </nav>


            </Container>
        </>
    )
}


export default Navbar;