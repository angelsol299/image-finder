import React, { Component } from "react";
import PropTypes from "prop-types";
import { GridList, GridTile } from "material-ui/GridList";
import IconButton from "material-ui/IconButton";
import ZoomIn from "material-ui/svg-icons/action/zoom-in";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";

class ImageResults extends Component {
  state = {
    open: false,
    currentImg: ""
  };

  handleOpen = img => {
    this.setState({ open: true, currentImg: img });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    let imageListContent;
    const { images } = this.props;
    if (images) {
      imageListContent = (
        <GridList cols={3} data-test="grid-list">
          {images.map(img => (
            <GridTile
              data-test="grid-tile"
              title={img.tags}
              key={img.id}
              subtitle={
                <span data-test="span">
                  by <strong>{img.user}</strong>
                </span>
              }
              actionIcon={
                <IconButton
                  onClick={() => this.handleOpen(img.largeImageURL)}
                  data-test="icon-button"
                >
                  <ZoomIn color="white" data-test="zoom-in" />
                </IconButton>
              }
            >
              <img src={img.largeImageURL} alt="" data-test="img"/>
            </GridTile>
          ))}
        </GridList>
      );
    } else {
      imageListContent = null;
    }

    const actions = [
      <FlatButton data-test="flat-button" label="Closed" primary={true} onClick={this.handleClose} />
    ];

    return (
      <div>
        {imageListContent}
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          data-test="dialog"
        >
          <img
            src={this.state.currentImg}
            alt=""
            style={{ width: "100%" }}
            data-test="image"
          />
        </Dialog>
      </div>
    );
  }
}

ImageResults.propTypes = {
  images: PropTypes.array.isRequired
};

export default ImageResults;
