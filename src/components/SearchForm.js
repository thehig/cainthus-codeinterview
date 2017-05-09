import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';


class SearchForm extends PureComponent {
  static propTypes = {
    pending: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  };

  render(){
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit} className="form-group">
        <div>
          <label htmlFor="search">Search:</label>
          <Field name="search" component="input" type="search" className="form-control"/>
        </div>
        <button type="submit" className="form-control">Search</button>
      </form>
    );
  };
};

// Decorate the form component
SearchForm = reduxForm({
  form: 'flickrSearch' // a unique name for this form
})(SearchForm);

export default SearchForm;
