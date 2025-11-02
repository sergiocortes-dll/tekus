import { createBrowserRouter } from "react-router";
import Countries from "./pages/(app)/countries";
import CountryForm from "./pages/(app)/countries/form";
import Providers from "./pages/(app)/providers";
import ProviderForm from "./pages/(app)/providers/form";
import Services from "./pages/(app)/services";
import ServiceForm from "./pages/(app)/services/form";
import Layout from "./pages/_layout";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <div>Hola</div>,
      },
      {
        path: "providers",
        children: [
          {
            index: true,
            element: <Providers />,
          },
          {
            path: "new",
            element: <ProviderForm />,
          },
          {
            path: ":id",
            element: <ProviderForm />,
          },
        ],
      },
      {
        path: "countries",
        children: [
          {
            index: true,
            element: <Countries />,
          },
          {
            path: "new",
            element: <CountryForm />,
          },
          {
            path: ":id",
            element: <CountryForm />,
          },
        ],
      },
      {
        path: "services",
        children: [
          {
            index: true,
            element: <Services />,
          },
          {
            path: "new",
            element: <ServiceForm />,
          },
          {
            path: ":id",
            element: <ServiceForm />,
          },
        ],
      },
    ],
  },
]);
