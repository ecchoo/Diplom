import { Dialog, IconButton, Typography, Slide, FormControl, InputLabel, FormHelperText, MenuItem, Button, Box, Checkbox, FormControlLabel } from '@mui/material'
import { Close } from '@mui/icons-material'
import { Container, DialogContent, AppBar, Toolbar, Select, ButtonSaveTest, Questions, Answers, Buttons, ButtonAdd, ButtonDelete } from './styled'
import { forwardRef, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setIsOpenTestCreateUpdate, setTest, addQuestion, deleteQuestion, updateQuestion, addAnswer, deleteAnswer, updateAnswer } from '@/store/reducers'
import { TEST_CREATE_UPDATE_TYPES } from '@/constants'
import { Form, FormRow, TextField } from '@/UI'
import { getCourseList, updateTest } from '@/api'
import { createTest } from '@/api'

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

const Question = ({ question, onChange, onDelete, onAddAnswer, onUpdateAnswer, onDeleteAnswer }) => {
    const handleQuestionChange = (e) => {
        const { name, value } = e.target;
        onChange({ ...question, [name]: value });
    }

    const handleAddAnswer = () => {
        onAddAnswer(question.id);
    }

    const handleAnswerChange = (answerId, updatedAnswer) => {
        onUpdateAnswer(question.id, answerId, updatedAnswer);
    }

    const handleDeleteAnswer = (answerId) => {
        onDeleteAnswer(question.id, answerId);
    }

    return (
        <Box>
            <FormRow>
                <TextField
                    id={`question-${question.id}`}
                    name="questionText"
                    label="Вопрос"
                    value={question.questionText}
                    onChange={handleQuestionChange}
                    multiline
                    rows={3}
                />
            </FormRow>
            <Buttons>
                <ButtonAdd type='button' onClick={handleAddAnswer}>Добавить ответ</ButtonAdd>
                <ButtonDelete type='button' onClick={onDelete}>Удалить вопрос</ButtonDelete>
            </Buttons>
            <Answers>
                {question.answers.map((answer, index) => (
                    <FormRow key={answer.id}>
                        <TextField
                            id={`answer-${answer.id}`}
                            name="answerText"
                            label={`Ответ ${index + 1}`}
                            value={answer.answerText}
                            onChange={(e) => handleAnswerChange(answer.id, { ...answer, answerText: e.target.value })}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={answer.isCorrect}
                                    onChange={(e) => handleAnswerChange(answer.id, { ...answer, isCorrect: e.target.checked })}
                                    name="isCorrect"
                                    color="primary"
                                />
                            }
                            label="Правильный"
                        />
                        <ButtonDelete type='button' onClick={() => handleDeleteAnswer(answer.id)}>Удалить ответ</ButtonDelete>
                    </FormRow>
                ))}
            </Answers>
        </Box>
    )
}

export const DialogTestCreateUpdate = () => {
    const dispatch = useDispatch()
    const { testCreateUpdate: { isOpen, type, test } } = useSelector(state => state)
    const [errorsValidation, setErrorsValidation] = useState({})
    const [courses, setCourses] = useState([])


    const handleClose = () => {
        dispatch(setIsOpenTestCreateUpdate(false))
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(setTest({ ...test, [name]: value }))
    }

    const handleAddQuestion = () => {
        const newQuestion = {
            id: new Date().getTime(), // Temporary ID
            questionText: '',
            answers: []
        };
        dispatch(addQuestion(newQuestion));
    }

    const handleQuestionChange = (updatedQuestion) => {
        dispatch(updateQuestion(updatedQuestion));
    }

    const handleDeleteQuestion = (questionId) => {
        dispatch(deleteQuestion(questionId));
    }

    const handleAddAnswer = (questionId) => {
        const newAnswer = {
            id: new Date().getTime(),
            answerText: '',
            isCorrect: false
        };
        dispatch(addAnswer({ questionId, answer: newAnswer }));
    }

    const handleUpdateAnswer = (questionId, answerId, updatedAnswer) => {
        dispatch(updateAnswer({ questionId, answerId, ...updatedAnswer }));
    }

    const handleDeleteAnswer = (questionId, answerId) => {
        dispatch(deleteAnswer({ questionId, answerId }));
    }

    useEffect(() => {
        const fetchCourseList = async () => {
            const { courses: courseList } = await getCourseList({});
            setCourses(courseList)
        }

        fetchCourseList()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('test')
        try {
            if (!test.id) {
                const res = await createTest(test)
                console.log(res)
                console.log('create')
            } else {
                console.log('update')
                const res = await updateTest(test)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const isSaveDisabled = test.questions.length === 0 ||
        test.questions.some(q => !q.questionText || q.answers.length === 0 || q.answers.some(a => !a.answerText))

    return (
        <Dialog
            fullScreen
            open={isOpen}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <AppBar>
                <Toolbar>
                    <Typography variant="h6" component="div">
                        {type === TEST_CREATE_UPDATE_TYPES.CREATE ? 'Создание теста' : 'Редактирование теста'}
                    </Typography>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <Close />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <DialogContent>
                <Container>
                    <Form onSubmit={handleSubmit}>
                        <FormRow>
                            <TextField
                                id="name"
                                onChange={handleChange}
                                name='name'
                                label="Название теста"
                                variant="outlined"
                                value={test?.name}
                                error={errorsValidation?.name}
                                helperText={errorsValidation?.name}
                            />
                            <FormControl error={errorsValidation?.courseId}>
                                <InputLabel id="courseId-label">Курс</InputLabel>
                                <Select
                                    labelId="courseId-label"
                                    id="courseId"
                                    value={test.courseId}
                                    name="courseId"
                                    label="Курс"
                                    onChange={handleChange}
                                >
                                    {courses.length && courses.map(({ id, name }) =>
                                        <MenuItem key={name} value={id}>{name}</MenuItem>
                                    )}
                                </Select>
                                <FormHelperText>{errorsValidation?.courseId}</FormHelperText>
                            </FormControl>
                        </FormRow>
                        <ButtonAdd type='button' onClick={handleAddQuestion}>Добавить вопрос</ButtonAdd>
                        <Questions>
                            {test.questions.map((question, index) => (
                                <Question
                                    key={question.id}
                                    question={question}
                                    onChange={handleQuestionChange}
                                    onDelete={() => handleDeleteQuestion(question.id)}
                                    onAddAnswer={handleAddAnswer}
                                    onUpdateAnswer={handleUpdateAnswer}
                                    onDeleteAnswer={handleDeleteAnswer}
                                />
                            ))}
                        </Questions>
                        <ButtonSaveTest type='submit' disabled={isSaveDisabled}>Сохранить тест</ButtonSaveTest>
                    </Form>
                </Container>
            </DialogContent>
        </Dialog>
    )
}
