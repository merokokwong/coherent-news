import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { searchKeyword } from "../store";

class SearchHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.searchArticlebyKeyword = this.searchArticlebyKeyword.bind(this);
  }

  searchArticlebyKeyword(e) {
    let keyWord = e.target.value;
    this.props.searchKeyword(keyWord);
  }

  render() {
    return (
      <div className="search-header">
        <h2>US News</h2>

        <input
          type="text"
          placeholder="Search"
          onChange={e => {
            this.searchArticlebyKeyword(e);
          }}
        />
      </div>
    );
  }
}
const mapDispatchToProps = { searchKeyword };
export default connect(
  null,
  mapDispatchToProps
)(SearchHeader);
