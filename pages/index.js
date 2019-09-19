import React from "react";
import { connect } from "react-redux";
import { startClock, serverRenderClock, fetchArticleDetails } from "../store";
import Examples from "../components/examples";
import NewsList from "../components/news-list";
import "../styles.scss";

class Index extends React.Component {
  static getInitialProps({ reduxStore, req }) {
    const isServer = !!req;

    // DISPATCH ACTIONS HERE ONLY WITH `reduxStore.dispatch`
    reduxStore.dispatch(serverRenderClock(isServer));
    return {};
  }

  componentDidMount() {
    // DISPATCH ACTIONS HERE FROM `mapDispatchToProps`
    // TO TICK THE CLOCK
    this.timer = setInterval(() => this.props.startClock(), 1000);
    this.props.fetchArticleDetails();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <div>
        <NewsList />
      </div>
    );
  }
}
const mapDispatchToProps = { startClock, fetchArticleDetails };
export default connect(
  null,
  mapDispatchToProps
)(Index);
