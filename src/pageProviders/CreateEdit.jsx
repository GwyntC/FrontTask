import PageAccessValidator from "../components/PageAccessValidator";
import PageContainer from "../components/PageContainer";
import CreateEditPage from "../pages/CreateEdit";
import React from "react";

const CreateEdit = ()=>(
    <PageAccessValidator>
        <PageContainer>
            <CreateEditPage />
        </PageContainer>
    </PageAccessValidator>
);

export default CreateEdit;

