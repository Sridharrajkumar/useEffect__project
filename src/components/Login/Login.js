import React, { useReducer, useState, useContext, useRef } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../store/auth-context';
import Input from '../UI/Input/Input';



const emailReducer = (state,action) =>{
  if(action.type ==='user_input'){
    return({value: action.val , isValid: action.val.includes('@')});
  }
  if(action.type === 'input_blur')
  {
    return({value: state.value , isValid:state.value.includes('@')});
  }
  return({value:'',isValid: false});
}

const passwordReducer = (state,action) =>{
  if(action.type ==='USER_INPUT'){
    return({value: action.valu , isValid: action.valu.trim().length > 6 });
  }
  if(action.type === 'INPUT_BLUR')
  {
    return({value: state.value , isValid:state.value.trim().length > 6 });
  }
  return({value:'',isValid: false});
}


const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const[emailState,dispatchEmail]=useReducer(emailReducer,{value:'', isValid: null});
  const[passwordState,dispatchPassword]=useReducer(passwordReducer,{value:'',isPassValid: null});

  const authcxt=useContext(AuthContext);
  const emailRef= useRef();
  const passwordref=useRef();
  
 
  // useEffect(() =>{
  //   const intervalClear= setTimeout(()=>{
  //      console.log('checking');
  //      setFormIsValid(
  //        enteredEmail.includes('@') && enteredPassword.trim().length > 6 
  //      );
  //    },500);
  //    return () =>{
  //      console.log('return');
  //      clearTimeout(intervalClear);
  //    }
  //  },[enteredEmail,enteredPassword])

  const{isValid : emailIsValid}=emailState;
  const{isValid : passwordIsValid}=passwordState;
 
  const emailChangeHandler = (event) => {
    dispatchEmail({type:'user_input', val:event.target.value});

    setFormIsValid( 
      event.target.value.includes('@') && passwordState.isValid
    );

   
  };
  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);  
    dispatchPassword({type:'USER_INPUT',valu:event.target.value});
    setFormIsValid( 
       emailState.isValid && event.target.value.trim().length > 6 
     );
   
  };

  const validateEmailHandler = () => {
    //setEmailIsValid(emailState.isValid);
    dispatchEmail({type:'input_blur'});
  };

  const validatePasswordHandler = () => {
   // setPasswordIsValid(enteredPassword.trim().length > 6);
   dispatchPassword({type:'INPUT_BLUR'});
  };

  
  
  const submitHandler = (event) => {
    event.preventDefault();
   if(formIsValid)
   {
    authcxt.onLogin(emailState.value, passwordState.value);
   }
   else if(!emailIsValid){
    emailRef.current.focus();
   }
   else{
    passwordref.current.focus();
   }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
        ref={emailRef}
        type="email"
        id="email" 
        lable="E-Mail"
        isValid={emailIsValid}
        value={emailState.value}
        onChange={emailChangeHandler}
        onBlur={validateEmailHandler}/>
         
        <Input 
        ref={passwordref}
        type="password"
        id="password"
        lable="Password"
        isValid={passwordIsValid}
        value={passwordState.value}
        onChange={passwordChangeHandler}
        onBlur={validatePasswordHandler}/>
        
        
       
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
