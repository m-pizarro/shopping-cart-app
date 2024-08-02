import Typography from '@mui/material/Typography'
import { type SxProps, type Theme } from '@mui/material/styles'

interface Props {
  children: React.ReactNode
  sx?: SxProps<Theme>
}

const PageTitle = ({ children, sx = {} }: Props) => (
  <Typography variant="h2" sx={{ mb: 4, ...sx }}>
    {children}
  </Typography>
)

export default PageTitle
