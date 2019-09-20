import React from "react";
import { connect } from "react-redux";
import { startClock, serverRenderClock, fetchArticleDetails } from "../store";
import Examples from "../components/examples";
import NewsList from "../components/news-list";
import SearchHeader from "../components/search-header";
import "../styles.scss";

const mapStateToProps = state => {
  return {
    pageIndex: state.pageIndex
  };
};

class Index extends React.Component {
  static getInitialProps({ reduxStore, req }) {
    const isServer = !!req;

    // DISPATCH ACTIONS HERE ONLY WITH `reduxStore.dispatch`
    reduxStore.dispatch(serverRenderClock(isServer));
    return {};
  }
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // DISPATCH ACTIONS HERE FROM `mapDispatchToProps`
    // TO TICK THE CLOCK
    this.timer = setInterval(() => this.props.startClock(), 1000);
    this.props.fetchArticleDetails(this.props.pageIndex);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
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
const mapDispatchToProps = { startClock, fetchArticleDetails };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);
