import React, { createContext, useState } from "react"

export const Context = createContext()

function AppContext({children}) {
    const [sideBarOpen, setSideBarOpen] = useState(false)
    const [modalCampaignOpen, setModalCampaignOpen] = useState(false)
    const [menu, setMenu] = useState({
        breakfast : {breakfast1 : ["dish1", "dish2"], breakfast2 : ["dish3", "dish4"]},
        launch : {launch1 : ["dish5", "dish6"], launch2 : ["dish7", "dish8"]},
        dinner : {dinner1 : ["dish9", "dish10"], dinner2 : ["dish11", "dish12"]},
    })
    const [dishes, setDishes] = useState(null)

    const [registration, setRegistration] = useState(null);

    return (
        <Context.Provider value={{
            sideBarOpen, setSideBarOpen, menu, setMenu, dishes, setDishes,
            modalCampaignOpen, setModalCampaignOpen, registration, setRegistration
        }}>
            {children}
        </Context.Provider>
    )
}

export default AppContext;