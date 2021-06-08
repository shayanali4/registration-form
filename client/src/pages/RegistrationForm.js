import React, { useContext } from 'react'
import FormWizard from '../components/Forms/FormWizard'
import { Context } from "../context/AppContext"

function RegistrationForm() {
    const {menu} = useContext(Context);
    console.log("context==>", menu)
    return (
        <div>
            <FormWizard />
        </div>
    )
}

export default RegistrationForm
