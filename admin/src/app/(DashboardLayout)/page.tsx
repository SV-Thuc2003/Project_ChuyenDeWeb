'use client'
import { Grid, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
// components
import SalesOverview from '@/app/(DashboardLayout)/components/dashboard/TheSalesOverview';
import TopSellingProducts from '@/app/(DashboardLayout)/components/dashboard/TopSellingProducts';
import DashboardSummary from '@/app/(DashboardLayout)/components/dashboard/DashboardSummary';


const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box mt={3}>
        <Grid container spacing={3}>

          <Grid item xs={12} lg={12}>
            <DashboardSummary />
          </Grid>
          <Grid item xs={12} lg={8}>
            <SalesOverview />
          </Grid>
          <Grid item xs={12} lg={4}>
            <TopSellingProducts />
          </Grid>


        </Grid>
      </Box>
    </PageContainer>
  )
}

export default Dashboard;
