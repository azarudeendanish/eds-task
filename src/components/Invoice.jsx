import { useFormik } from "formik";
import * as Yup from 'yup';
import { Container, Row, Col, Card, Button, Form, } from "react-bootstrap";
import { pdfjs, Document, Page } from 'react-pdf';
import { useState } from "react";
import resume from "../assets/basic-text.pdf";
import fileUploadDummy from '../assets/fileDummy.png'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { toBase64 } from "../helpers/utils";

const INITIALSTATE = {
    vendor: '',
    invoice: '',
    invoiceNumber: '',
    invoiceDate: '',
    amount: '',
    paymentTerm: '',
    duedate: '',
    postdate: '',
    invoiceDescription: '',
    lineAmount: '',
    department: '',
    account: '',
    location: '',
    description: '',
    comments: '',
}

const INITIALSTATE_WITH_PREFILLED_DATA = {
    vendor: 'A1_exterminators',
    invoice: '1',
    invoiceNumber: '1',
    invoiceDate: '2025-02-24',
    amount: '10',
    paymentTerm: 'cod',
    duedate: '2025-02-24',
    postdate: '2025-02-24',
    invoiceDescription: 'dummy description',
    lineAmount: '10',
    department: 'department1',
    account: 'account1',
    location: 'location1',
    description: 'dummy description',
    comments: 'dummy comments',
}



