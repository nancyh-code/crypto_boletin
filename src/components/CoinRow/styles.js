import { styled } from '@material-ui/core/styles'
import { TableCell } from '@material-ui/core/';


export const CryptoImageCell = styled(TableCell)({
  '& img': {
    height: '25px'
  }
})

export const CryptoDeleteCell = styled(TableCell)({
  position: 'relative',
  '& .delete-crypto': {
    position: 'absolute',
    right: '20%',
    top: '20%',
    display: 'none',
    color: "#adabad",
    cursor: "pointer"
  },
  '& div': {
    display: 'flex'
  }
})