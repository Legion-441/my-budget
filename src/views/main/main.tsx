import { Container } from '@mui/material'
import { Outlet } from 'react-router-dom'
import AppHeader from '../../components/app-header/app-header'
import { PageContainer } from '../../styled/page-container/page-container.styled'

const MainView: React.FC = () => {
    return <>
        <AppHeader />
        <Container>
            <PageContainer>
                <Outlet />
            </PageContainer>
        </Container>

    </>
}

export default MainView