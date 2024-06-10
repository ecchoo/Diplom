import { getTestById, submitTest } from "@/api";
import { Header } from "@/components/Header";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Question, QuestionText, Questions, Title, Answers, ButtonSubmit } from "./styled";
import { Checkbox, FormControlLabel } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

export const CourseTest = () => {
    const { id: testId } = useParams();
    const [test, setTest] = useState(null);
    const [userAnswers, setUserAnswers] = useState([]);
    const [results, setResults] = useState([]);
    const [score, setScore] = useState(null);

    useEffect(() => {
        const fetchTest = async () => {
            const { data } = await getTestById(testId);
            setTest(data.test);
        };

        testId && fetchTest();
    }, [testId]);

    const handleAnswerChange = (questionId, answerId) => {
        setUserAnswers(prevAnswers => {
            const updatedAnswers = prevAnswers.map(answer =>
                answer.questionId === questionId
                    ? {
                        ...answer,
                        answers: answer.answers.includes(answerId)
                            ? answer.answers.filter(id => id !== answerId)
                            : [...answer.answers, answerId]
                    }
                    : answer
            );

            if (!updatedAnswers.some(answer => answer.questionId === questionId)) {
                updatedAnswers.push({ questionId, answers: [answerId] });
            }

            return updatedAnswers;
        });
    };

    const handleSubmit = async () => {
        console.log(userAnswers);

        const { data: { testResult } } = await submitTest({ testId: test.id, userAnswers });
        console.log(testResult);

        setResults(testResult);

        const correctCount = testResult.filter(result => result.isCorrect).length;
        setScore(`${correctCount}/${test.questions.length}`);
    };

    return (
        <>
            <Header />
            <Container>
                <Title>
                    Итоговый тест курса {test?.course?.name}
                </Title>
                {score && `Ваш результат: ${score}`}
                <Questions>
                    {test && test.questions && test.questions.length ? test.questions.map(({ id: questionId, questionText, answers }, questionIndex) => (
                        <Question key={questionId}>
                            <QuestionText>
                                {questionIndex + 1}. {questionText}
                                {results && results.length > 0 && (
                                    results.find(result => result.questionId === questionId)?.isCorrect
                                        ? <CheckIcon style={{ color: 'green', marginLeft: '10px' }} />
                                        : <CloseIcon style={{ color: 'red', marginLeft: '10px' }} />
                                )}
                            </QuestionText>
                            <Answers>
                                {answers && answers.length ? answers.map(({ id: answerId, answerText }, answerIndex) => (
                                    <FormControlLabel
                                        key={answerId}
                                        control={
                                            <Checkbox
                                                name="answer"
                                                color="primary"
                                                checked={userAnswers.find(answer => answer.questionId === questionId)?.answers.includes(answerId) || false}
                                                onChange={handleAnswerChange.bind(null, questionId, answerId)}
                                                disabled={results?.length > 0} // Disable checkboxes after submission
                                            />
                                        }
                                        label={`${answerIndex + 1}. ${answerText}`}
                                    />
                                )) : null}
                            </Answers>
                        </Question>
                    )) : null}
                </Questions>
                <ButtonSubmit onClick={handleSubmit} disabled={results?.length > 0}>
                    Отправить на проверку
                </ButtonSubmit>
            </Container>
        </>
    );
};
