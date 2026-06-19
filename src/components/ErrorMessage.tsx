type ErrorMessageProps = {
  message: string;
};

function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="app_error">
      <i className="fa-solid fa-triangle-exclamation"></i> {message}
    </div>
  );
}
export default ErrorMessage;
