import React, { useState } from "react";
import Form from "../Components/Form/Form";

const EditProfile = () => {
    let [loading, setLoading] = useState(true);

    const override = {
        display: "block",
        margin: " 0 auto",
        borderColor: "#339aff",
        marginTop: "20%",
    };
    return (
        <Form loading={loading} setLoading={setLoading} override={override} />
    );
};

export default EditProfile;
