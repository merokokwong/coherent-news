import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { searchKeywordChange, searchArticle } from "../store";

const mapStateToProps = state => {
  return {
    searchKeyword: state.searchKeyword
  };
};

class SearchHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.searchArticlebyKeyword = this.searchArticlebyKeyword.bind(this);
  }

  searchArticlebyKeyword(e) {
    this.props.searchKeywordChange(e.target.value);
    this.props.searchArticle(e.target.value);
  }

  render() {
    return (
      <div className="search-header">
        <h2>US News</h2>
        <span className="search-input">
          <FontAwesomeIcon icon="search" size="xs" />
          <input
            type="text"
            placeholder="Search"
            value={this.props.searchKeyword}
            onChange={e => this.searchArticlebyKeyword(e)}
          />
        </span>
      </div>
    );
  }
}
const mapDispatchToProps = { searchKeywordChange, searchArticle };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchHeader);
