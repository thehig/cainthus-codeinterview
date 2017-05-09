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
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="search">search</label>
          <Field name="search" component="input" type="search"/>
        </div>
        <button type="submit">Search</button>
      </form>
    );
  };
};

// Decorate the form component
SearchForm = reduxForm({
  form: 'flickrSearch' // a unique name for this form
})(SearchForm);

export default SearchForm;
