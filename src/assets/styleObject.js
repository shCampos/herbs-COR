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
  '@global': {
    '*::-webkit-scrollbar': {
      width: '0.4em',
      height: '0.5em'
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
    }
  },
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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  siteTitle: {
    color: theme.palette.text,
    fontFamily: 'David Libre'
  },
  siteDescription: {
    backgroundColor: '#3eb827',
    color: '#fff',
    paddingLeft: '2px',
    paddingRight: '2px',
    marginBottom: '15px',
    textAlign: 'center'
  },
  specieCounter: {
    marginBottom: '15px',
  },
  acordionHeader: {
    backgroundColor: theme.palette.text.secondary,
    color: '#fff'
  },
  acordionBody: {
    overflow: 'auto'
  },
  formControl: {
    width: '100%',
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
  avatar: {
    backgroundColor: '#3eb827'
  },
  listItemResult: {
    width: '100%'
  },
  tableDashboard: {
    width: '100%',
    maxHeight: 440,
  },
  link: {
    color: '#3975B8',
    textDecoration: 'none',
    fontWeight: 'bold'
  },
  list: {
    width: '100%',
    paddingTop: 0,
    backgroundColor: theme.palette.background.paper,
  },
  listItem: {
    padding: 0
  },
  descriptionsArrow: {
    color: theme.palette.text.secondary,
    '&:hover': {
      color: theme.palette.primary.main
    },
  },
  collapse: {
    paddingTop: '10px',
    paddingBottom: '10px'
  },
  filterCard: {
    marginBottom: '20px',
    backgroundColor: theme.palette.background.default,
  },
  filterIcon: {
    fontSize: 40,
    color: theme.palette.text.secondary
  }
}))