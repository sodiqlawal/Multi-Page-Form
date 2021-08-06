import "react-router-dom";

declare module "react-router-dom" {
  function useParams<T = {}>(): T;
}
