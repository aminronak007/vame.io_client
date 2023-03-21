import React, { useState } from "react";
import AccountForm from "../Components/Accountsetting/AccountForm";

function FreelancerAccountSetting() {
    let [loading, setLoading] = useState(true);

    const override = {
        display: "block",
        margin: " 0 auto",
        borderColor: "#339aff",
        marginTop: "20%",
    };

    return (
        <AccountForm
            loading={loading}
            setLoading={setLoading}
            override={override}
        />
    );
}
export default FreelancerAccountSetting;
