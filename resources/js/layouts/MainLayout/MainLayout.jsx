import { Link } from "@inertiajs/inertia-react";
import { AccountCircle, Add, FolderOutlined, Menu as MenuIcon } from "@mui/icons-material";
import { AppBar, Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Paper, Stack, Toolbar, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { useState } from "react";

function SidebarContents() {
    const theme = useTheme()
    const pathname = new URL(window.location.href).pathname
    const contents = [
        {
            icon: <Add />,
            text: "Submit Dokumen",
            link: "/",
        },
        {
            icon: <FolderOutlined />,
            text: "Daftar Dokumen",
            link: "/daftar",
        },
    ]

    return (
        <List>
            {contents.map((v, i) => {
                const isActive = pathname === v.link;
                return (
                    <ListItem
                        key={i}
                        disablePadding
                        sx={{
                            backgroundColor: isActive ? `${theme.palette.primary.main}1f` : 'transparent',
                            color: isActive ? theme.palette.primary.main : 'inherit',
                        }}
                    >
                        <ListItemButton sx={{ px: 3, py: 2 }} component={Link} method="get" href={v.link}>
                            <ListItemIcon>
                                <span style={{ color: isActive ? theme.palette.primary.main : 'inherit', }}>
                                    {v.icon}
                                </span>
                            </ListItemIcon>
                            <ListItemText primary={v.text} />
                        </ListItemButton>
                    </ListItem>
                )
            })}
        </List>
    )

}

export default function MainLayout({ children, title = "Tanda Tangan Elektronik", noSidebar = false }) {
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [profileMenuAnchor, setProfileMenuAnchor] = useState(null)


    function handleOpenProfileMenu(event) {
        setProfileMenuAnchor(event.currentTarget)
    }

    function handleCloseProfileMenu() {
        setProfileMenuAnchor(null)
    }


    return (
        <Stack sx={{ height: "100vh", width: "100vw" }} direction="column">
            <AppBar sx={{ zIndex: 1 }} position="static">
                <Toolbar>
                    {noSidebar ? null :
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2, display: { md: "none" } }}
                            onClick={() => setDrawerOpen(true)}
                        >
                            <MenuIcon />
                        </IconButton>}
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {title}
                    </Typography>
                    <div>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="profile-menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenProfileMenu}
                            color="inherit"
                        >
                            <Typography sx={{ display: { xs: "none", sm: "block" } }}>Isa Mulia Insan</Typography>
                            <AccountCircle sx={{ mx: 1 }} />
                        </IconButton>
                        <Menu
                            id="profile-menu-appbar"
                            anchorEl={profileMenuAnchor}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(profileMenuAnchor)}
                            onClose={handleCloseProfileMenu}
                        >
                            <MenuItem onClick={handleCloseProfileMenu}>Profile</MenuItem>
                            <MenuItem onClick={handleCloseProfileMenu}>Log Out</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
            {noSidebar ? null :
                <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                    <Box sx={{ width: 300 }} role="presentation" onClick={() => setDrawerOpen(false)}>
                        <Typography sx={{ p: 2 }} align="center" variant="h6">
                            Tanda Tangan Elektronik
                        </Typography>
                        <Divider />
                        <SidebarContents />
                    </Box>
                </Drawer>}

            <Stack sx={{ flexGrow: 1, overflow: "hidden" }} direction="row">
                {noSidebar ? null :
                    <Paper sx={{ width: 300, display: { xs: "none", md: "block" } }} elevation={4}>
                        <SidebarContents />
                    </Paper>}
                <Box sx={{ flexGrow: 1, overflow: "auto", height: "100%" }}>
                    {children}
                </Box>
            </Stack>
        </Stack>
    )
}