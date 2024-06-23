import ErrorComponent from "./common/ErrorComponent";
import LoadingComponent from "./common/LoadingComponent";

function Data({
  hasError = false,
  isLoading = false,
  children = null,
  fallbackMessage = "Something went wrong",
  loading = <LoadingComponent />,
}) {
  if (isLoading) {
    return <div>{loading}</div>;
  }
  return (
    <div>
      {hasError ? <ErrorComponent message={fallbackMessage} /> : children}
    </div>
  );
}

export default Data;
