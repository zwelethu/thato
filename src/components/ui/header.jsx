import React from 'react';
import { makeStyles, useTheme } from '@material-ui/styles';
import {
  AppBar,
  Toolbar,
  useScrollTrigger,
  Tab,
  Tabs,
  Button,
  Menu,
  MenuItem,
  useMediaQuery,
  SwipeableDrawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '3em',
    [theme.breakpoints.down('md')]: { marginBottom: '2em' },
    [theme.breakpoints.down('xs')]: { marginBottom: '1.25em' },
  },
  logo: {
    height: '8em',
    [theme.breakpoints.down('md')]: { height: '7em' },
    [theme.breakpoints.down('xs')]: { height: '5.5em' },
  },
  logoContainer: {
    padding: 0,
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  tabContainer: {
    marginLeft: 'auto',
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: '25px',
  },
  button: {
    ...theme.typography.estimate,
    borderRadius: '50px',
    marginLeft: '50px',
    marginRight: '25px',
    height: '45px',
  },
  menu: {
    backgroundColor: theme.palette.common.blue,
    color: 'white',
    borderRadius: '0px',
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    '&:hover': {
      opacity: 1,
    },
  },
  drawerIconContainer: {
    marginLeft: 'auto',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  drawerIcon: {
    height: '50px',
    width: '50px',
  },
  drawer: {
    backgroundColor: theme.palette.common.blue,
  },
  drawerItem: {
    ...theme.typography.tab,
    color: 'white',
    opacity: 0.7,
  },
  drawerEstimate: {
    backgroundColor: theme.palette.common.orange,
  },
  drawerItemSelected: {
    ' & .MuiListItemText-root': {
      opacity: 1,
    },
  },
  AppBar: {
    zIndex: theme.zIndex.modal + 1,
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openMenu, setOpenMenu] = React.useState(false);
  const [selectIndex, setSelectIndex] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    setOpenMenu(true);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
    setOpenMenu(false);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const menuOptions = [
    { name: 'Services', link: '/services', activeIndex: 1, selectIndex: 0 },
    {
      name: 'Custom Software Development',
      link: '/customsoftware',
      activeIndex: 1,
      selectIndex: 1,
    },
    {
      name: 'Mobile App Development',
      link: '/mobileapps',
      activeIndex: 1,
      selectIndex: 2,
    },
    {
      name: 'Website Develpment',
      link: '/websites',
      activeIndex: 1,
      selectIndex: 3,
    },
  ];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const routes = [
    {
      name: 'Home',
      link: '/',
      activeIndex: 0,
    },
    {
      name: 'Services',
      link: '/services',
      activeIndex: 1,
      ariaOwns: anchorEl ? 'simple-menu' : undefined,
      ariaPopup: anchorEl ? true : undefined,
      mouseOver: (e) => handleClick(e),
    },
    {
      name: 'The Revolution',
      link: '/revolution',
      activeIndex: 2,
    },
    {
      name: 'About Us',
      link: '/about',
      activeIndex: 3,
    },
    {
      name: 'Contact',
      link: '/contact',
      activeIndex: 4,
    },
  ];

  const handleMenuItemClick = (e, i) => {
    setAnchorEl(null);
    setOpenMenu(false);
    setSelectIndex(i);
  };

  React.useEffect(() => {
    [...menuOptions, ...routes].forEach((route) => {
      switch (window.location.pathname) {
        case `${route.link}`:
          if (value !== route.activeIndex) {
            setValue(route.activeIndex);
            if (route.selectIndex && route.selectIndex !== selectIndex) {
              setSelectIndex(route.selectIndex);
            }
          }
          break;
        // case '/estimate':
        //   if (value !== 5) setValue(5);
        //   break;
        default:
          break;
      }
    });
    // switch (window.location.pathname) {
    //   case '/':
    //     if (value !== 0) setValue(0);
    //     break;
    //   case '/services':
    //     if (value !== 1) {
    //       setValue(1);
    //       setSelectIndex(0);
    //     }
    //     break;
    //   case '/customsoftware':
    //     if (value !== 1) {
    //       setValue(1);
    //       setSelectIndex(1);
    //     }
    //     break;
    //   case '/mobileapps':
    //     if (value !== 1) {
    //       setValue(1);
    //       setSelectIndex(2);
    //     }
    //     break;
    //   case '/websites':
    //     if (value !== 1) {
    //       setValue(1);
    //       setSelectIndex(3);
    //     }
    //     break;
    //   case '/revolution':
    //     if (value !== 2) setValue(2);
    //     break;
    //   case '/about':
    //     if (value !== 3) setValue(3);
    //     break;
    //   case '/contact':
    //     if (value !== 4) setValue(4);
    //     break;
    //   case '/estimate':
    //     if (value !== 5) setValue(5);
    //     break;
    //   default:
    //     break;
    // }
  }, [value, menuOptions, routes, selectIndex]);

  const tabs = (
    <React.Fragment>
      <Tabs
        className={classes.tabContainer}
        value={value}
        onChange={handleChange}
        aria-label="navigation tabs"
        indicatorColor="secondary"
      >
        {routes.map((route, index) => (
          <Tab
            key={`${route}${index}`}
            className={classes.tab}
            label={route.name}
            component={Link}
            to={route.link}
            onMouseOver={route.mouseOver}
            aria-owns={route.ariaOwns}
            aria-haspopup={route.ariaPopup}
          />
        ))}
      </Tabs>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        component={Link}
        to="/estimate"
      >
        Free Estimate
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        MenuListProps={{ onMouseLeave: handleClose }}
        classes={{ paper: classes.menu }}
        elevation={0}
        style={{ zIndex: 1302 }}
        keepMounted
      >
        {menuOptions.map((option, i) => (
          <MenuItem
            key={`${option}${i}`}
            component={Link}
            to={option.link}
            classes={{ root: classes.menuItem }}
            onClick={(event) => {
              handleMenuItemClick(event, i);
              setValue(1);
              handleClose();
            }}
            selected={i === selectIndex && value === 1}
          >
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );

  const drawer = (
    <React.Fragment>
      <SwipeableDrawer
        anchor="right"
        classes={{ paper: classes.drawer }}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
      >
        <div className={classes.toolbarMargin} />
        <List disablePadding>
          {routes.map((route) => (
            <ListItem
              key={`${route}${route.activeIndex}`}
              divider
              button
              component={Link}
              to={route.link}
              selected={value === route.activeIndex}
              classes={{ selected: classes.drawerItemSelected }}
              onClick={() => {
                setOpenDrawer(false);
                setValue(route.activeIndex);
              }}
            >
              <ListItemText className={classes.drawerItem} disableTypography>
                {route.name}
              </ListItemText>
            </ListItem>
          ))}
          <ListItem
            classes={{
              root: classes.drawerEstimate,
              selected: classes.drawerItemSelected,
            }}
            selected={value === 5}
            onClick={() => {
              setOpenDrawer(false);
              setValue(5);
            }}
            divider
            button
            component={Link}
            to="/estimate"
          >
            <ListItemText className={classes.drawerItem} disableTypography>
              Free Estimate
            </ListItemText>
          </ListItem>
        </List>
      </SwipeableDrawer>
      <IconButton
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
        className={classes.drawerIconContainer}
      >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <ElevationScroll>
        <AppBar position="fixed" className={classes.AppBar}>
          <Toolbar disableGutters={true}>
            <Button
              component={Link}
              to="/"
              className={classes.logoContainer}
              onClick={() => setValue(0)}
              disableRipple
            >
              <img alt="company logo" src={logo} className={classes.logo} />
            </Button>
            {matches ? drawer : tabs}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </React.Fragment>
  );
};

export default Header;
