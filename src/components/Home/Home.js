import React from 'react';
import Button from '../UI/Button/Button';
import Card from '../UI/Card/Card';
import classes from './Home.module.css';

const Home = (props) => {
  return (
    <Card className={classes.home}>
      <h1>Welcome back!</h1>
      <div className={classes.actions}>
          <Button type="submit" onClick={props.onLogout} className={classes.btn} >
            Logout
          </Button>
        </div>
    </Card>
  );
};

export default Home;
