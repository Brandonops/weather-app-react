import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { Col, Collapse, Container, Row } from 'react-bootstrap';
import { Provider } from 'react-redux';
import store from './redux/store';
import Cloud  from './components/Cloud.js';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>

        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  // return {
  //   id: `vertical-tab-${index}`,
  //   'aria-controls': `vertical-tabpanel-${index}`,
  // }; 
}

const useStyles = makeStyles((theme) => ({
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  }
}));

export default function VerticalTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        // className={classes.tabs}
      >
        <Tab label="Home"  component={NavLink} to="/" />
        <Tab label="Weather" {...a11yProps(1)} component={NavLink} to="/weather" />
        <Tab label="My List" {...a11yProps(2)} component={NavLink} to="/weatherlist" />
      </Tabs>
      <TabPanel value={value} index={0}>
      </TabPanel>
      <TabPanel value={value} index={1}>
      </TabPanel>
      <TabPanel value={value} index={2}>
      </TabPanel>
    </div>
  );
}




ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <div>
        {/* <div id="dynamicbg">
        </div> */}
        <Row style={{margin: '0', backgroundPosition: 'fiil'}} >
          <Col sm={2} id="navSide">
          <VerticalTabs/>
          </Col>
          <Col sm={10}id="pageContent">
          <App id="mainApp" />
          </Col>
        </Row>

        </div>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
