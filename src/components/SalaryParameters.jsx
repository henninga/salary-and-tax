import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { inputHasChanged } from '../actions';
import { Button, Checkbox, FormGroup, Grid, InputWithLabel, Section } from './Ui';


export const SalaryParametersComponent = ({handleSubmit, submitForm, submitting}) => (
  <Section header="Input">
    <form onSubmit={handleSubmit(submitForm)} onChange={submitForm}>
      <FormGroup header="Income">
        <InputWithLabel name="hoursPerYear" label="Hours per year" />
        <InputWithLabel name="hourRate" label="Hour rate" />
      </FormGroup>

      <FormGroup header="Subcontractor">
        <InputWithLabel name="cut" label="Cut (%)" />
      </FormGroup>

      <FormGroup header="Employer Fee">
        <Checkbox
          name="includeEmployerFee"
          label="Include in calculation"
        />
        <InputWithLabel name="employerFeeRate" label="(%)" />
      </FormGroup>

      <FormGroup header="Vacation savings">
        <Checkbox name="includeVacationSavings" label="Include in calculation" />
        <InputWithLabel name="vacationSavingsRate" label="(%)" />
      </FormGroup>

      <FormGroup header="Pension">
        <Checkbox name="includePension" label="Include in calculation" />
        <InputWithLabel name="pensionOneToSixRate" label="Percentage (1G-6G)" />
        <InputWithLabel name="pensionSixToTwelveRate" label="Percentage (6G-12G)" />
      </FormGroup>
      <Grid value={6}>
        <Button type="submit" disabled={submitting}>Calculate earnings</Button>
      </Grid>
    </form>
  </Section>);

SalaryParametersComponent.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export const SalaryParametersForm = reduxForm({form: 'calculations'})(SalaryParametersComponent);

const mapStateToProps = ({calculations: {data}}) => ({
  initialValues: data,

});

const mapDispatchToProps = (dispatch) => ({
  submitForm: (values) => dispatch(inputHasChanged(values)),
});


export const SalaryParameters = connect(mapStateToProps, mapDispatchToProps)(SalaryParametersForm);
export default SalaryParameters;
