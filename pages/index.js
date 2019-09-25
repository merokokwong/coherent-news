import React from "react";
import { connect } from "react-redux";
import { fetchArticleDetails } from "../store";
import NewsList from "../components/news-list";
import SearchHeader from "../components/search-header";
import "../styles.scss";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
library.add(faSearch);

const mapStateToProps = state => {
  return {
    pageIndex: state.pageIndex
  };
};

class Index extends React.Component {
  static async getInitialProps({ reduxStore, req }) {
    await reduxStore.dispatch(fetchArticleDetails(1));
    const newsList = reduxStore.getState().newsList;

    return { newsList };
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // DISPATCH ACTIONS HERE FROM `mapDispatchToProps`
    // client side renndering not need, using getInitialProps to get data
    // this.props.fetchArticleDetails(this.props.pageIndex);
  }

  render() {
    return (
      <div>
        <SearchHeader />
        <NewsList />
      </div>
    );
  }
}
const mapDispatchToProps = { fetchArticleDetails };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);
