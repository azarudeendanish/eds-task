import { useFormik } from "formik";
import * as Yup from 'yup';
import { Container, Row, Col, Card, Button, Form, } from "react-bootstrap";
import { pdfjs, Document, Page } from 'react-pdf';
import { useState } from "react";
import resume from "../../public/Azar_resume.pdf";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

const Invoice = () => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [file, setFile] = useState(resume);
    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }
    pdfjs.GlobalWorkerOptions.workerSrc = new URL(
        'pdfjs-dist/build/pdf.worker.min.mjs',
        import.meta.url,
    ).toString();
    const options = {
        cMapUrl: '/cmaps/',
        standardFontDataUrl: '/standard_fonts/',
    };
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string()
                .min(5, 'Password must be 5 characters')
                .required('Required')

        }),
        onSubmit: (values) => {
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
            }, 400);
        },
    });
    return (
        <>
            <Container fluid>
                <Row>
                    <Col md={6} className="mt-3">
                        <div className="vh-100 bg-white border-3 d-flex justify-content-center align-items-center" style={{ borderStyle: 'dashed', borderColor: '#ccc' }}>
                            <div>
                                <Document
                                    // file="somefile.pdf"
                                    file={file}
                                    onLoadSuccess={onDocumentLoadSuccess}
                                    option={options}
                                >
                                    <Page pageNumber={pageNumber} />
                                </Document>
                                <p>Page {pageNumber} of {numPages}</p>
                            </div>
                            {/* <Card className="p-4 text-center w-100 border-0">
                                <Card.Body>
                                    <Card.Title>Upload Your Invoice</Card.Title>
                                    <Card.Text>To auto-populate fields and save time</Card.Text>
                                    <div>
                                        <img src='./fileDummy.png' alt='fileImage' className="w-50" />
                                    </div>
                                    <Button variant="btn btn-outline-secondary">Upload File <i className="fas fa-upload ms-1"></i></Button>
                                    <Card.Text className="mt-2"><span className="text-primary">click to upload</span> or Drag and Drop</Card.Text>
                                </Card.Body>
                            </Card> */}
                        </div>
                    </Col>
                    <Col md={6} className="mt-3">
                        <Card className="p-4 border-0 bg-transparent pt-0">
                            <Card.Body className="pt-0">

                                <Form>
                                    <Card.Title><span className="formIcon me-3"><i className="far fa-building"></i></span>Vendor Details</Card.Title>
                                    <Card.Subtitle className="py-3">Vendor Information</Card.Subtitle>
                                    <Form.Group controlId="vendor">
                                        <Form.Label>Vendor <span className="text-danger">*</span></Form.Label>
                                        <Form.Select>
                                            <option>A - 1 Exterminators</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Card.Title><span className="formIcon me-3 mt-4"><i className="far fa-file-alt"></i></span>Invoice Details</Card.Title>
                                    <Card.Subtitle className="py-3">General Information</Card.Subtitle>
                                    <Form.Group controlId="invoice">
                                        <Form.Label>Purchase Order Number <span className="text-danger">*</span></Form.Label>
                                        <Form.Select>
                                            <option>Select PO Number</option>
                                        </Form.Select>
                                        <Card.Subtitle className="my-3">Invoice Details</Card.Subtitle>
                                        <div className="d-flex flex-column flex-md-row gap-3 mb-2">
                                            <Form.Group className="w-100">
                                                <Form.Label>Invoice Number <span className="text-danger">*</span></Form.Label>
                                                <Form.Control type="text" placeholder="Enter Invoice Number" />
                                            </Form.Group>
                                            <Form.Group className="w-100">
                                                <Form.Label>Invoice Date <span className="text-danger">*</span></Form.Label>
                                                <Form.Control type="date" />
                                            </Form.Group>
                                        </div>
                                        <div className="d-flex flex-column flex-md-row gap-3 mb-2">
                                            <Form.Group className="w-100">
                                                <Form.Label>Total Amount</Form.Label>
                                                <Form.Control type="number" placeholder="$ 0.00" />
                                            </Form.Group>
                                            <Form.Group className="w-100">
                                                <Form.Label>Invoice Due Date</Form.Label>
                                                <Form.Control type="date" />
                                            </Form.Group>
                                        </div>
                                        <div className="d-flex flex-column flex-md-row gap-3 mb-2">
                                            <Form.Group className="w-100">
                                                <Form.Label>Invoice Due Date <span className="text-danger">*</span></Form.Label>
                                                <Form.Control type="date" />
                                            </Form.Group>
                                            <Form.Group className="w-100">
                                                <Form.Label>GL Post Date <span className="text-danger">*</span></Form.Label>
                                                <Form.Control type="date" />
                                            </Form.Group>
                                        </div>
                                        <Form.Group className="w-100">
                                            <Form.Label>Invoice Description <span className="text-danger">*</span></Form.Label>
                                            <Form.Control as="textarea" rows={1} />
                                        </Form.Group>




                                        <Card.Subtitle className="my-3">Expense Details</Card.Subtitle>
                                        <div className="d-flex flex-column flex-md-row gap-3 mb-2">
                                            <Form.Group className="w-100">
                                                <Form.Label>Line Amount <span className="text-danger">*</span></Form.Label>
                                                <Form.Control type="number" placeholder="$ 0.00" />
                                            </Form.Group>
                                            <Form.Group className="w-100">
                                                <Form.Label>Department <span className="text-danger">*</span></Form.Label>
                                                <Form.Select>
                                                    <option>Select Department</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </div>
                                        <div className="d-flex flex-column flex-md-row gap-3 mb-2">
                                            <Form.Group className="w-100">
                                                <Form.Label>Account <span className="text-danger">*</span></Form.Label>
                                                <Form.Select>
                                                    <option>Select Account</option>
                                                </Form.Select>
                                            </Form.Group>
                                            <Form.Group className="w-100">
                                                <Form.Label>Location <span className="text-danger">*</span></Form.Label>
                                                <Form.Select>
                                                    <option>Select Location</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </div>
                                        <Form.Group className="w-100">
                                            <Form.Label>Description <span className="text-danger">*</span></Form.Label>
                                            <Form.Control as="textarea" rows={1} />
                                            <div className="d-flex justify-content-end">
                                                <Button variant="outline-secondary mt-3 bg-white ">
                                                    + Add Expense Coding
                                                </Button>
                                            </div>
                                        </Form.Group>
                                    </Form.Group>



                                    <Form.Group controlId="comments">
                                        <Card className="border-0 bg-transparent">
                                            <Card.Title><span className="formIcon me-3"><i className="far fa-comment-alt"></i></span>Comments</Card.Title>
                                            <Form.Control type="text" placeholder="Add a comment" />
                                        </Card>
                                    </Form.Group>

                                </Form>
                            </Card.Body>
                        </Card>
                        <Row>
                            <Card className="border-0 d-md-flex flex-column flex-md-row gap-3 justify-content-between p-3">
                                <Button variant="secondary" className="w-100">Save as Draft</Button>
                                <Button variant="primary" className="w-100">Submit & New</Button>
                            </Card>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Invoice;