const Invoice = () => {
    const localStorageFormData = localStorage.getItem('invoiceData')
    const parsedData = localStorageFormData === null ? INITIALSTATE : JSON.parse(localStorageFormData)

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [file, setFile] = useState(localStorageFormData === null ? null : parsedData.file);
    // const [invoiceData, setInvoiceData] = useState(parsedData)
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
        initialValues: parsedData,
        validationSchema: Yup.object({
            vendor: Yup.string().required("Vendor is required!"),
            invoice: Yup.string().required("Invoice is required!"),
            invoiceNumber: Yup.number().required("Invoice Number is required!"),
            invoiceDate: Yup.string().required("Invoice Date is required!"),
            amount: Yup.number().required("Amount is required!"),
            paymentTerm: Yup.string().required("Payment Term is required!"),
            duedate: Yup.string().required("Due Date is required!"),
            postdate: Yup.string().required("Post Date is required!"),
            invoiceDescription: Yup.string().min(1, 'Invoice Desc must be atleast 1 characters').max(1000, 'Invoice Desc must be 1000 characters max').required("Invoice Description is required!"),
            lineAmount: Yup.number().required("Line Amount is required!"),
            department: Yup.string().required("Department is required!"),
            account: Yup.string().required("Account is required!"),
            location: Yup.string().required("Location is required!"),
            description: Yup.string().min(1, 'Description must be atleast 1 characters').max(1000, 'Description must be 1000 characters max').required("Description is required!"),
            comments: Yup.string()
        }),
        onSubmit: (values, form) => {
            setTimeout(() => {
                console.log(values);
                console.log(form)
                localStorage.setItem('invoiceData', JSON.stringify({...values, file}))
                form.resetForm();
            }, 400);
        },
    });

    const formik2 = useFormik({
        initialValues: {
            myFile: ''
        },
        validationSchema: Yup.object().shape({
            myFile: Yup.mixed().required('required')
                .test('fileFormat', 'Only PDF files are allowed', value => {
                    if (value) {
                        const supportedFormats = ['pdf'];
                        return supportedFormats.includes(value.name.split('.').pop());
                    }
                    return true;
                })
                .test('fileSize', 'File size must not be more than 1MB',
                    value => {
                        if (value) {
                            return value.size <= 3145728;
                            // return value.size <= 1145728;
                        }
                        return true;
                    }),
        }),
        onSubmit: (values) => {
            console.log(values.myFile);
            console.log('Form submitted!')
        }
    })
    // const toBase64 = file => new Promise((resolve, reject) => {
    //     const reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onload = () => resolve(reader.result);
    //     reader.onerror = reject;
    // });
    async function Main() {
       const file = document.querySelector('#myfile').files[0];
       console.log(await toBase64(file));
    }

    const handleFileUpload = async(e) => {
        e.preventDefault()
        formik2.setFieldValue('myFile', e.target.files[0]);
        const base64Data = await toBase64(e.target.files[0])
        console.log('pdf into base64: ',base64Data)
        setFile(base64Data)
    };
    
    const prefilledData = () => {
        console.log('form loads');
        setFile(resume)
        formik.resetForm({values: INITIALSTATE_WITH_PREFILLED_DATA})
    }
    return (
        <>
            <Container fluid>
                <Row>
                    <Col md={6} className="mt-3">
                        <div className="vh-100 bg-white border-3 d-flex justify-content-center align-items-center scrollable-content" style={{ borderStyle: 'dashed', borderColor: '#ccc' }}>
                            {file ?
                                <div className="w-100 h-100">
                                    <Document
                                        file={file}
                                        onLoadSuccess={onDocumentLoadSuccess}
                                        option={options}
                                    >
                                        <Page
                                            pageNumber={pageNumber}
                                        />
                                    </Document>
                                    <p>Page {pageNumber} of {numPages}</p>
                                </div>
                                :
                                <Card className="p-4 text-center w-100 border-0">
                                    <Card.Body>
                                        <Card.Title>Upload Your Invoice</Card.Title>
                                        <Card.Text>To auto-populate fields and save time</Card.Text>
                                        <div>
                                            <img src={fileUploadDummy} alt='fileImage' className="w-50" />
                                        </div>
                                        <input type='file' name='file-upload' accept='.pdf' id='uploadButton' className="d-none" onChange={handleFileUpload} />
                                        <label htmlFor='uploadButton' className="btn btn-outline-secondary position-relative">
                                            Upload File <i className="fas fa-upload ms-1"></i>
                                        </label>
                                        <div>{(formik2.errors.myFile) ? <p style={{ color: 'red' }}>{formik2.errors.myFile}</p> : null}</div>
                                        <Card.Text className="mt-2"><span className="text-primary">click to upload</span> or Drag and Drop</Card.Text>
                                    </Card.Body>
                                </Card>
                                // <Form onSubmit={formik2.handleSubmit}>

                                // </Form>
                            }
                        </div>
                    </Col>
                    <Col md={6} className="mt-3">
                        <Form onSubmit={formik.handleSubmit}>
                            <Card className="p-4 border-0 bg-transparent pt-0">
                                <Card.Body className="pt-0">
                                    <Card.Title><span className="formIcon me-3"><i className="far fa-building"></i></span>Vendor Details</Card.Title>
                                    <Card.Subtitle className="py-3">Vendor Information</Card.Subtitle>
                                    <Form.Group controlId="vendor">
                                        <Form.Label>Vendor <span className="text-danger">*</span></Form.Label>
                                        <Form.Select
                                            name="vendor"
                                            value={formik.values.vendor}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className={formik.errors.vendor ? "input-error" : ''}
                                        >
                                            <option>Select</option>
                                            <option value='A1_exterminators'>A - 1 Exterminators</option>
                                            <option value='A2_exterminators'>B - 1 Exterminators</option>
                                            <option value='A3_exterminators'>C - 1 Exterminators</option>
                                        </Form.Select>
                                        {formik.touched.vendor && formik.errors.vendor ? (
                                            <div className="text-danger fw-bold">{formik.errors.vendor}</div>
                                        ) : null}
                                    </Form.Group>
                                    <Card.Title><span className="formIcon me-3 mt-4"><i className="far fa-file-alt"></i></span>Invoice Details</Card.Title>
                                    <Card.Subtitle className="py-3">General Information</Card.Subtitle>
                                    <Form.Group controlId="invoice">
                                        <Form.Label>Purchase Order Number <span className="text-danger">*</span></Form.Label>
                                        <Form.Select
                                            name='invoice'
                                            value={formik.values.invoice}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className={formik.errors.invoice ? "input-error" : ''}
                                        >
                                            <option>Select PO Number</option>
                                            <option value='1'>001</option>
                                            <option value='2'>002</option>
                                            <option value='3'>003</option>
                                        </Form.Select>
                                        {formik.touched.invoice && formik.errors.invoice ? (
                                            <div className="text-danger fw-bold">{formik.errors.invoice}</div>
                                        ) : null}
                                        <Card.Subtitle className="my-3">Invoice Details</Card.Subtitle>
                                        <div className="d-flex flex-column flex-md-row gap-3 mb-2">
                                            <Form.Group className="w-100">
                                                <Form.Label>Invoice Number <span className="text-danger">*</span></Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name='invoiceNumber'
                                                    value={formik.values.invoiceNumber}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    className={formik.errors.invoiceNumber ? "input-error" : ''}
                                                    placeholder="Enter Invoice Number" />
                                                {formik.touched.invoiceNumber && formik.errors.invoiceNumber ? (
                                                    <div className="text-danger fw-bold">{formik.errors.invoiceNumber}</div>
                                                ) : null}
                                            </Form.Group>

                                            <Form.Group className="w-100">
                                                <Form.Label>Invoice Date <span className="text-danger">*</span></Form.Label>
                                                <Form.Control
                                                    type="date"
                                                    name='invoiceDate'
                                                    value={formik.values.invoiceDate}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    className={formik.errors.invoiceDate ? "input-error" : ''}
                                                />
                                                {formik.touched.invoiceDate && formik.errors.invoiceDate ? (
                                                    <div className="text-danger fw-bold">{formik.errors.invoiceDate}</div>
                                                ) : null}
                                            </Form.Group>

                                        </div>
                                        <div className="d-flex flex-column flex-md-row gap-3 mb-2">
                                            <Form.Group className="w-100">
                                                <Form.Label>Total Amount <span className="text-danger">*</span></Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    placeholder="$ 0.00"
                                                    name='amount'
                                                    value={formik.values.amount}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    className={formik.errors.amount ? "input-error" : ''}
                                                />
                                                {formik.touched.amount && formik.errors.amount ? (
                                                    <div className="text-danger fw-bold">{formik.errors.amount}</div>
                                                ) : null}
                                            </Form.Group>
                                            <Form.Group className="w-100">
                                                <Form.Label>Payment Terms <span className="text-danger">*</span></Form.Label>
                                                <Form.Select
                                                    name='paymentTerm'
                                                    value={formik.values.paymentTerm}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    className={formik.errors.paymentTerm ? "input-error" : ''}
                                                >
                                                    <option>Select Payment</option>
                                                    <option value='cod'>COD</option>
                                                    <option value='online'>Online Payment</option>
                                                </Form.Select>
                                                {formik.touched.paymentTerm && formik.errors.paymentTerm ? (
                                                    <div className="text-danger fw-bold">{formik.errors.paymentTerm}</div>
                                                ) : null}
                                            </Form.Group>
                                        </div>
                                        <div className="d-flex flex-column flex-md-row gap-3 mb-2">
                                            <Form.Group className="w-100">
                                                <Form.Label>Invoice Due Date <span className="text-danger">*</span></Form.Label>
                                                <Form.Control
                                                    type="date"
                                                    name='duedate'
                                                    value={formik.values.duedate}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    className={formik.errors.duedate ? "input-error" : ''}
                                                />
                                                {formik.touched.duedate && formik.errors.duedate ? (
                                                    <div className="text-danger fw-bold">{formik.errors.duedate}</div>
                                                ) : null}
                                            </Form.Group>
                                            <Form.Group className="w-100">
                                                <Form.Label>GL Post Date <span className="text-danger">*</span></Form.Label>
                                                <Form.Control
                                                    type="date"
                                                    name='postdate'
                                                    value={formik.values.postdate}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    className={formik.errors.postdate ? "input-error" : ''}
                                                />
                                                {formik.touched.postdate && formik.errors.postdate ? (
                                                    <div className="text-danger fw-bold">{formik.errors.postdate}</div>
                                                ) : null}
                                            </Form.Group>
                                        </div>
                                        <Form.Group className="w-100">
                                            <Form.Label>Invoice Description <span className="text-danger">*</span></Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={1}
                                                name='invoiceDescription'
                                                value={formik.values.invoiceDescription}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                className={formik.errors.invoiceDescription ? "input-error" : ''}
                                            />
                                            {formik.touched.invoiceDescription && formik.errors.invoiceDescription ? (
                                                <div className="text-danger fw-bold">{formik.errors.invoiceDescription}</div>
                                            ) : null}
                                        </Form.Group>
                                        <Card.Subtitle className="my-3">Expense Details</Card.Subtitle>
                                        <div className="d-flex flex-column flex-md-row gap-3 mb-2">
                                            <Form.Group className="w-100">
                                                <Form.Label>Line Amount <span className="text-danger">*</span></Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    placeholder="$ 0.00"
                                                    name='lineAmount'
                                                    value={formik.values.lineAmount}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    className={formik.errors.lineAmount ? "input-error" : ''}
                                                />
                                                {formik.touched.lineAmount && formik.errors.lineAmount ? (
                                                    <div className="text-danger fw-bold">{formik.errors.lineAmount}</div>
                                                ) : null}
                                            </Form.Group>
                                            <Form.Group className="w-100">
                                                <Form.Label>Department <span className="text-danger">*</span></Form.Label>
                                                <Form.Select
                                                    name='department'
                                                    value={formik.values.department}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    className={formik.errors.department ? "input-error" : ''}
                                                >
                                                    <option>Select Department</option>
                                                    <option value='department1'>Department 1</option>
                                                    <option value='department2'>Department 2</option>
                                                    <option value='department3'>Department 3</option>
                                                </Form.Select>
                                                {formik.touched.department && formik.errors.department ? (
                                                    <div className="text-danger fw-bold">{formik.errors.department}</div>
                                                ) : null}
                                            </Form.Group>
                                        </div>
                                        <div className="d-flex flex-column flex-md-row gap-3 mb-2">
                                            <Form.Group className="w-100">
                                                <Form.Label>Account <span className="text-danger">*</span></Form.Label>
                                                <Form.Select
                                                    name='account'
                                                    value={formik.values.account}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    className={formik.errors.account ? "input-error" : ''}
                                                >
                                                    <option>Select Account</option>
                                                    <option value='account1'>Account 1</option>
                                                    <option value='account2'>Account 2</option>
                                                    <option value='account3'>Account 3</option>
                                                </Form.Select>
                                                {formik.touched.account && formik.errors.account ? (
                                                    <div className="text-danger fw-bold">{formik.errors.account}</div>
                                                ) : null}
                                            </Form.Group>
                                            <Form.Group className="w-100">
                                                <Form.Label>Location <span className="text-danger">*</span></Form.Label>
                                                <Form.Select
                                                    name='location'
                                                    value={formik.values.location}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    className={formik.errors.location ? "input-error" : ''}
                                                >
                                                    <option>Select Location</option>
                                                    <option value='location1'>Location 1</option>
                                                    <option value='location2'>Location 2</option>
                                                    <option value='location3'>Location 3</option>
                                                </Form.Select>
                                                {formik.touched.location && formik.errors.location ? (
                                                    <div className="text-danger fw-bold">{formik.errors.location}</div>
                                                ) : null}
                                            </Form.Group>
                                        </div>
                                        <Form.Group className="w-100">
                                            <Form.Label>Description <span className="text-danger">*</span></Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={1}
                                                name='description'
                                                value={formik.values.description}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                className={formik.errors.description ? "input-error" : ''}
                                            />
                                            {formik.touched.description && formik.errors.description ? (
                                                <div className="text-danger fw-bold">{formik.errors.description}</div>
                                            ) : null}
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
                                            <Form.Control
                                                type="text"
                                                placeholder="Add a comment"
                                                name='comments'
                                                value={formik.values.comments}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                className={formik.errors.comments ? "input-error" : ''}
                                            />
                                        </Card>
                                    </Form.Group>
                                </Card.Body>
                            </Card>
                            <Row>
                                <Card className="border-0 d-md-flex flex-column flex-md-row gap-3 justify-content-between p-3">
                                    <Button variant="secondary" className="w-100" onClick={prefilledData}>Load Dummy Data</Button>
                                    <Button type="submit" variant="primary" className="w-100">Submit & New</Button>
                                </Card>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Container >
        </>
    )
}

export default Invoice;