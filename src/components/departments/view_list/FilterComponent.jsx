import React, { useEffect, useRef } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import moment from 'moment';

const FilterComponent = (props) => {

    const formRef = useRef();

    const initForm = {
        minCreatedDate: props.currentFilter.minCreatedDate,
        maxCreatedDate: props.currentFilter.maxCreatedDate,
        minMemberSize: props.currentFilter.minMemberSize,
        maxMemberSize: props.currentFilter.maxMemberSize
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
        minMemberSize: Yup.number()
            .moreThan(-1, 'min member size must greater than 0 or equal')
            .integer('Must be integer')
            .test('minMemberSizeLessThanMaxMemberSize', 'Must be less than max member size',
                (minMemberSize, obj) => {
                    let maxMemberSize = obj.parent.maxMemberSize;
                    if (minMemberSize && maxMemberSize && minMemberSize >= 0 && maxMemberSize >= 0 && minMemberSize > maxMemberSize) {
                        return false;
                    }
                    return true;
                }),
        maxMemberSize: Yup.number()
            .moreThan(-1, 'max member size must greater than 0 or equal')
            .integer('Must be integer')
            .test('maxMemberSizeGreaterThanMinMemberSize', 'Must be greater than min member size',
                (maxMemberSize, obj) => {
                    let minMemberSize = obj.parent.minMemberSize;
                    if (minMemberSize && maxMemberSize && minMemberSize >= 0 && maxMemberSize >= 0 && maxMemberSize < minMemberSize) {
                        return false;
                    }
                    return true;
                })

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
            || props.currentFilter.minMemberSize !== values.minMemberSize
            || props.currentFilter.maxMemberSize !== values.maxMemberSize
        ) {
            props.setCurrentFilter({
                minCreatedDate: formattedMinCreatedDate,
                maxCreatedDate: formattedMaxCreatedDate,
                minMemberSize: values.minMemberSize,
                maxMemberSize: values.maxMemberSize,

            });
            props.resetPaging();
            props.resetCurrentSort();
        }
    };

    useEffect(() => {
        formRef.current?.resetForm()
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
                                        <Form.Group>
                                            <Form.Control
                                                size="md"
                                                type="date"
                                                name="minCreatedDate"
                                                placeholder="Enter min Created Date"
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
                                        <Form.Group>
                                            <Form.Control
                                                size="md"
                                                type="date"
                                                name="maxCreatedDate"
                                                placeholder="Enter max Created date"
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
                                        <Form.Group>
                                            <Form.Control
                                                size="md"
                                                type="number"
                                                name="minMemberSize"
                                                placeholder="Enter min minMember Size"
                                                value={values.minMemberSize}
                                                isInvalid={Boolean(touched.minMemberSize && errors.minMemberSize)}
                                                onBlur={handleBlur}
                                                onChange={handleChange} />
                                            {!!touched.minMemberSize && (
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.minMemberSize}
                                                </Form.Control.Feedback>
                                            )}
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Control
                                                size="md"
                                                type="number"
                                                name="maxMemberSize"
                                                placeholder="Enter max member Size"
                                                value={values.maxMemberSize}
                                                isInvalid={Boolean(touched.maxMemberSize && errors.maxMemberSize)}
                                                onBlur={handleBlur}
                                                onChange={handleChange} />
                                            {!!touched.maxMemberSize && (
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.maxMemberSize}
                                                </Form.Control.Feedback>
                                            )}
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={2} className="d-flex flex-row-reverse align-items-center">
                                <Button type="submit" variant="primary" size="md" >
                                    Filter
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </>
            )}
        </Formik >
    );
}

export default FilterComponent;