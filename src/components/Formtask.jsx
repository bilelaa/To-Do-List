import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Form.css";  

function FormTask() {
  const location = useLocation();
  const { index } = useParams();
  const schema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
  });

  const [edit, setEdit] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("tasks");
    const tasks = JSON.parse(data);
    setEdit(tasks[index]);
  }, [index]);

  return (
    <>
      {edit !== null && (
        <Formik
          initialValues={{
            title: location.pathname === "/create" ? "" : edit.title,
            description: location.pathname === "/create" ? "" : edit.description,
            done: false,
          }}
          validationSchema={schema}
          onSubmit={async (values) => {
            const data = localStorage.getItem("tasks");
            const tasks = JSON.parse(data);
            if (location.pathname === "/create") {
              tasks.push(values);
            } else if (location.pathname.split("/").includes("edit")) {
              tasks.splice(index, 1, values);
            }
            localStorage.setItem("tasks", JSON.stringify(tasks));
          }}
        >
          {({ errors, touched }) => (
            <Form className="mt-6">
              <div className="mb-2">
                <label htmlFor="title" className="block text-sm font-semibold text-gray-800">
                  Title
                </label>
                <Field
                  name="title"
                  className="opacity-70 block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
                {errors.title && touched.title && (
                  <div className="text-red-600 text-sm mt-1">{errors.title}</div>
                )}
              </div>
              <div className="mb-2">
                <label htmlFor="description" className="block text-sm font-semibold text-gray-800">
                  Description
                </label>
                <Field
                  name="description"
                  className="opacity-70 block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
                {errors.description && touched.description && (
                  <div className="text-red-600 text-sm mt-1">{errors.description}</div>
                )}
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
                >
                  {location.pathname === "/create" ? "Add New Task" : "Save Update"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
}

export default FormTask;
