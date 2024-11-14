import React from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import { Button, Form, Card } from "react-bootstrap";
import WithLoading from "../../hoc/withLoading";


const ForgotPasswordComponent = React.memo((props) => {

  const initForm = {
    usernameOrEmail: '',
  };

  const validationForm = Yup.object({
    usernameOrEmail: Yup.string()
      .required("Required")
      .test('checkExistsUsernameOrEmail', 'This username or email does not exists', async usernameOrEmail => {
        // call api
        const isExists = await props.existsByUsernameOrEmail(usernameOrEmail);
        return isExists;
      }),
  });

  const handleSubmitForm = async (values, { setErrors, setStatus, setSubmitting, setFieldValue }) => {
    await props.sendEmailToChangePassword(values.usernameOrEmail);
  };

  const ButtonWithLoading = WithLoading(Button);

  return (
    <>
      <div className="text-center mt-4">
        <h1 className="h2">Forgot password</h1>
        <p className="lead">Enter your email or username to send email for change password.</p>
      </div>

      <Card>
        <Card.Body>
          <div className="m-sm-3">
            <Formik
              initialValues={initForm}
              validationSchema={validationForm}
              onSubmit={handleSubmitForm}
              validateOnChange={false}
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
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label className='required'>Username | Email</Form.Label>
                    <Form.Control
                      type="text"
                      name="usernameOrEmail"
                      placeholder="Enter your username or email"
                      value={values.usernameOrEmail}
                      isInvalid={Boolean(touched.usernameOrEmail && errors.usernameOrEmail)}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {!!touched.usernameOrEmail && (
                      <Form.Control.Feedback type="invalid">
                        {errors.usernameOrEmail}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>
                  <div className=" mt-3 text-center">
                    <ButtonWithLoading
                      isLoading={isSubmitting}
                      type="submit"
                      variant="primary"
                      size="lg">
                      Send email
                    </ButtonWithLoading>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Card.Body>
      </Card >
      <div className="text-center mb-3">
        Don't have an account? <Link to="/auth/sign-up">Sign up</Link>
      </div>
    </>

  );
});

export default ForgotPasswordComponent;
