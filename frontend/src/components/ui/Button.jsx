
const Button = ({ children, variant = "primary" }) => {

    const styles = {
        primary: "bg-btn-primary text-text-light",
        secondary: "bg-btn-secondary text-text-primary",
        dark: "bg-btn-dark text-text-light"
    };


    return (
        <button className={`px-4 py-2 rounded-lg font-medium ${styles[variant]}`}>
            {children}
        </button>
    );
}

export default Button;