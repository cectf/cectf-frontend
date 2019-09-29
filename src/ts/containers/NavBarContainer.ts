import { connect } from "react-redux";
import NavBar from "components/NavBar";
import { Role, NavPage, User } from "types";

/*
getNavPages(): NavPage[] {
    var roles = this.state.roles;
    var navPages: NavPage[] = [NavPage.ABOUT];
    for (var i in roles) {
        if (roles[i].name === "contestant") {
            if (!(NavPage.CTF in navPages)) {
                navPages.push(NavPage.CTF);
            }
        }
        if (roles[i].name === "admin") {
            if (!(NavPage.ADMIN in navPages)) {
                navPages.push(NavPage.ADMIN);
            }
        }
    }
    return navPages;
}
*/

const mapStateToProps = (state: any, ownProps: any): NavPage[] => {
    if (state.user) {
        return state.user.roles.map((role: Role) => {
            challenges: state.challenges
        });
    } else {
        return [];
    }
}
/* 
const mapDispatchToProps = (dispatch: any, ownProps: any) => {
    return {
        onClick: () => {
            dispatch(ownProps.filter)
        }
    };
}
*/

const NavBarContainer = connect(
    mapStateToProps)
    //mapDispatchToProps)
    (NavBar);
export default NavBarContainer;