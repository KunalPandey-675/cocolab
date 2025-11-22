const Card = ({ children, className = '', hover = false }) => {
  return (
    <div 
      className={`bg-white rounded-lg shadow-md border border-gray-200 p-6 ${
        hover ? 'hover:shadow-lg transition-shadow duration-200' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
