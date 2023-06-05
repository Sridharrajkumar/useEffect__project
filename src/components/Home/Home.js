import React,{useContext} from 'react';
import Button from '../UI/Button/Button';
import Card from '../UI/Card/Card';
import classes from './Home.module.css';
import AuthContext from '../store/auth-context';

const Home = (props) => {
  const authcxt=useContext(AuthContext);
  return (
    <Card className={classes.home}>
      <h1>Welcome back!</h1>
      <div className={classes.actions}>
          <Button type="submit" onClick={authcxt.onLogout} className={classes.btn} >
            Logout
          </Button>
        </div>
    </Card>
  );
};

export default Home;
