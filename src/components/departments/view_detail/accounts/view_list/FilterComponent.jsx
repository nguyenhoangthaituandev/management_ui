import React, { useEffect, useRef } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import moment from 'moment';

const FilterComponent = React.memo((props) => {
    const formRef = useRef();

    const initForm = {
        minCreatedDate: props.currentFilter.minCreatedDate,
        maxCreatedDate: props.currentFilter.maxCreatedDate,
        role: props.currentFilter.role,
        status: props.currentFilter.status
    };

    const validationForm = Yup.object({
        minCreatedDate: Yup.date()
            .min(new Date(1970, 10, 10), 'Must be greater than 1970')
            .max(new Date(), 'Created Date must before to day')
            .test('minCreatedDateLessThanMaxCreatedDate', 'Must be less than max created date',
                (minCreatedDate, obj) => {
                    let maxCreatedDate = obj.parent.maxCreatedDate;
                    if (!minCreatedDate || !maxCreatedDate) {
                        return true;
                    }

                    let min = new Date(minCreatedDate);
                    let max = new Date(maxCreatedDate);

                    if (min < new Date(1970, 10, 10) || max < new Date(1970, 10, 10)) {
                        return false;
                    }

                    if (min > max) {
                        return false;
                    }

                    return true;
                }),
        maxCreatedDate: Yup.date()
            .min(new Date(1970, 10, 10), 'Must be greater than 1970')
            .max(new Date(), 'Created Date must before to day')
            .test('maxCreatedDateGreaterThanMinCreatedDate', 'Must be greater than min date',
                (maxCreatedDate, obj) => {
                    let minCreatedDate = obj.parent.minCreatedDate;
                    if (!minCreatedDate || !maxCreatedDate) {
                        return true;
                    }

                    let min = new Date(minCreatedDate);
                    let max = new Date(maxCreatedDate);

                    if (min < new Date(1970, 10, 10) || max < new Date(1970, 10, 10)) {
                        return false;
                    }

                    if (max < min) {
                        return false;
                    }

                    return true;
                }),
    });

    const handleSubmitForm = (values) => {
        let formattedMinCreatedDate;
        let formattedMaxCreatedDate;

        // Chỉ format minCreatedDate nếu nó có giá trị
        if (values.minCreatedDate) {
            formattedMinCreatedDate = moment(values.minCreatedDate).format('DD-MM-YYYY');
        }

        // Chỉ format maxCreatedDate nếu nó có giá trị
        if (values.maxCreatedDate) {
            formattedMaxCreatedDate = moment(values.maxCreatedDate).format('DD-MM-YYYY');
        }

        if (props.currentFilter.minCreatedDate !== values.minCreatedDate
            || props.currentFilter.maxCreatedDate !== values.maxCreatedDate
            || props.currentFilter.role != values.role
            || props.currentFilter.status != values.status
        ) {
            props.setCurrentFilter({
                minCreatedDate: formattedMinCreatedDate,
                maxCreatedDate: formattedMaxCreatedDate,
                role: values.role,
                status: values.status
            });
            props.resetPaging();
            props.resetCurrentSort();
        }

    }

    useEffect(() => {
        formRef.current?.resetForm();
    }, [props.timeRefreshTable])

    return (
        <Formik
            initialValues={initForm}
            validationSchema={validationForm}
            onSubmit={handleSubmitForm}
            innerRef={formRef}
        >
            {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                touched,
                values,
            }) => (
                <>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={5}>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Control
                                                size="md"
                                                type="date"
                                                name="minCreatedDate"
                                                placeholder="Enter min created Date"
                                                value={values.minCreatedDate}
                                                isInvalid={Boolean(touched.minCreatedDate && errors.minCreatedDate)}
                                                onBlur={handleBlur}
                                                onChange={handleChange} />
                                            {!!touched.minCreatedDate && (
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.minCreatedDate}
                                                </Form.Control.Feedback>
                                            )}
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Control
                                                size="md"
                                                type="date"
                                                name="maxCreatedDate"
                                                placeholder="Enter max date"
                                                value={values.maxCreatedDate}
                                                isInvalid={Boolean(touched.maxCreatedDate && errors.maxCreatedDate)}
                                                onBlur={handleBlur}
                                                onChange={handleChange} />
                                            {!!touched.maxCreatedDate && (
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.maxCreatedDate}
                                                </Form.Control.Feedback>
                                            )}
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={5}>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Select
                                                size="md"
                                                name="role"
                                                value={values.role}
                                                onChange={handleChange}
                                            >
                                                <option value="">Select Role</option>
                                                <option value='ADMIN'>ADMIN</option>
                                                <option value='EMPLOYEE'>EMPLOYEE</option>
                                                <option value='MANAGER'>MANAGER</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Select
                                                size="md"
                                                name="status"
                                                value={values.status}
                                                onChange={handleChange}
                                            >
                                                <option value="">Select Status</option>
                                                <option value='ACTIVE'>ACTIVE</option>
                                                <option value='BLOCK'>BLOCK</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={2}>
                                <Button type="submit" variant="primary" size="md" >
                                    Filter
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </>
            )}
        </Formik>
    );
});

export default FilterComponent;