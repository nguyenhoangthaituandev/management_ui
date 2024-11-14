import React, { useEffect, useRef } from "react";
import WithLoading from "../../../hoc/withLoading";
import { Form, Button, Modal } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";

const UpdateDepartmentModal = React.memo((props) => {

    const formRef = useRef();

    const initForm = {
        name: props.detailInfo?.name || "",
        managerId: props.detailInfo?.id || "",
        memberSize: props.detailInfo?.memberSize || 0,
        createdDate: props.detailInfo?.createdDateTime || ""
    };

    const validationForm = Yup.object({
        name: Yup.string()
            .required('Required')
            .max(100, 'Must be less than 100 characters')
            .test('checkExistsName', 'This name is already registered.', async name => {
                if (name == props.detailInfo.name) {
                    return true;
                }
                // call api
                const isExists = await props.existsByName(name);
                return !isExists;
            }),
        managerId: Yup.number()
            .required('Required')
    });

    const handleSubmitForm = async (values) => {
        await props.onSubmit(props.detailInfo.id, values.name, values.managerId);
    }

    useEffect(() => {
        formRef.current?.resetForm();
    }, [props.timeRefreshForm]);

    const ButtonWithLoading = WithLoading(Button);

    return (
        <Formik
            initialValues={initForm}
            validationSchema={validationForm}
            onSubmit={handleSubmitForm}
            validateOnChange={false}
            enableReinitialize={true}
            innerRef={formRef}
        >
            {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
                values,
            }) => (
                <Modal
                    show={true}
                    onHide={props.isHideModal}
                >
                    <Modal.Header closeButton>Update Department Modal</Modal.Header>
                    <Modal.Body className="m-3">
                        <Form id="update-department-form" onSubmit={handleSubmit}>
                            {/* Name */}
                            <Form.Group className="mb-3">
                                <Form.Label className="required">Name</Form.Label>
                                <Form.Control
                                    size="md"
                                    type="text"
                                    name="name"
                                    placeholder="Enter name"
                                    value={values.name}
                                    isInvalid={Boolean(touched.name && errors.name)}
                                    onBlur={handleBlur}
                                    onChange={handleChange} />
                                {!!touched.name && (
                                    <Form.Control.Feedback type="invalid">
                                        {errors.name}
                                    </Form.Control.Feedback>
                                )}
                            </Form.Group>

                            {/* Manager */}
                            <Form.Group className="mb-3">
                                <Form.Label className="required">Manager</Form.Label>
                                <Form.Control
                                    size="md"
                                    as="select"
                                    name="managerId"
                                    value={values.managerId}
                                    isInvalid={Boolean(touched.managerId && errors.managerId)}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                >
                                    <option disabled value="">Select Manager</option>
                                    {
                                        props.managers.map(account =>
                                            <option value={account.id} key={account.id}>
                                                {account.fullname}
                                            </option>
                                        )
                                    }
                                </Form.Control>
                                {!!touched.managerId && (
                                    <>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.managerId}
                                        </Form.Control.Feedback>
                                    </>
                                )}
                            </Form.Group>

                            {/* Total Member */}
                            <Form.Group className="mb-3">
                                <Form.Label className="required">Total Member</Form.Label>
                                <Form.Control
                                    size="md"
                                    type="number"
                                    name="memberSize"
                                    value={values.memberSize}
                                    disabled={true}
                                />
                            </Form.Group>

                            {/* Created Date */}
                            <Form.Group className="mb-3">
                                <Form.Label className="required">Created Date</Form.Label>
                                <Form.Control
                                    size="md"
                                    type="text"
                                    name="createdDate"
                                    value={values.createdDate}
                                    disabled={true}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={props.isHideModal}>
                            Close
                        </Button>{" "}
                        <div className="text-center">
                            <ButtonWithLoading
                                form="update-department-form"
                                type="submit"
                                variant="primary"
                                isLoading={isSubmitting}
                            >
                                Update
                            </ButtonWithLoading>
                        </div>
                    </Modal.Footer>
                </Modal>
            )}
        </Formik >
    );
});

export default UpdateDepartmentModal;