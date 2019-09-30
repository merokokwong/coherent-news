import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import moment from "moment";
import Head from "next/head";
import Image from "./image";

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
        <Head>
          <meta property="og:title" content={this.props.news.title} />
          <meta
            property="og:description"
            content={this.props.news.description}
          />
          <meta property="og:type" content="article" />
          <meta property="og:image" content={this.props.news.urlToImage} />
        </Head>
        <a
          href={this.props.news.url}
          target="_blank"
          title={this.props.news.title}
        >
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
            {this.props.news.urlToImage !== "" &&
            this.props.news.urlToImage !== null ? (
              <Image
                src={this.props.news.urlToImage}
                alt={this.props.news.title}
              />
            ) : (
              <span className="img-not-found"></span>
            )}
            <div className="card-body-text">
              <h2>{this.props.news.title}</h2>
              <p className="body-description">{this.props.news.description}</p>
            </div>
          </div>
        </a>
      </div>
    );
  }
}
export default connect(
  null,
  null
)(Card);
