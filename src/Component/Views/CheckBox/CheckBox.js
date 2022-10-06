import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import {alpha, styled} from '@mui/material/styles';


const StyledCheckbox = styled(Checkbox)(({theme}) => ({
    color: theme.palette.success.main,
    '& .MuiOutlinedInput-root': {
        borderRadius: '40px',
        border: '2px solid #11f086',
        color: '#ffffff',
        width: 'inherit',
    },
    '& .MuiSvgIcon-root': {
        color: '#10ff8d',
    },
    '& .Mui-checked': {
        color: '#10ff8d',
    },
}));

export default StyledCheckbox;
