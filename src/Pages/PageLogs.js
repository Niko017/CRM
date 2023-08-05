import React from 'react';
import DashboardLayout from 'layouts/dashboard/layout';
import { CssBaseline } from '@mui/material';
import ProvedorSelect from 'contexts/ProvedorSelects';
import MainUsuarios from 'main/MainUsuarios';
import MainLogs from 'main/MainLogs';

export default function PageLogs() {
    return (
        <React.Fragment>
            <ProvedorSelect>
                <DashboardLayout>
                    <CssBaseline>
                        <MainLogs />
                    </CssBaseline>
                </DashboardLayout>
            </ProvedorSelect>
        </React.Fragment>
    )
}