import React from "react";

import type { ZeroOrOne, ExamTypes, BasicTestProps } from "@/types/exam";
import type { FormikProps } from "formik";

import { useFormik, Formik, Form, Field } from "formik";
import * as Yup from "yup";

interface SubmitFormProps {
    firstName: string;
    lastName: string;
    email: string;
}

const initial: SubmitFormProps = {
    firstName: "",
    lastName: "",
    email: "",
};

const sampleSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
        .required("Required")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
});

const IkForm = () => {
    return (
        <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={sampleSchema}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 400);
            }}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                /* and other goodies */
            }) => (
                <div className="w-full max-w-lg min-h-50">
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
                                email
                            </label>
                            <input
                                type="email"
                                name="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            {errors.email && touched.email && errors.email}
                        </div>
                        <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {errors.password && touched.password && errors.password}
                        <button type="submit" disabled={isSubmitting}>
                            작성완료
                        </button>
                    </form>
                </div>
            )}
        </Formik>
    );
};

export default IkForm;

// // fuic
// ;;.

// retunn Eachs

// const IkTest = () => {
//     // const formik: FormikProps<SubmitFormProps> = useFormik<SubmitFormProps>({
//     //     initialValues,
//     //     () => void,

//     });
//     return (
//         <React.Fragment>
//             <form onSubmit={formik.handleSubmit}>
//                 <label htmlFor="firstName">First Name</label>
//                 <input
//                     id="firstName"
//                     name="firstName"
//                     type="text"
//                     onChange={formik.handleChange}
//                     value={formik.values.firstName}

//                 />
//                 <label htmlFor="lastName">Last Name</label>
//                 <input
//                     id="lastName"
//                     name="lastName"
//                     type="text"
//                     onChange={formik.handleChange}
//                     value={formik.values.lastName}
//                 />
//                 <label htmlFor="email">Email Address</label>
//                 <input
//                     id="email"
//                     name="email"
//                     type="email"
//                     onChange={formik.handleChange}
//                     value={formik.values.email}
//                 />
//                 <button type="submit">Submit</button>
//             </form>
//         </React.Fragment>
//     );
// };

// export default IkTest;

// // const IkTest = () => {
// //     const formik: FormikProps<BasicTestProps> = useFormik<BasicTestProps>({
// //         initialValues: {
// //             ec_name: "",
// //             e_student_collocate_kind: ZeroOrOne.no,
// //             e_type: ExamTypes.CPX,
// //             e_pa_use: ZeroOrOne.no,
// //             e_desc: "",
// //         },
// //     });
// //     return (
// //         <React.Fragment>
// //             <form onSubmit={formik.handleSubmit}>
// //                 <label htmlFor="firstName">First Name</label>
// //                 <input
// //                     id="ec_name"
// //                     name="ec_name"
// //                     type="text"
// //                     onChange={formik.handleChange}
// //                     value={formik.values.ec_name}
// //                 />
// //                 <label htmlFor="lastName">Last Name</label>
// //                 <input
// //                     id="e_desc"
// //                     name="e_desc"
// //                     type="text"
// //                     onChange={formik.handleChange}
// //                     value={formik.values.e_desc}
// //                 />
// //                 <label htmlFor="email">Email Address</label>
// //                 <input
// //                     id="email"
// //                     name="email"
// //                     type="email"
// //                     onChange={formik.handleChange}
// //                     value={formik.values.email}
// //                 />
// //                 <button type="submit">Submit</button>
// //             </form>
// //             <div>ikTest</div>
// //         </React.Fragment>
// //     );
// // };

// // export default IkTest;
