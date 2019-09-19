import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import Card from "./card";

const mapStateToProps = state => {
  return {
    newsList: state.newsList
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

class NewsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="news-container">
        {this.props.newsList ? (
          this.props.newsList.map(news => (
            <Card key={news.url} news={news}></Card>
          ))
        ) : (
          <div className="noNewsText">Empty</div>
        )}
      </div>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsList);
