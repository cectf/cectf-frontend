import { connect } from "react-redux";
import AppContent from "components/AppContent";
import { State, NavPage } from "types";

const mapStateToProps = (state: State) => {
    return { navPage: state.navPage };
}


const AppContentContainer = connect(mapStateToProps)(AppContent);
export default AppContentContainer;