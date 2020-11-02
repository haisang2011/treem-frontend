import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles, Tab, Tabs } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      width: '100%',
      backgroundColor: theme.palette.background.paper,

      "& .MuiTab-wrapper" : {
          textTransform : "none",
      },

    },
  }));

function TabsTreeSelect({ onHandleTabIndex }) {

    const classes = useStyles();

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
      onHandleTabIndex(newValue);
    };

    return (
        <div className={classes.root}>
            {/* <Paper className={classes.root}> */}
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                scrollButtons="on"
                variant="scrollable"
            >
                <Tab label="Hoàn cảnh đặc biệt" />
                <Tab label="Nguy cơ rơi vào HCĐB" />
                <Tab label="Hoàn cảnh khác" />
                <Tab label="Hưởng trợ giúp" />
            </Tabs>
            {/* </Paper> */}
        </div>
    )
}

TabsTreeSelect.propTypes = {

}

export default TabsTreeSelect