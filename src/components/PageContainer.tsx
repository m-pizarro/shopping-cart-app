import Container from '@mui/material/Container'
import { styled } from '@mui/material/styles'

const PageContainer = styled(Container, {
  shouldForwardProp: prop => prop !== 'align'
})<{ align?: 'left' | 'center' | 'right' }>(({ theme, align = 'center' }) => ({
  marginLeft: align === 'left' ? 0 : 'auto',
  marginRight: align === 'right' ? 0 : 'auto',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(3)
  }
}))

export default PageContainer
