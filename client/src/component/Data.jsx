function Data({
  hasError = false,
  isLoading = false,
  children = null,
  fallback = null,
  loading = null,
}) {
  if (isLoading) {
    return <div>{loading}</div>;
  }
  return <div>{hasError ? fallback : children}</div>;
}

export default Data;
