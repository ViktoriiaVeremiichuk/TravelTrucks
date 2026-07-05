'use client';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import toast from 'react-hot-toast';
import { BsExclamationCircle } from 'react-icons/bs';
import styles from './BookForm.module.css';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
});

const initialValues = {
  name: '',
  email: '',
};

interface BookFormProps {
  camperId: string;
}

export const BookForm = ({ camperId }: BookFormProps) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          const response = await axios.post(
            `https://campers-api.goit.study/campers/${camperId}/booking-requests`,
            values
          );
          toast.success(response.data.message, {
            duration: 5000,
          });
          resetForm();
        } catch (error) {
          console.log(error);
          toast.error('Failed to book. Please try again.');
        }
      }}
    >
      {({ errors, touched }) => (
        <Form className={styles.form}>
          <p className={styles.formTitle}>Book your campervan now</p>
          <p className={styles.formSupText}>
            Stay connected! We are always ready to help you.
          </p>
          <div className={styles.inputBlock}>
            <div
              className={`${styles.fieldWrapper} ${errors.name && touched.name ? styles.fieldWrapperWithError : ''}`}
            >
              <Field
                name="name"
                className={styles.formInput}
                placeholder="Name*"
              />
              <ErrorMessage
                name="name"
                component="span"
                className={styles.error}
              />

              {errors.name && touched.name && (
                <>
                  <div className={styles.errorContainer}>
                    <label className={styles.floatingLabel}>Name*</label>
                  </div>
                  <BsExclamationCircle className={styles.inputErrorIcon} />
                </>
              )}
            </div>
            <div
              className={`${styles.fieldWrapper}  ${errors.email && touched.email ? styles.fieldWrapperWithError : ''}`}
            >
              <Field
                name="email"
                type="email"
                className={styles.formInput}
                placeholder="Email*"
              />
              <ErrorMessage
                name="email"
                component="span"
                className={styles.error}
              />

              {errors.email && touched.email && (
                <>
                  <div className={styles.errorContainer}>
                    <label className={styles.floatingLabel}>Email*</label>
                  </div>
                  <BsExclamationCircle className={styles.inputErrorIcon} />
                </>
              )}
            </div>
          </div>
          <button className={styles.button} type="submit">
            Send
          </button>
        </Form>
      )}
    </Formik>
  );
};
