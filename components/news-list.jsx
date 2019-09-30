import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import Card from "./card";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchArticleDetails, incrementPageIndex } from "../store";
import Head from "next/head";

const mapStateToProps = state => {
  return {
    pageIndex: state.pageIndex,
    newsList: state.newsList,
    searchResult: state.searchResult,
    searchKeyword: state.searchKeyword
  };
};

class NewsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.fetchData = this.fetchData.bind(this);
    this.searchResult = this.searchResult.bind(this);
  }

  fetchData = () => {
    let addPageIndex = this.props.pageIndex + 1;
    // update pageIndex and call fetchArticleDetails
    this.props.incrementPageIndex();
    this.props.fetchArticleDetails(addPageIndex);
  };

  searchResult() {
    if (this.props.searchResult.length === 0) {
      return (
        <p className="search-loading">
          Searching result for "{this.props.searchKeyword}"
        </p>
      );
    } else {
      return this.props.searchResult.map((news, index) => (
        <Card key={index} news={news}></Card>
      ));
    }
  }

  render() {
    return (
      <div className="news-container">
        <Head>
          <title>US News</title>
          <link
            rel="shortcut icon"
            type="image/x-icon"
            href="/static/favicon.ico"
          />
          <link rel="manifest" href="/static/manifest.json" />
        </Head>
        {this.props.searchKeyword !== "" ? (
          this.searchResult()
        ) : (
          <InfiniteScroll
            dataLength={this.props.newsList.length}
            next={() => {
              this.fetchData();
            }}
            hasMore={this.props.newsList.length < 99}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {this.props.newsList.map((news, index) => (
              <Card key={index} news={news}></Card>
            ))}
          </InfiniteScroll>
        )}
      </div>
    );
  }
}
const mapDispatchToProps = { fetchArticleDetails, incrementPageIndex };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsList);
