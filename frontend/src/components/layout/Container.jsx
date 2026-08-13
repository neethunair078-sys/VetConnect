const Container = ({ children, className = "" }) => {
  return (
    <div
      className={`
        w-full
        max-w-7xl
        mx-auto
        px-6
        sm:px-8
        lg:px-10
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export default Container;