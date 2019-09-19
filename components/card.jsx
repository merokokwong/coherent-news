import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import moment from "moment";

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.formatPublishDate = this.formatPublishDate.bind(this);
  }

  formatPublishDate(d) {
    return moment(d).format("YYYY-MM-DD kk:mm");
  }

  render() {
    return (
      <div className="card">
        <div className="card-header">
          <div data-letters={this.props.news.source.name.charAt(0)}></div>
          <div>
            <div className="source">{this.props.news.source.name}</div>
            <div className="publish-date">
              {this.formatPublishDate(this.props.news.publishedAt)}
            </div>
          </div>
        </div>

        <div className="card-body">
          <img src={this.props.news.urlToImage} alt={this.props.news.title} />
          <div className="card-body-text">
            <h2>{this.props.news.title}</h2>
            <p className="body-description">{this.props.news.description}</p>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(
  null,
  null
)(Card);
