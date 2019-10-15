import { connect } from "react-redux";
import NavBar from "@cectf/components/navBar/NavBar";
import { State, NavPage } from "@cectf/types";
import { setNavPage } from "@cectf/state";

const mapStateToProps = (state: State) => {
    var navPages: NavPage[] = [NavPage.ABOUT];
    if (state.user) {
        for (var i in state.user.roles) {
            if (state.user.roles[i].name === "contestant") {
                if (!(NavPage.CTF in navPages)) {
                    navPages.push(NavPage.CTF);
                }
            }
            if (state.user.roles[i].name === "admin") {
                if (!(NavPage.ADMIN in navPages)) {
                    navPages.push(NavPage.ADMIN);
                }
            }
        }
    }
    return { navPages: navPages, navPage: state.navPage };
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        switchTo: (navPage: NavPage) => {
            return () => { dispatch(setNavPage(navPage)); };
        }
    };
}


const NavBarContainer = connect(mapStateToProps, mapDispatchToProps)(NavBar);
export default NavBarContainer;