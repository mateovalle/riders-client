import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import './NavBar.css'
import logo from '../../assets/ridersLogo.png'

const NavBar = () => {
    const [token, setToken] = useState(window.localStorage.getItem('token'))
    const navigate = useNavigate()
    const location = useLocation();

    useEffect(() => {
        setToken(localStorage.getItem('token'))
    })

    window.addEventListener('storage', (e) => {
        console.log('listening to storage')
        setToken(localStorage.getItem('token'))
    })

    const pages = [/*
        {text: 'Home', onClick: () => navigate('/home')},
        {text: 'New Call', onClick: () => navigate('/call')},
        {text: 'History', onClick: () => navigate('/history')},
    */];

    const settings = [
        {text: 'Logout', onClick: () => handleLogout()}
    ];

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleLogout = () => {
        window.localStorage.setItem('token', '')
        navigate('/')
    }

    const shouldRenderGoBackArrow = () => {
        return location.pathname !== '/home';
    }

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    if (!token) {
        return null
    }

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                    >

                    </Typography>
                    {shouldRenderGoBackArrow() ?
                    <ArrowBackIosNewIcon fontSize={'large'} onClick={() => navigate('/home')}/> : <img src={logo} className={'nav-logo'}  alt='Riders logo'/>
                    }
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.text} onClick={page.onClick}>
                                    <Typography textAlign="center">{page.text}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                    >
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page.text}
                                onClick={page.onClick}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page.text}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting.text} onClick={setting.onClick}>
                                    <Typography textAlign="center">{setting.text}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default NavBar;
