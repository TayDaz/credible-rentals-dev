import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";

import {
  DROP_DOWN,
  INPUT_TEXT,
  DATE,
  CALENDAR,
  GROUP__INPUT_TEXT__DROP_DOWN,
  GROUP__INPUT_NUMBER__DROP_DOWN,
  GROUP__INPUT_NUMBER__DROP_DOWN__DROP_DOWN,
} from "../../../../constants";

const GetField = (props) => {
  const { data } = props;
  const { fieldType } = data;
  console.log("[uploads-page/sub-category-form/.js] GetField props", props);

  const monthNavigatorTemplate = (e) => {
    return (
      <Dropdown
        value={e.value}
        options={e.options}
        onChange={(event) => e.onChange(event.originalEvent, event.value)}
        style={{ lineHeight: 1 }}
      />
    );
  };

  const yearNavigatorTemplate = (e) => {
    return (
      <Dropdown
        value={e.value}
        options={e.options}
        onChange={(event) => e.onChange(event.originalEvent, event.value)}
        className='p-ml-2'
        style={{ lineHeight: 1 }}
      />
    );
  };

  switch (fieldType) {
    case INPUT_TEXT:
      return (
        <div
          className={`p-col-${data.colSm} p-mb-5 p-md-${data.colMd} p-lg-${data.colLg}`}>
          <span className='p-float-label'>
            <InputText
              name={data.name}
              value={props.values[data.name]}
              onChange={props.onChange}
              // placeholder={data.placeholder}
              inputId={data.name}
            />
            <label htmlFor={data.name}>{data.floatLabel}</label>
          </span>
        </div>
      );
    case DROP_DOWN:
      return (
        <div
          className={`p-col-${data.colSm} p-mb-5 p-md-${data.colMd} p-lg-${data.colLg}`}>
          <span className='p-float-label'>
            <Dropdown
              name={data.name}
              value={props.values[data.name]}
              onChange={props.onChange}
              // placeholder={data.placeholder}
              options={data.options}
              optionLabel='label'
              inputId={data.name}
            />
            <label htmlFor={data.name}>{data.floatLabel}</label>
          </span>
        </div>
      );

    case CALENDAR:
      return (
        <div
          className={`p-col-${data.colSm} p-mb-5 p-md-${data.colMd} p-lg-${data.colLg}`}>
          <span className='p-float-label'>
            <Calendar
              name={data.name}
              value={props.values[data.name]}
              onChange={props.onChange}
              // placeholder={data.placeholder}
              monthNavigator
              yearNavigator
              yearRange='1950:2021'
              monthNavigatorTemplate={monthNavigatorTemplate}
              yearNavigatorTemplate={yearNavigatorTemplate}
              inputId={data.name}
              showIcon
            />
            <label htmlFor={data.name}>{data.floatLabel}</label>
          </span>
        </div>
      );

    case GROUP__INPUT_TEXT__DROP_DOWN:
      return (
        <div
          className={`p-col-${data.colSm} p-mb-5 p-md-${data.colMd} p-lg-${data.colLg}`}>
          <div className='p-inputgroup'>
            <span className='p-float-label'>
              <InputText
                name={data.nameInputText}
                inputId={data.nameInputText}
                value={props.values[data.nameInputText]}
                // placeholder={data.placeholderInputText}
                onChange={props.onChange}
              />
              <label htmlFor={data.nameInputText}>
                {data.floatLabelInputText}
              </label>
            </span>
            <span className='p-float-label'>
              <Dropdown
                name={data.nameDropDown}
                inputId={data.nameDropDown}
                value={props.values[data.nameDropDown]}
                onChange={props.onChange}
                // placeholder={data.placeholderDropDown}
                options={data.options}
                optionLabel='label'
              />
              <label htmlFor={data.nameDropDown}>
                {data.floatLabelDropDown}
              </label>
            </span>
          </div>
        </div>
      );
    case GROUP__INPUT_NUMBER__DROP_DOWN:
      return (
        <div
          className={`p-col-${data.colSm} p-mb-5 p-md-${data.colMd} p-lg-${data.colLg}`}>
          <div className='p-inputgroup'>
            <span className='p-float-label'>
              <InputText
                name={data.nameInputNumber}
                inputId={data.nameInputNumber}
                value={props.values[data.nameInputNumber]}
                // placeholder={data.placeholderInputNumber}
                onChange={props.onChange}
              />
              <label htmlFor={data.nameInputNumber}>
                {data.floatLabelInputNumber}
              </label>
            </span>
            <span className='p-float-label'>
              <Dropdown
                name={data.nameDropDown}
                inputId={data.nameDropDown}
                value={props.values[data.nameDropDown]}
                onChange={props.onChange}
                // placeholder={data.placeholderDropDown}
                options={data.options}
                optionLabel='label'
              />
              <label htmlFor={data.nameDropDown}>
                {data.floatLabelDropDown}
              </label>
            </span>
          </div>
        </div>
      );

    case GROUP__INPUT_NUMBER__DROP_DOWN__DROP_DOWN:
      return (
        <div
          className={`p-col-${data.colSm} p-mb-5 p-md-${data.colMd} p-lg-${data.colLg}`}>
          <div className='p-inputgroup'>
            <span className='p-float-label'>
              <InputText
                name={data.nameInputNumber}
                inputId={data.nameInputNumber}
                value={props.values[data.nameInputNumber]}
                // placeholder={data.placeholderInputNumber}
                onChange={props.onChange}
              />
              <label htmlFor={data.nameInputNumber}>
                {data.floatLabelInputNumber}
              </label>
            </span>
            <span className='p-float-label'>
              <Dropdown
                name={data.nameDropDown1}
                inputId={data.nameDropDown1}
                value={props.values[data.nameDropDown1]}
                onChange={props.onChange}
                // placeholder={data.placeholderDropDown1}
                options={data.options1}
                optionLabel='label'
              />
              <label htmlFor={data.nameDropDown1}>
                {data.floatLabelDropDown1}
              </label>
            </span>
            <span className='p-float-label'>
              <Dropdown
                name={data.nameDropDown2}
                inputId={data.nameDropDown2}
                value={props.values[data.nameDropDown2]}
                onChange={props.onChange}
                // placeholder={data.placeholderDropDown2}
                options={data.options2}
                optionLabel='label'
              />
              <label htmlFor={data.nameDropDown2}>
                {data.floatLabelDropDown2}
              </label>
            </span>
          </div>
        </div>
      );
  }
};

const SubCategoryForm = (props) => {
  // const fields = JSON.stringify(props.formData);
  console.log("SubCategoryForm", props);
  if (!props.formData) {
    return null;
  } else {
    return (
      <>
        {props.formData.map((field, indx) => (
          <GetField
            key={field.name}
            values={props.values}
            onChange={props.onChange}
            data={field}
          />
        ))}
      </>
    );
  }
};

export default SubCategoryForm;
