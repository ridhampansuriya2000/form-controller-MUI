import React, {useState} from "react";
import StyledTextField from "../Views/TextInput";
import ToggleButton from "../Views/ToggleButton";
import Grid from '@mui/material/Grid';
import axios from "axios";

/*---------------Style--------------------*/
import style from './signup.module.css'
import Form from "./Form/Form";

const SignUp = () => {

    const [toggle, setToggle] = useState('FAN SIGNUP');
    const handleSubmit = async (data) => {
        console.log("data", data)
        await axios.post(`http://wren.in:3200/api/sign-up/${toggle === 'FAN SIGNUP' ? 'fan' : 'talent'}`, data)
            .then(res => {
                console.log(res)
                return res;
            })
            .catch(err =>{
                console.log(err);
                return err;
            })
    }

    return (
        //<div>
        <Grid container className={style.signUpContainer}>
            <Grid xs={11} sm={11} md={10} lg={8} xl={8} item>
                <div className={style.fromContainer}>

                    <div className={style.toggleButton}>
                        <ToggleButton
                            lables={['FAN SIGNUP', 'TALENT SIGNUP']}
                            activeLable={toggle}
                            handleToggle={setToggle}
                        />
                    </div>

                    <div className={style.FormHeader}>
                        Create Your {toggle === 'FAN SIGNUP' ? 'Fan' : 'Talent'} Account
                    </div>

                    <Form handleSubmit={handleSubmit}/>
                </div>
            </Grid>
        </Grid>
        // </div>
    )
}

export default SignUp;