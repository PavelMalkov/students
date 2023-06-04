import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Box, Typography, TextField, Grid, Button, RadioGroup, FormControlLabel, Radio, FormControl } from '@mui/material';

const phoneRegExp = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;


export const AddStudent = (props) => {
    const schema = yup.object().shape({
        name: yup.string().required("введите имя и фамилию"),
        gender: yup.string().oneOf(['М', 'Ж']),
        age: yup.number().positive().integer().min(18).max(90).required('укажите возраст от 18 до 90'),
        course: yup.number().positive().integer().min(1).max(5).required('укажите курс от 1 по 5'),
        email: yup.string().email().required('введите корректную почту'),
        phone: yup.string().matches(phoneRegExp).required('Необходимо указать номер телефона'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors }, // получение ошибок из useForm
    } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        //console.log(data);
        props.callback(data)
    };

    return (
        <FormControl sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Typography variant="h5" style={{ textAlign: 'center' }}>{props.textButton}</Typography>
            <Grid container justifyContent="center" alignItems="stretch" gap={'20px'}>
                <TextField
                    fullWidth
                    required
                    label="Введите имя"
                    defaultValue={props.row?.name}
                    {...register("name")} // добавление name и ref атрибутов
                    error={errors.name} // проверка наличия ошибки 
                    helperText={errors.name?.message} // вывод текста ошибки
                />
                <RadioGroup
                    row
                    defaultValue={props.row ? props.row?.gender : 'М'}
                    {...register("gender")} // добавление name и ref атрибутов
                    helperText={errors.gender?.message} // вывод текста ошибки
                >
                    <FormControlLabel value="М" control={<Radio />} label="Мужчина" />
                    <FormControlLabel value="Ж" control={<Radio />} label="Женщина" />
                </RadioGroup>

                <TextField
                    type="number"
                    fullWidth
                    required
                    defaultValue={props.row ? props.row?.age : '18'}
                    label="Введите возраст"
                    {...register("age")} // добавление name и ref атрибутов
                    error={Boolean(errors.age)} // проверка наличия ошибки 
                    helperText={errors.age?.message} // вывод текста ошибки
                />
                <TextField
                    type="number"
                    fullWidth
                    required
                    defaultValue={props.row ? props.row?.course : '1'}
                    label="Введите курс"
                    {...register("course")} // добавление name и ref атрибутов
                    error={errors.course}
                    helperText={errors.course?.message} // вывод текста ошибки
                />

                <TextField
                    fullWidth
                    required
                    defaultValue={props.row?.email}
                    label="Введите почту"
                    {...register("email")} // добавление name и ref атрибутов
                    error={errors.email}
                    helperText={errors.email?.message} // вывод текста ошибки
                />
                <TextField
                    fullWidth
                    required
                    defaultValue={props.row?.phone}
                    label="Введите номер телефона"
                    {...register("phone")} // добавление name и ref атрибутов
                    error={errors.phone}
                    helperText={errors.phone?.message} // вывод текста ошибки
                />
            </Grid>
            <Button variant="contained" onClick={handleSubmit(onSubmit)}>{props.textButton}</Button>
        </FormControl>

    );
};