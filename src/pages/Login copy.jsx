import { useEffect, useState } from "react";
import { Button, Form, Container, Card, CardHeader, CardBody } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from 'yup';
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
const CREDENTIALS = { email: 'azar@gmail.com', password: 'eds123' }
const Login = () => {
    const [session, setSession] = useState('')
    const navigate = useNavigate()
    useEffect(() => {
        const userEmail = localStorage.getItem('email')
        if (!userEmail) {
            return
        }
        navigate('/formpage')
    }, [session])

    return (
        <>
            <Container className="d-flex justify-content-center align-items-center vh-100">
                <Card style={{ width: "25rem" }} className="p-4 shadow-lg">



                    <CardBody>
                        <div className="d-flex justify-content-center">
                            <img src='./EdLogo.jpeg' alt='images' />
                        </div>
                        <h3 className="text-center my-4">Login</h3>
                        <Formik
                            initialValues={{ email: '', password: '' }}
                            validate={values => {
                                const errors = {};
                                if (!values.email) {
                                    errors.email = 'Required';
                                } else if (
                                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                ) {
                                    errors.email = 'Invalid email address';
                                }
                                return errors;
                            }}
                            onSubmit={(values, { setSubmitting }) => {
                                setTimeout(() => {
                                    console.log(values.email, CREDENTIALS.email, values.password, CREDENTIALS.password);
                                    if (values.email == CREDENTIALS.email) {
                                        if (values.password == CREDENTIALS.password) {
                                            localStorage.setItem('email', values.email)
                                            setSession(values.email)
                                        } else {
                                            console.log('Please use password as: eds123');
                                            toast.warn('Please use password as: eds123');
                                        }
                                    } else {
                                        console.log('Please use azar@gmail.com');
                                        toast.warn('Please use azar@gmail.com');
                                    }
                                    setSubmitting(false);
                                }, 400);
                            }}
                        >
                            {({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                isSubmitting,
                                /* and other goodies */
                            }) => (
                                <form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            placeholder="Enter Email"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.email}
                                        />
                                    </Form.Group>
                                    <div className="text-danger fw-bold">{errors.email && touched.email && errors.email}</div>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="password"
                                            placeholder="Enter Password"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.password}
                                        />
                                    </Form.Group>
                                    {errors.password && touched.password && errors.password}
                                    <Button variant='primary' type="submit" disabled={isSubmitting}>
                                        Submit
                                    </Button>
                                </form>
                            )}
                        </Formik>
                    </CardBody>
                </Card>
            </Container>
        </>
    )
}

export default Login;