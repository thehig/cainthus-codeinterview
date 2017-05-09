import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';


class FlickrTile extends PureComponent {
  static propTypes = {
    photo: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render(){
    // the tags, 
    // the owner and the 
    // date it was taken.

    const { photo } = this.props;
    console.log("photo", photo.toJS());

    const url = photo.get('url');
    const title = photo.get('title');
    const id = photo.get('id');
    const owner = photo.get('owner')
    const link = `https://www.flickr.com/photos/${owner}/${id}`;
    
    return (
      <div className="thumbnail">
          <img className="fixed-height-search-result" src={url} alt={title} />
          <div className="caption">
            <a href={link}>
              { title }
            </a>
          </div>
      </div>
    );
  };
}

export default FlickrTile;
