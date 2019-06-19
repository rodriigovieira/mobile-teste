import { createAppContainer, createSwitchNavigator } from "react-navigation"

import LoginPage from "~/pages/LoginPage"
import SignUpPage from "~/pages/SignUpPage"
import HomePage from "~/pages/HomePage"

const Routes = createAppContainer(createSwitchNavigator({ LoginPage, SignUpPage, HomePage }))

export default Routes
