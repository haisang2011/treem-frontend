import React from 'react'
import './Navbar.scss';
import PropTypes from 'prop-types'
import { AppBar, Tabs, Tab, makeStyles, Menu, MenuItem, List, ListItem, ListItemText, Collapse } from '@material-ui/core'
import { NavLink } from 'react-router-dom';

const navLinks = [
    {
        title : "Hệ thống",
        path : '/', 
        dropdown : [
            {
                subTitle : "Nhật ký hoạt động"
            },
            {
                subTitle : "Đăng xuất"
            }
        ]
    },
    {
        title : "Quản lý hồ sơ trẻ em",
        path : '/',
        dropdown : [
            {
                subTitle : "Tìm kiếm thông tin trẻ em"
            },
        ]
    },
    {
        title : "Hoàn cảnh đặc biệt",
        path : '/'
    },
    {
        title : "Nguy cơ rơi HCĐB",
        path : '/'
    },
    {
        title : "Hoàn cảnh khác",
        path : "/"
    },
    {
        title : "Hình thức trợ giúp",
        path : "/"
    },
    {
        title : "Khai thác trẻ em",
        path : "/",
        dropdown : [
            {
                subTitle : "Danh sách trẻ em"
            },
            {
                subTitle : "Danh sách trẻ em bình thường"
            },
            {
                subTitle : "Danh sách trẻ em theo đối tượng"
            },
            {
                subTitle : "Danh sách hộ gia đình"
            },
            {
                subTitle : "Tổng hợp báo cáo"
            },
        ]
    },
    {
        title : "Trợ giúp",
        path : "/"
    }
]

const useStyles = makeStyles(theme => ({
    root : {
        backgroundColor : "#444d58",
        color: "#FFFFFF"
    },
    list : {
        display : "flex",
        marginLeft : "1.5rem"
    },
    textLink : {
        textDecoration: `none`,
        color: `#FFFFFF`
    }
}))

function Navbar(props) {

    const classes = useStyles()

    const [item, setItem] = React.useState(null)
    const [selectedIndex, setSelectedIndex] = React.useState(null);

    const handleListItemClick = (event, index, title) => {
        setSelectedIndex(index);
        (item && item[title]) ? setItem({...item, [title]: !item[title]}) : setItem({...item, [title]: true})
    };

    (item && console.log(item["Hệ thống"]))

    return (
        <div className="navbar">
            <AppBar position="static" className={classes.root}>
                <List component="nav" aria-labelledby="main navigation" className={classes.list}>
                    {navLinks.map(({ title, path, dropdown }, idx) => (
                    <div>
                    {/* <NavLink to={path} key={title} className={classes.textLink}> */}
                        <ListItem 
                            button
                            selected={selectedIndex === idx}
                            onClick={(event) => handleListItemClick(event, idx, title)}    
                        >
                        <ListItemText primary={title} />
                        </ListItem>
                    {/* </NavLink> */}
                    { dropdown && (
                        <Collapse 
                            component="li" 
                            timeout="auto" 
                            unmountOnExit
                            in={item && item[title]}
                        >
                            <List disablePadding>
                                {dropdown.map(({subTitle}) => {
                                return (
                                    <ListItem button>
                                    <ListItemText primary={subTitle} />
                                    </ListItem> 
                                    )
                                })}
                            </List>
                        </Collapse>
                    ) }
                    </div>
                    ))}
                </List>
            </AppBar>
        </div>
    )
}

Navbar.propTypes = {

}

export default Navbar

