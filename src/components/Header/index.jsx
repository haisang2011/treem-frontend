import React from 'react';
import { logo } from '../../contants/images';
import { NavLink } from 'react-router-dom'
import './Header.scss'
import PropTypes from 'prop-types';
import { Avatar, Button, ClickAwayListener, List, ListItem, ListItemIcon, ListItemText, makeStyles, Menu, MenuItem } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { connect } from 'react-redux';
import { logout } from '../../actions/authAction'

const useStyles = makeStyles((theme) => ({
    root: {
      "& .MuiList-root" : {
          position : "absolute",
          left : 0,
          top: "100%",
          backgroundColor : "#FFFFFF",
          zIndex: 1,
      },

      "& .MuiListItemText-root" : {
        fontSize : "0.8rem",
      }
    },
  }));

function Header({ logout, username }) {

    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const handleOpenClick = () => {
        setOpen(!open)
    }
    
    const handleLogout = () => {
        logout();
    }

    return (
        <header className="header">

            <div className="header__left">

                <NavLink
                    className="header__link"
                    activeClassName="header__link--active"
                    to="/hoancanhdacbiet"
                    exact
                >
                    <img
                        src={logo} 
                        alt="Logo main of system"
                        className='header__logo'
                    />
                </NavLink>
                <span 
                    className="header__title"
                >
                    Quản lý trẻ em
                </span>
            </div>

            <div className="header__right" onClick={handleOpenClick}>
                <Avatar className="header__right--avatar">
                    NS
                </Avatar>
                <span className="header__right--user">{username}</span>
                <ArrowDropDownIcon color="primary"/>

                { open ? (
                    <div className={classes.root}>
                    <List>
                    <ListItem
                      button
                    >
                      <ListItemIcon>
                        <VpnKeyIcon fontSize="small"/>
                      </ListItemIcon>
                      <ListItemText primary="Đổi mật khẩu" />
                    </ListItem>


                    <ListItem
                        button
                        onClick={handleLogout}
                    >
                        <ListItemIcon>
                            <PowerSettingsNewIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Đăng xuất" />
                    </ListItem>
                  </List>
                  </div>
                ) : null }
            </div>
        </header>
    )
}

Header.propTypes = {

}

const mapStateToProps = state => ({
    username : state.auth.currentUser
})

export default connect(mapStateToProps, { logout })(Header)

