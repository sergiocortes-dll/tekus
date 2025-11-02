import { AppBar, Breadcrumbs, Drawer, DrawerHeader } from "@/components/blocks";
import { Assessment, BusinessCenter, ChevronLeft, ChevronRight, Menu } from "@mui/icons-material";
import { Box, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, useTheme } from "@mui/material";
import * as React from "react";
import { NavLink, Outlet } from "react-router";

export default function AppLayout() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        color="inherit"
        position="fixed"
        open={open}

        elevation={0}
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        <Toolbar variant="dense">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                mr: 2,
              },
              open && { display: "none" },
            ]}
          >
            <Menu />
          </IconButton>
          {!open && (
            <Box sx={{ display: 'flex', gap: 1, mr: 1}}>
              <Typography variant="h6" noWrap component="div">
                Tekus
              </Typography>
              <Divider variant="middle" flexItem orientation="vertical" />
            </Box>
          )}
          <Breadcrumbs />
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Typography variant="h6" noWrap component="div" sx={{ flex: 1 }}>
            Tekus
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton
              component={NavLink}
              to="/app/providers"
              sx={(theme) => ({
                minHeight: 48,
                px: 2.5,
                "&.active": {
                  background: theme.palette.action.selected,
                },
                justifyContent: open ? "initial" : "center",
              })}
            >
              <ListItemIcon
                sx={[
                  {
                    minWidth: 0,
                    justifyContent: "center",
                  },
                  open
                    ? {
                        mr: 3,
                      }
                    : {
                        mr: "auto",
                      },
                ]}
              >
                <BusinessCenter />
              </ListItemIcon>
              <ListItemText
                primary={"Providers"}
                sx={[
                  open
                    ? {
                        opacity: 1,
                      }
                    : {
                        opacity: 0,
                      },
                ]}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component={NavLink}
              to="/app/summary"
              sx={(theme) => ({
                minHeight: 48,
                px: 2.5,
                "&.active": {
                  background: theme.palette.action.selected,
                },
                justifyContent: open ? "initial" : "center",
              })}
            >
              <ListItemIcon
                sx={[
                  {
                    minWidth: 0,
                    justifyContent: "center",
                  },
                  open
                    ? {
                        mr: 3,
                      }
                    : {
                        mr: "auto",
                      },
                ]}
              >
                <Assessment />
              </ListItemIcon>
              <ListItemText
                primary={"Summary"}
                sx={[
                  open
                    ? {
                        opacity: 1,
                      }
                    : {
                        opacity: 0,
                      },
                ]}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
}
