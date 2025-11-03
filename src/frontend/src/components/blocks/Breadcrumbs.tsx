/* eslint-disable @typescript-eslint/no-explicit-any */
import { Home } from "@mui/icons-material";
import MuiBreadCrumbs from "@mui/material/Breadcrumbs";
import { Link as RouterLink, useLocation } from 'react-router';
import { Breadcrumb } from "../ui";

const breadcrumbNameMap: { [key: string ]: string } = {
  '/app': "Home",
  '/app/providers': "Providers"
};

export default function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  return (
    <MuiBreadCrumbs>
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;

        if (last) {
          return (
            <Breadcrumb
              key={to}
              label={breadcrumbNameMap[to] || value}
            />
          );
        }

        return (
          <Breadcrumb
            key={to}
            component={RouterLink as any}
            to={to}
            label={breadcrumbNameMap[to] || value}
            icon={index === 0 ? <Home fontSize="small" /> : undefined}
            clickable
          />
        );
      })}
    </MuiBreadCrumbs>
  );
}
