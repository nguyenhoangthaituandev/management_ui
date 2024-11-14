import React, { useEffect, useMemo, useRef } from "react";
import WithLoading from "../../../hoc/withLoading";
import { Form, Button, Modal } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import EmployeeNoDataComponent from "./EmployeeNoDataComponent";
import EmployeeTableComponent from "./EmployeeTableComponent";


const CreateDepartmentModal = React.memo((props) => {

    const formRef = useRef();

    const initForm = {
        name: '',
        managerId: ''
    };

    const validationForm = Yup.object({
        name: Yup.string()
            .required('Required')
            .max(100, 'Must be less than 100 characters')
            .test('checkExistsName', 'This name is already registered.', async name => {
                // call api
                const isExists = await props.existsByName(name);
                return !isExists;
            }),
        managerId: Yup.number()
            .required('Required')
    });

    const handleSubmitForm = async (values) => {
        await props.onSubmit(values.name, values.managerId);
    }

    useEffect(() => {
        formRef.current?.resetForm()
    }, [props.timeRefreshCreateForm])

    const ButtonWithLoading = WithLoading(Button);

    const getEmployees = (managerId) => {
        return props.employees.filter(employee => employee.id != managerId);
    }

    return (
        <Formik
            initialValues={initForm}
            validationSchema={validationForm}
            onSubmit={handleSubmitForm}
            validateOnChange={false}
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
                    <Modal.Header closeButton>Create Department Modal</Modal.Header>
                    <Modal.Body className="m-3">
                        <Form id="create-department-form" onSubmit={handleSubmit}>
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
                        </Form>

                        {!props.isShowTable ?
                            <Button variant="secondary" onClick={props.setShowTable} >
                                Add Employees
                            </Button>
                            :
                            (
                                getEmployees(values.managerId).length == 0 && props.isSearchEmpty()
                                    ? <EmployeeNoDataComponent />
                                    : <EmployeeTableComponent
                                        // table
                                        employees={getEmployees(values.managerId)}
                                        // sort
                                        currentSort={props.currentSort}
                                        setCurrentSort={props.setCurrentSort}
                                        resetCurrentSort={props.resetCurrentSort}
                                        // search
                                        currentSearch={props.currentSearch}
                                        setCurrentSearch={props.setCurrentSearch}
                                        // refresh table
                                        onResetTable={props.onResetTable}
                                        timeRefreshTable={props.timeRefreshTable}
                                        // checkbox
                                        addingIds={props.addingIds}
                                        setAddingIds={props.setAddingIds}
                                    />
                            )
                        }




                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={props.isHideModal}>
                            Close
                        </Button>{" "}
                        <div className="text-center">
                            <ButtonWithLoading
                                form="create-department-form"
                                type="submit"
                                variant="primary"
                                isLoading={isSubmitting}
                            >
                                Create
                            </ButtonWithLoading>
                        </div>
                    </Modal.Footer>
                </Modal>
            )}
        </Formik >
    );
});

export default CreateDepartmentModal;