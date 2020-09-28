import { makeStyles } from '@material-ui/core/styles'

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

const { height, width } = getWindowDimensions()

export const styleObject = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: width,
    minWidth: width,
    maxWidth: width,
    minHeight: height-48,
    paddingLeft: '10px',
    paddingRight: '10px',
    backgroundColor: theme.palette.background
  },
  siteTitle: {
    color: theme.palette.text
  },
  siteDescription: {
    backgroundColor: '#3eb827',
    color: '#fff',
    paddingLeft: '2px',
    paddingRight: '2px',
    marginBottom: '15px',
    textAlign: 'center'
  },
  acordionHeader: {
    backgroundColor: theme.palette.text.secondary,
    color: '#fff'
  },
  input: {
    marginTop: '10px',
    marginBottom: '10px',
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  btn: {
    fontWeight: 'bold',
    color: '#fff',  
  },
  porcentagem: {
    backgroundColor: '#3eb827'
  },
  listItemResult: {
    width: '100%'
  }
}))