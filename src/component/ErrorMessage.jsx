const ErrorMessage = ({ message }) => {
  return (
    <div className="alert alert-danger text-center" role="alert">
      {message || "Something went wrong"}
    </div>
  );
};

export default ErrorMessage;
