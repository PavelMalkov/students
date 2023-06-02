import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Grid, Button, Select, InputLabel, RadioGroup, Snackbar, FormControlLabel, Radio } from '@mui/material';


const style = {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    gap: '20px',
    bgcolor: 'background.paper',
    border: '2px solid #aaa',
    boxShadow: 24,
    p: 4,
    padding: '20px',
    backgroundColor: '#FFF',
};

export default function ModalAdd({ open, handleClose, addStudent }) {

    const [name, SetName] = useState('')
    const [gender, SetGender] = useState('М')
    const [age, SetAge] = useState('18')
    const [course, SetCourse] = useState('1')
    const [email, SetEmail] = useState('')
    const [phone, SetPhone] = useState('')

    const ageCanBe = [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
        41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70,
        71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99];

    const courseCanBe = [1, 2, 3, 4, 5];

    //true - ошибки в валидации нет
    const [phoneValid, SetPhoneValid] = useState(true)
    const [emailValid, SetEmailValid] = useState(true)
    const [nameValid, SetNameValid] = useState(true)

    const createNew = (e) => {
        const add = {
            name: name,
            gender: gender,
            age: age,
            course: course,
            email: email,
            phone: phone
        }
        // валидация
        // регулярные выражение 
        // mail
        const mail_mask = /^[a-zA-Z0-9._]+@[^\s@]+\.[^\s@]+$/
        // phone
        const phone_mask = /^((8|\+7)[\- ]?)?[\d\- ]{10}$/
        // name
        const name_mask = /^[a-zA-Zа-яА-ЯёЁ]+([-'][a-zA-Zа-яА-ЯёЁ]+)*\s[a-zA-Zа-яА-ЯёЁ]+([-'][a-zA-Zа-яА-ЯёЁ]+)*$/
        let validationMail = mail_mask.test(email)
        let validationPhone = phone_mask.test(phone)
        let validationName = name_mask.test(name)
        //телефон
        SetPhoneValid(validationPhone)
        //почта
        SetEmailValid(validationMail)
        //Имя фамилия
        SetNameValid(validationName)
        //alert(validationMail + ' ' + validationPhone + ' ' + validationName)
        if (!(validationMail && validationPhone && validationName)) {
            return
        }
        addStudent(add)
    }




    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box style={style}>
                <Typography variant="h5" style={{ textAlign: 'center' }}>Добавление студента</Typography>
                <Grid container direction="column" justifyContent="center" alignItems="stretch" gap={'20px'}>
                    <Grid item ><TextField
                        fullWidth
                        required
                        label="Введите имя"
                        error={!nameValid}
                        helperText={nameValid ? '' : 'Введите имя'}
                        defaultValue={name}
                        onChange={(event) => SetName(event.target.value)}
                    /></Grid>
                    <RadioGroup
                        row
                        value={gender}
                        onChange={(event) => SetGender(event.target.value)}
                    >
                        <FormControlLabel value="Ж" control={<Radio />} label="Женщина" />
                        <FormControlLabel value="М" control={<Radio />} label="Мужчина" />
                    </RadioGroup>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: '1 0 auto' }}>
                        <InputLabel sx={{
                            flexBasis: '0',
                            flexGrow: '1',
                            flexShrink: '1',
                            width: '0',
                            textAlign: 'right',
                            paddingRight: '20px'
                        }}>Возраст</InputLabel>
                        <Select
                            sx={{
                                flexBasis: 'auto',
                                flexGrow: '0',
                                flexShrink: '0',
                                width: 'auto'
                            }}
                            native
                            value={age}
                            onChange={(event) => SetAge(event.target.value)}
                        >
                            <option aria-label="None" value="" />
                            {ageCanBe.map((number) =>
                                <option key={number} value={number}>{number}</option>
                            )}
                        </Select>
                        <InputLabel
                            sx={{
                                flexBasis: '0',
                                flexGrow: '1',
                                flexShrink: '1',
                                width: '0',
                                textAlign: 'right',
                                paddingRight: '20px'
                            }}>Курс</InputLabel>
                        <Select
                            sx={{
                                flexBasis: 'auto',
                                flexGrow: '0',
                                flexShrink: '0',
                                width: 'auto'
                            }}
                            native
                            value={course}
                            onChange={(event) => SetCourse(event.target.value)}
                        >
                            <option aria-label="None" value="" />
                            {courseCanBe.map((number) =>
                                <option key={number} value={number}>{number}</option>
                            )}
                        </Select></Box>
                    <Grid item ><TextField
                        fullWidth
                        required
                        error={!emailValid}
                        helperText={emailValid ? '' : 'Не корректно введена почта'}
                        label="Почта"
                        defaultValue={email}
                        onChange={(event) => SetEmail(event.target.value)}
                    /></Grid>
                    <Grid item ><TextField
                        fullWidth
                        required
                        error={!phoneValid}
                        helperText={phoneValid ? '' : 'Не корректно введен номер телефона'}
                        label="Телефон"
                        defaultValue={phone}
                        onChange={(event) => SetPhone(event.target.value)}
                    /></Grid>

                    <Button variant="contained" onClick={createNew}>добавить</Button>

                </Grid>
            </Box>
        </Modal>
    )
}
