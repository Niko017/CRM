import DashboardLayout from 'layouts/dashboard/layout';
import ProvedorSelect from 'contexts/ProvedorSelects';

import { CssBaseline } from '@mui/material';
import React from 'react'
import MainEmailPerso from 'main/MainEmailPerso';

function PageEmailPerso() {
    return (
        <React.Fragment>
            <ProvedorSelect>
                <DashboardLayout>
                    <CssBaseline>
                        <MainEmailPerso />
                    </CssBaseline>
                </DashboardLayout>
            </ProvedorSelect>
        </React.Fragment>
    )
} export default PageEmailPerso;