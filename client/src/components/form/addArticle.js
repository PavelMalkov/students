import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ruLocale from "date-fns/locale/ru";
import { Typography, TextField, Grid, Button, FormControl } from '@mui/material';
import { StudentService } from "../../API";
import format from 'date-fns/format'

export const AddArticle = (props) => {

    const schema = yup.object().shape({
        title: yup.string().required("введите название статьи"),
        createdAt: yup.date().required("Введите дату публикации не позднее 1 января 2020").min(new Date(2020, 0, 0)),
        studentId: yup.number().test('server-validation', 'Такой студента не существует существует', async (value) => {
            console.log(value)
            let answer = await StudentService.getById(value)
            console.log(answer.data)
            return Boolean(answer.data);
        }),
    });

    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors }, // получение ошибок из useForm
    } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        data.createdAt = format(Date.parse(data.createdAt), "dd.MM.yyyy")
        props.callback(data)
    };

    return (
        <FormControl sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Typography variant="h5" style={{ textAlign: 'center' }}>{props.textButton}</Typography>
            <Grid container justifyContent="center" alignItems="stretch" gap={'20px'}>
                <TextField
                    fullWidth
                    required
                    defaultValue={props.row?.title}
                    label="Введите название статьи"
                    {...register("title")} // добавление name и ref атрибутов
                />
                <LocalizationProvider locale={ruLocale} dateAdapter={AdapterDateFns} >
                    <DatePicker
                        sx={{ width: '100%' }}
                        label="Выберите дату"
                        defaultValue={props.row ? new Date(props.row?.createdAt) : new Date()}
                        {...register("createdAt")} // добавление name и ref атрибутов
                        onChange={(newValue) => setValue('createdAt', newValue)}
                        inputVariant="outlined"
                    />
                    {errors.createdAt ? 'Введите дату публикации не позднее 1 февраля 2020' : ''}
                </LocalizationProvider>
                {/* Написать отслеживаемый input через debouce и запросом к серверу на отрисовку подходящих студентов */}
                <TextField
                    type="number"
                    fullWidth
                    required
                    {...register("studentId")} // добавление name и ref атрибутов
                    defaultValue={props.row?.studentId}
                    label="Введите id студента"
                    error={errors.studentId}
                    helperText={errors.studentId?.message} // вывод текста ошибки
                />
            </Grid>
            <Button variant="contained" onClick={handleSubmit(onSubmit)}>{props.textButton}</Button>
        </FormControl>

    );
};

