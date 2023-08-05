import React from 'react';
import DashboardLayout from 'layouts/dashboard/layout';
import { CssBaseline } from '@mui/material';
import ProvedorSelect from 'contexts/ProvedorSelects';
import MainUsuarios from 'main/MainUsuarios';

export default function PageUsusarios() {
    return (
        <React.Fragment>
            <ProvedorSelect>
                <DashboardLayout>
                    <CssBaseline>
                        <MainUsuarios />
                    </CssBaseline>
                </DashboardLayout>
            </ProvedorSelect>
        </React.Fragment>
    )
}