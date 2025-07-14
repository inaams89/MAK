export function H1({ children, className = '' }) {
    return (
      <h1 className={`text-3xl font-bold leading-tight ${className}`}>
        {children}
      </h1>
    );
  }
  
  export function H2({ children, className = '' }) {
    return (
      <h2 className={`text-2xl font-semibold leading-snug ${className}`}>
        {children}
      </h2>
    );
  }
  
  export function H3({ children, className = '' }) {
    return (
      <h3 className={`text-xl font-semibold leading-relaxed ${className}`}>
        {children}
      </h3>
    );
  }
  
  export function H4({ children, className = '' }) {
    return (
      <h4 className={`text-4xl font-bold text-center text-primary leading-relaxed ${className}`}>
        {children}
      </h4>
    );
  }
  
  export function H5({ children, className = '' }) {
    return (
      <h5 className={`text-base font-medium leading-normal ${className}`}>
        {children}
      </h5>
    );
  }
  
  export function H6({ children, className = '' }) {
    return (
      <h6 className={`text-sm font-normal leading-normal ${className}`}>
        {children}
      </h6>
    );
  }