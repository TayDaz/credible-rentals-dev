import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import SubCategoryForm from "../../../sub-category-form";
import Photos from "../../../photos";

const NewAddForm = (props) => {
  const { formik, categories, subCategories } = props;

  return (
    <form
      className='p-col-12 p-grid p-justify-center form__container'
      onSubmit={formik.handleSubmit}>
      <div className='p-col-12 p-field p-md-6 p-mb-4'>
        <span className='p-float-label'>
          <Dropdown
            value={formik.values.category}
            name='category'
            inputId='category'
            options={categories}
            onChange={formik.handleChange}
            optionLabel='label'
            // placeholder="Select a Category"
          />
          <label htmlFor='category'>Category</label>
        </span>
      </div>
      <div className='p-col-12 p-field p-md-6 p-mb-4'>
        <span className='p-float-label'>
          <Dropdown
            value={formik.values.subCategory}
            name='subCategory'
            inputId='subCategory'
            options={subCategories[formik.values.category]}
            onChange={formik.handleChange}
            optionLabel='label'
            // placeholder="Select a Sub-Category"
          />
          <label htmlFor='subCategory'>Sub-Category</label>
        </span>
      </div>
      <SubCategoryForm
        formData={
          props.subCategoriesForm?.[formik.values.category]?.[
            formik.values.subCategory
          ]
        }
        onChange={formik.handleChange}
        values={formik.values}
      />
      <Photos {...props} />
      <div className='p-col-12 p-md-4 p-lg-4'>
        <Button label='Submit' type='submit' />
      </div>
    </form>
  );
};

export default NewAddForm;
