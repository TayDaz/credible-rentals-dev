import { useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import NewAddForm from "./components/new-add-form";
import LoadingScreen from "../../../../shared-components/loading-screen";
import SuccessScreen from "../../../../shared-components/success-screen";
import ErrorScreen from "../../../../shared-components/success-screen";
import SubCategoryForm from "../sub-category-form";

import NewUploadImage from "./assets/new-upload.png";
import {
  NOT_INITIATED,
  INITIATED,
  SUCCESS,
  FAILURE,
} from "../../../../constants";

import "./styles.scss";

const viewMap = {
  [NOT_INITIATED]: NewAddForm,
  [INITIATED]: LoadingScreen,
  [SUCCESS]: SuccessScreen,
  [FAILURE]: ErrorScreen,
};

const NewAdd = (props) => {
  const {
    newAddUploadStatus,
    onClickNewAddUploadSuccess,
    onClickNewAddUploadError,
  } = props;

  useEffect(() => {
    setView(newAddUploadStatus);
  }, [newAddUploadStatus]);

  const [view, setView] = useState(NOT_INITIATED);

  const Screen = viewMap[view];

  const screenProps = {
    ...props,
    onClickSuccess: onClickNewAddUploadSuccess,
    onClickError: onClickNewAddUploadError,
    successMessage: "Your add has been uploaded successfully",
    errorMessage:
      "Your add could not be uploaded due to some issue. Please try again",
  };

  // const getForm = () => (
  //   <form
  //     className='p-col-12 p-grid p-justify-center form__container'
  //     onSubmit={props.formik.handleSubmit}>
  //     <div className='p-col-12 p-field p-md-6 p-mb-4'>
  //       <span className='p-float-label'>
  //         <Dropdown
  //           value={props.formik.values.category}
  //           name='category'
  //           inputId='category'
  //           options={props.categories}
  //           onChange={props.formik.handleChange}
  //           optionLabel='label'
  //           // placeholder="Select a Category"
  //         />
  //         <label htmlFor='category'>Category</label>
  //       </span>
  //     </div>
  //     <div className='p-col-12 p-field p-md-6 p-mb-4'>
  //       <span className='p-float-label'>
  //         <Dropdown
  //           value={props.formik.values.subCategory}
  //           name='subCategory'
  //           inputId='subCategory'
  //           options={props.subCategories[props.formik.values.category]}
  //           onChange={props.formik.handleChange}
  //           optionLabel='label'
  //           // placeholder="Select a Sub-Category"
  //         />
  //         <label htmlFor='subCategory'>Sub-Category</label>
  //       </span>
  //     </div>
  //     <SubCategoryForm
  //       formData={
  //         props.subCategoriesForm?.[props.formik.values.category]?.[
  //           props.formik.values.subCategory
  //         ]
  //       }
  //       onChange={props.formik.handleChange}
  //       values={props.formik.values}
  //     />
  //     <Photos {...props} />
  //     <div className='p-col-12 p-md-4 p-lg-4'>
  //       <Button label='Submit' type='submit' />
  //     </div>
  //   </form>
  // );

  // const getScreen = () => {
  //   if (isNewAddUploading) {
  //     return (
  //       <LoadingScreen loadingMessage='Please wait till new add uploads...' />
  //     );
  //   } else (newAddUploadStatus === SUCCESS){
  //     return <SuccessScreen successMessage="Your add has been successfully uploaded" onClick={ clearNewAddForm}/>
  //   } else if(newAddUploadStatus === FAILURE)
  // }

  return (
    <div className='p-grid p-formgrid p-fluid p-align-center new-uploads__wrapper'>
      <div className='p-col-12 p-mb-6 p-text-center'>
        {/* //Upload Icon */}
        <img
          src={NewUploadImage}
          alt='New Upload Icon'
          style={{ width: "140px" }}
        />
      </div>
      {/* // Loading, SUCCESS, ERROR OR Form Screen*/}
      <Screen {...screenProps} />
    </div>
  );
};

export default NewAdd;

// const NewUploads_old = (props) => {
//   // const formik = useFormik({
//   // 	initialValues: {
//   // 		category: null,
//   // 		subCategory: null,
//   // 	},
//   // 	validationSchema: schema,
//   // 	onSubmit: (values) => console.log(values),
//   // });

//   // console.log("[uploads/new-uploads/.js] formik ", formik);

//   return (
//     <form onSubmit={props.formik.handleSubmit}>
//       <div className='p-fluid p-grid p-formgrid p-justify-center p-mb-3'>
//         <div className='p-col-12 p-md-6 p-lg-6 p-text-center'>
//           <i
//             className='pi pi-upload'
//             style={{ fontSize: "5rem", color: "var(--green-500)" }}></i>
//         </div>
//       </div>
//       <div className='p-fluid p-grid p-formgrid p-justify-center p-mb-1'>
//         <div className='p-col-12 p-md-6 p-lg-6 p-mb-3'>
//           <Dropdown
//             value={props.formik.values.category}
//             name='category'
//             options={props.categories}
//             onChange={props.formik.handleChange}
//             optionLabel='label'
//             placeholder='Select a Category'
//           />
//         </div>
//         <div className='p-col-12 p-md-6 p-lg-6 p-mb-3'>
//           <Dropdown
//             value={props.formik.values.subCategory}
//             name='subCategory'
//             options={props.subCategories[props.formik.values.category]}
//             onChange={props.formik.handleChange}
//             optionLabel='label'
//             placeholder='Select a Sub-Category'
//           />
//         </div>
//       </div>

//       <div className='p-fluid p-grid p-formgrid p-justify-center p-mb-3'>
//         <SubCategoryForm
//           formData={props.subCategoriesForm[props.formik.values.subCategory]}
//           onChange={props.formik.handleChange}
//           values={props.formik.values}
//         />
//       </div>
//       <div className='p-fluid p-grid p-formgrid p-justify-center'>
//         <Photos {...props} />
//       </div>
//       <div className='p-fluid p-grid p-formgrid p-justify-center'>
//         <div className='p-col-12 p-md-3 p-lg-3'>
//           <Button label='Submit' type='submit' />
//         </div>
//       </div>
//     </form>
//   );
// };
