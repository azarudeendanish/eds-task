import { useEffect, useState } from "react";
import { Button, Form, Container, Card, CardBody } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import EDLogo from '../assets/EdLogo.jpeg'
const CREDENTIALS = { email: 'azar@gmail.com', password: 'eds123' }
const Login = () => {
    const [session, setSession] = useState('')
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().min(5, 'Password must be 5 characters').required('Required')
        }),
        onSubmit: (values) => {
            setTimeout(() => {
                if (values.email == CREDENTIALS.email) {
                    if (values.password == CREDENTIALS.password) {
                        localStorage.setItem('email', values.email)
                        setSession(values.email)
                    } else {
                        toast.warn('Please use password as: eds123');
                    }
                } else {
                    toast.warn('Please use azar@gmail.com');
                }
            }, 400);
        },
    });

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
                            <img src={EDLogo} alt='logo' />
                        </div>
                        <div className="text-center">username: azar@gmail.com</div>
                        <div className="text-center">password: eds123</div>
                        <h3 className="text-center my-4">Login</h3>
                        <form onSubmit={formik.handleSubmit}>
                            <Form.Group className="" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    placeholder="Enter Email"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                    className={formik.errors.email ? "input-error" : ''}
                                />
                            </Form.Group>
                            {formik.touched.email && formik.errors.email ? (
                                <div className="text-danger fw-bold">{formik.errors.email}</div>
                            ) : null}
                            <Form.Group className="mt-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    placeholder="Enter Password"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
                                    className={formik.errors.password ? "input-error" : ''}
                                />
                            </Form.Group>
                            {formik.touched.password && formik.errors.password ? (
                                <div className="text-danger fw-bold">{formik.errors.password}</div>
                            ) : null}
                            <Button variant='primary' type="submit" className="mt-3">
                                Submit
                            </Button>
                        </form>
                    </CardBody>
                </Card>
            </Container>
        </>
    )
}

export default Login;