import { connect } from "react-redux";
import AppContent from "@cectf/components/AppContent";
import { State, NavPage } from "@cectf/types";

const mapStateToProps = (state: State) => {
    return { navPage: state.navPage };
}


const AppContentContainer = connect(mapStateToProps)(AppContent);
export default AppContentContainer;