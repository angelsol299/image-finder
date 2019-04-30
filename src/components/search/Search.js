import React, { Component } from "react";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import { MenuItem } from "material-ui";
import axios from "axios";
import ImageResults from "../image-results/imageResults";

class Search extends Component {
  state = {
    searchText: "",
    amount: 15,
    apiUrl: "https://pixabay.com/api",
    apiKey: "8761127-15c354fd40a23de8d36bfe25d",
    images: []
  };

  onTextChange = e => {
    const val = e.target.value;
    const invokingAxio = () => {
      axios
        .get(
          `${this.state.apiUrl}/?key=${this.state.apiKey}&q=${
            this.state.searchText
          }&image_type=photo&per_page=${this.state.amount}&safesearch=true`
        )
        .then(res => this.setState({ images: res.data.hits }))
        .catch(err => console.log(err));
    };
    this.setState(
      {
        [e.target.name]: val
      },
      () => {
        if (val === "") {
          this.setState({ images: [] });
        } else {
          invokingAxio();
        }
      }
    );
  };

  onAmountChange = (e, index, value) => this.setState({ amount: value });

  render() {
    console.log(this.state.images);
    return (
      <div>
        <TextField
          name="searchText"
          value={this.state.searchText}
          onChange={this.onTextChange}
          floatingLabelText="Search for images"
          fullWidth={true}
          data-test="text-field"
        />
        <SelectField
          name="amount"
          floatingLabelText="Amount"
          value={this.state.amount}
          onChange={this.onAmountChange}
          data-test="select-field"
        >
          <MenuItem value={5} primaryText="5" data-test="menu-item" />
          <MenuItem value={10} primaryText="10" data-test="menu-item" />
          <MenuItem value={15} primaryText="15" data-test="menu-item" />
          <MenuItem value={30} primaryText="30" data-test="menu-item" />
          <MenuItem value={30} primaryText="50" data-test="menu-item" />
        </SelectField>
        <br />
        {this.state.images.length > 0 ? (
          <ImageResults images={this.state.images} data-test="image-results" />
        ) : null}
      </div>
    );
  }
}

export default Search;
