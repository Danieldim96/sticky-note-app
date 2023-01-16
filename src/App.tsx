import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "./actions";
import { StickyNotes } from "./views";

function App(props: any) {
  return <StickyNotes {...props} />;
}

export default connect(
  (state) => state,
  (dispatch) => ({
    actions: bindActionCreators({ ...actions }, dispatch),
  })
)(App);
