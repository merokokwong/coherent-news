import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import Card from "./card";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchArticleDetails, incrementPageIndex } from "../store";

const mapStateToProps = state => {
  return {
    pageIndex: state.pageIndex,
    newsList: state.newsList
  };
};

class NewsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.fetchData = this.fetchData.bind(this);
  }

  fetchData = () => {
    let addPageIndex = this.props.pageIndex + 1;
    // update pageIndex and call fetchArticleDetails
    this.props.incrementPageIndex();
    this.props.fetchArticleDetails(addPageIndex);
  };

  render() {
    return (
      <div className="news-container">
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
      </div>
    );
  }
}
const mapDispatchToProps = { fetchArticleDetails, incrementPageIndex };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsList);
