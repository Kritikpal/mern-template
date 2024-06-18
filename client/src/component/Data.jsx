import ErrorComponent from "./common/ErrorComponent";
import LoadingComponent from "./common/LoadingComponent";

function Data({
  hasError = false,
  isLoading = false,
  children = null,
  fallback = <ErrorComponent />,
  loading = <LoadingComponent/>,
}) {
  if (isLoading) {
    return <div>{loading}</div>;
  }
  return <div>{hasError ? fallback : children}</div>;
}

export default Data;
