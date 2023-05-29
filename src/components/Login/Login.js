import React, { useEffect, useState } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const[enteredCollegeName,SetCollegeName]=useState('');
  const[CollegeIsValid,SetCollegeIsValid]=useState();
  const [formIsValid, setFormIsValid] = useState(false);
  

  useEffect(() =>{
   const intervalClear= setTimeout(()=>{
      console.log('checking');
      setFormIsValid(
        enteredEmail.includes('@') && enteredPassword.trim().length > 6 && enteredCollegeName.trim().length>1
      );
    },500);
    return () =>{
      console.log('return');
      clearTimeout(intervalClear);
    }
  },[enteredEmail,enteredPassword,enteredCollegeName])

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);

   
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);

    
  };

  const collegeChangeHandler=(event) =>{
      SetCollegeName(event.target.value);
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes('@'));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };
  const collegeValidateHandler=()=>{
    SetCollegeIsValid(enteredCollegeName.trim().length >1);
  };


  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={`${classes.control} 
          ${
            CollegeIsValid === false ? classes.invalid : ''
          }`}>
        
        <label htmlFor="clg">College Name</label>
        <input 
           id='cld' 
           type='text'
           value={enteredCollegeName}
           onChange={collegeChangeHandler}
           onBlur={collegeValidateHandler}>
        </input>
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
