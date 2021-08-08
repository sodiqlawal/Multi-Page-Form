import Layout from "components/Layout/Layout";
import Spinner from "components/Spinner/Spinner";
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
const Home = lazy(() => import("pages/Home/Home"));
const CreateProduct = lazy(() => import("pages/CreateProduct/CreateProduct"));

const AppRoute = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Layout>
        <div className="app">
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/create-product" component={CreateProduct} />
              <Route path="/edit-product" component={CreateProduct} />
            </Switch>
          </Router>
        </div>
      </Layout>
    </Suspense>
  );
};

export default AppRoute;
