import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';



class Signup extends Component {

  renderField(field){
    const {meta:{touched,error}}= field;
    const className=`form-group ${touched&&error? 'has-danger':''}`
    return (
      <div className={className}>
        <input {...field.input} type={field.type} className="form-control" />
        <div className="text-help">
          {touched ? error: ''}
        </div>
      </div>
    )
  }

  handleFormSubmit({email, password}){
    this.props.signupUser({email, password})
  }

  renderAlert(){
    if (this.props.errorMessage){
      return (
        <div className="alert alert-danger">
          <strong>Oops! </strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render(){
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Email:</label>
          <Field name="email" component={this.renderField} type="text" />
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <Field name="password" component={this.renderField} type="password" />
        </fieldset>
        <fieldset className="form-group">
          <label>Confirm Password:</label>
          <Field name="confirmPassword" component={this.renderField} type="password" />
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign in</button>
      </form>
    );
  }
}

function validate(values){
  const errors={};

  if(!values.email){
    errors.email = "please enter an email";
  }

  if(!values.password){
    errors.password= "please enter a password";
  }

  if(!values.confirmPassword){
    errors.confirmPassword="Please enter a password confirmation"
  }

  if(values.password !== values.confirmPassword){
    errors.password="Password must match";
  }
  //errors is empty, the form is fine to submit
  //if errors has any properties, redux form assumes form is invalid
  return errors;
}

function mapStateToProps(state){
  return { errorMessage: state.auth.error}
}

export default reduxForm({
  validate,
  form: 'signup'
})(
  connect(mapStateToProps, actions)(Signup)
);
