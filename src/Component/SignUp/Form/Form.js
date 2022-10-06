import React, {useState} from "react";
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import StyledSIgnupBtn from "../../Views/SignupBtn"
import StyledTextField from "../../Views/TextInput";
import StyledCheckbox from "../../Views/CheckBox";

import style from './form.module.css';

const Form = ({
                  handleSubmit
              }) => {

    const [formData, setFormData] = useState({
        values: {
            firstName :'',
            lastName :'',
            userName :'',
            email :'',
            password :'',
        },
        errors: {
            firstName : '',
            lastName : '',
            userName : '',
            email : '',
            password : '',
        },
        touched: {},
        isSubmit : false,
        isValid : false,
        termsConditions : false,
        isLoading : false,
    });

    const submitFormData = async () => {
        setFormData((preState) => ({
            ...preState,
            isSubmit : true,
        }));
        Object.keys(formData.values).forEach((item)=>{
            setFormData((preState)=>({...preState,errors:{...preState.errors,[item] : errorHander(item,formData.values[item])}}))
        });
        if(formData.isValid){
            setFormData((preState) => ({
                ...preState,
                isLoading : true
            }));
            await handleSubmit(formData.values);
            setFormData((preState) => ({
                ...preState,
                values: {
                    firstName :'',
                    lastName :'',
                    userName :'',
                    email :'',
                    password :'',
                },
                errors: {
                    firstName : '',
                    lastName : '',
                    userName : '',
                    email : '',
                    password : '',
                },
                touched: {},
                isSubmit : false,
                isValid : false,
                termsConditions : false,
                isLoading : false,
            }));
        }
    }

    const formHandler = (e) => {
        let {name, value} = e.target;
        setFormData((preState) => ({
            ...preState,
            values: {
                ...preState.values,
                [name]: value
            },
            errors: {
                ...preState.errors,
                [name]: errorHander(name, value)
            },
            touched: {
                ...preState.touched,
                [name]: true
            },
        }))
        setFormData((preState)=>({
            ...preState,
            isValid : Object.keys(formData.values).every(item => formData.values[item]) && !Object.keys(formData.values).some(item => formData.errors[item])
        }))
    };

    const handleValidation = (key, value) => {
        switch (key) {
            case 'firstName':
                return /^[a-zA-Z ]+$/.test(value) ? false : "FirstName Should have only Characters letters "
                break;
            case "lastName":
                return /^[a-zA-Z ]+$/.test(value) ? false : "LastName Should have only Characters letters "
                break;

            case "email":
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) ? false : "Please Enter Valid Email"
                break;
            case "userName": return false;
            break;

            case "password":
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[ !"#$%&'()*+,-.\/:;\\<=>?@[\]^_`{|}~])[A-Za-z\d !"#$%&'()*+,-.\/:;\\<=>?@[\]^_`{|}~]{8,}$/.test(value) ? false:"Password must contain at least one number, symbol, and uppercase letter and minimum 8 letters"
                break;

            default:
                return ''
        }
    };

    const errorHander = (name, value) => {
        if (!value) {
            return `${name} is required`
        } else if (value) {
            return handleValidation(name, value)
        }
    }

    return (
        <div>
            <Grid container className={style.formContainer}>
                <Grid xs={11} sm={11} md={10} lg={8} xl={7} item>
                    <div className={style.inputLable}>First Name *</div>
                    <StyledTextField fullWidth
                                     placeholder='First Name'
                                     name='firstName'
                                     helperText={formData.isSubmit && formData.errors?.firstName}
                                     value={formData.values?.firstName}
                                     onChange={formHandler}
                                     disabled={formData.isLoading}
                    />

                    <div className={style.inputLable}>Last Name *</div>
                    <StyledTextField fullWidth
                                     placeholder='Last Name'
                                     name='lastName'
                                     helperText={formData.isSubmit && formData.errors?.lastName}
                                     value={formData.values?.lastName}
                                     onChange={formHandler}
                                     disabled={formData.isLoading}
                    />

                    <div className={style.inputLable}>Username *</div>
                    <StyledTextField fullWidth
                                     placeholder='Username'
                                     name='userName'
                                     helperText={formData.isSubmit && formData.errors?.userName}
                                     value={formData.values?.userName}
                                     onChange={formHandler}
                                     disabled={formData.isLoading}
                                     autoComplete="off"
                    />

                    <div className={style.inputLable}>Email *</div>
                    <StyledTextField fullWidth
                                     type='email'
                                     placeholder='Email'
                                     name='email'
                                     helperText={formData.isSubmit && formData.errors?.email}
                                     value={formData.values?.email}
                                     onChange={formHandler}
                                     disabled={formData.isLoading}
                                     autoComplete="off"
                    />

                    <div className={style.inputLable}>Password *</div>
                    <StyledTextField fullWidth
                                     type='password'
                                     placeholder='Password'
                                     name='password'
                                     helperText={formData.isSubmit && formData.errors?.password}
                                     value={formData.values?.password}
                                     onChange={formHandler}
                                     disabled={formData.isLoading}
                                     autoComplete="off"
                    />

                    <div>
                        <StyledCheckbox color="success" checked = {formData.termsConditions} onChange={()=>setFormData((preState)=>({...preState, termsConditions : !preState.termsConditions}))}/>
                        I agree to the <span className={style.termsConditions}>Terms and Conditions. </span>
                    </div>

                    <StyledSIgnupBtn variant="contained"
                            color="success"
                            sx={{
                                borderRadius: 28,
                                width:{xs:'90%', sm:'30%'}
                            }}
                            disabled={!formData.termsConditions || formData.isLoading}
                            onClick={submitFormData}
                    >
                        SIGN UP &nbsp;{formData.isLoading && <CircularProgress size={20} color="inherit" />}
                    </StyledSIgnupBtn>
                </Grid>
            </Grid>

        </div>
    )
}

export default Form;