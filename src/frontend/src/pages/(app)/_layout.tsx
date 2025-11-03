import { AppBar, Breadcrumbs, Drawer, DrawerHeader } from "@/components/blocks";
import { Assessment, BusinessCenter, ChevronLeft, ChevronRight, Menu, ElectricalServices } from "@mui/icons-material";
import { Box, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, useTheme } from "@mui/material";
import * as React from "react";
import { NavLink, Outlet } from "react-router";

const navLinks = [
  {
    label: "Providers",
    to: "/app/providers",
    icon: <BusinessCenter />
  },
  {
    label: "Services",
    to: "/app/services",
    icon: <ElectricalServices />
  },
  {
    label: "Summary",
    to: "/app/summary",
    icon: <Assessment />
  }
]

export default function AppLayout() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);


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
        <Toolbar sx={{ height: 52, minHeight: '52px !important'}}>
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
        <List
          sx={{
            px: 1
          }}
        >
          {navLinks.map((link) => (
            <ListItem disablePadding key={link.to}>
              <ListItemButton
                component={NavLink}
                to={link.to}
                sx={(theme) => ({
                  minHeight: 40,
                  borderRadius: theme.shape.borderRadius,
                  px: 2.5,
                  py: 0,
                  color: theme.palette.text.secondary,
                  "&:hover": {
                    color: theme.palette.primary.dark
                  },
                  "&.active": {
                    color: theme.palette.text.primary,
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
                      color: 'currentcolor'
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
                  {link.icon}
                </ListItemIcon>
                <ListItemText
                  primary={link.label}
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
          ))}
        </List>
      </Drawer>
      <Box 
        component="main" 
        sx={(theme) => ({ 
          flexGrow: 1, 
          p: 3, 
          maxWidth: `calc(100% - ${open ? 250 : 65}px)`, 
          transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        })}
      >
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
}
