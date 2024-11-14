import React from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import { Alert, Button, Form, Card, Modal } from "react-bootstrap";
import storage from "../../utils/storage";
import WithLoading from "../../hoc/withLoading";
import { MESSAGE } from "../../constants";
import useNotification from "../../hooks/useNotification";


const SignInComponent = React.memo((props) => {

  const [showSuccessMessage] = useNotification();

  const initForm = {
    username: '',
    password: '',
    isRememberMe: storage.getRememberMe(),
  };

  const validationForm = Yup.object({
    username: Yup.string().required('Required'),
    password: Yup.string().required('Required'),
  });

  const handleSubmitForm = async (values, { setErrors, setStatus, setSubmitting, setFieldValue }) => {
    try {
      await props.signIn(values.username, values.password, values.isRememberMe);
    } catch (error) {
      if (error.message == MESSAGE.LOGIN_WRONG_USERNAME_OR_PASSWORD) {
        setStatus({ success: false });
        setErrors({ login: error.message });
        setSubmitting(false);
        setFieldValue("password", '', false);
      } else if (error.message == MESSAGE.LOGIN_BLOCKED_ACCOUNT) {
        setStatus({ success: false });
        setSubmitting(false);
        setErrors({ login: error.message });
      } else {
        console.log(error)
      }

    }
  };

  const ButtonWithLoading = WithLoading(Button);

  return (
    <>
      <div className="text-center mt-4">
        <h2>Welcome to our program!</h2>
        <p className="lead">Sign in to your account to continue</p>
      </div>
      <Card>
        <Card.Body>
          <div className="m-sm-3">
            <Formik
              initialValues={initForm}
              validationSchema={validationForm}
              onSubmit={handleSubmitForm}
            >
              {({
                errors,
                setFieldError,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                setSubmitting,
                touched,
                values,
              }) => (
                <>
                  <Form onSubmit={handleSubmit}>
                    {/* Wrong username or password */}
                    {(errors.login && errors.login == MESSAGE.LOGIN_WRONG_USERNAME_OR_PASSWORD) && (
                      <Alert className="my-3" variant="danger">
                        <div className="alert-message">{errors.login}</div>
                      </Alert>
                    )}

                    {/* Block Account Modal */}
                    {(errors.login && errors.login == MESSAGE.LOGIN_BLOCKED_ACCOUNT) && (
                      <Modal show={true} onHide={() => setFieldError("login", "")}>
                        <Modal.Header closeButton>Blocked Account Modal</Modal.Header>
                        <Modal.Body className="text-center m-3">
                          <p className="mb-0">
                            Your account is inactive, Please check your email to active account or resend active account email.
                          </p>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={() => setFieldError("login", "")}>
                            Close
                          </Button>{" "}
                          <ButtonWithLoading
                            isLoading={isSubmitting}
                            variant="primary"
                            onClick={async () => {
                              // submit, show loading
                              setSubmitting(true);
                              // resend email
                              await props.resendAcitiveAccountEmail(values.username);
                              // show notification
                              showSuccessMessage("Resend active account email successfully!");
                              // hide loading
                              setSubmitting(false);
                              // hide modal
                              setFieldError("login", "");
                            }}>
                            Resend Email
                          </ButtonWithLoading>
                        </Modal.Footer>
                      </Modal>
                    )}
                    <Form.Group className="mb-3">
                      <Form.Label className='required'>Username</Form.Label>
                      <Form.Control
                        size="lg"
                        type="username"
                        name="username"
                        placeholder="Enter your username"
                        value={values.username}
                        isInvalid={Boolean(touched.username && errors.username)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {!!touched.username && (
                        <Form.Control.Feedback type="invalid">
                          {errors.username}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label className='required'>Password</Form.Label>
                      <Form.Control
                        size="lg"
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={values.password}
                        isInvalid={Boolean(touched.password && errors.password)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {!!touched.password && (
                        <Form.Control.Feedback type="invalid">
                          {errors.password}
                        </Form.Control.Feedback>
                      )}
                      <small>
                        <Link to="/auth/forgot-password">Forgot password?</Link>
                      </small>
                    </Form.Group>

                    <div>
                      <Form.Check
                        type="checkbox"
                        id="isRememberMe"
                        label="Remember me"
                        defaultChecked={values.isRememberMe}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="text-center mt-3">
                      <ButtonWithLoading
                        isLoading={isSubmitting}
                        type="submit"
                        variant="primary"
                        size="lg"
                      >
                        Sign in
                      </ButtonWithLoading>
                    </div>
                  </Form>
                </>
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

export default SignInComponent;
