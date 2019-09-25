import React from "react";
import { connect } from "react-redux";
import { fetchArticleDetails } from "../store";
import NewsList from "../components/news-list";
import SearchHeader from "../components/search-header";
import "../styles.scss";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEnvelope, faKey, faSearch } from "@fortawesome/free-solid-svg-icons";
library.add(faEnvelope, faKey, faSearch);

const mapStateToProps = state => {
  return {
    pageIndex: state.pageIndex
  };
};

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // DISPATCH ACTIONS HERE FROM `mapDispatchToProps`
    // TO TICK THE CLOCK
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
const mapDispatchToProps = { fetchArticleDetails };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);
