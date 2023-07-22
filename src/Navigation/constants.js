import TableViewIcon from '@mui/icons-material/TableView';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';

export const USER_PAGES = [
  // Disabled temporarily till Home Page and Dashboard Page is completed
  // { pageName: 'Home', pageLink: '', Icon: HomeIcon },
  // { pageName: 'Dashboard', pageLink: 'dashboard', Icon: DashboardIcon },
  {
    pageName: 'Earnings Logbook',
    pageLink: 'earnings-logbook',
    Icon: RequestQuoteIcon,
  },
  {
    pageName: 'Fuel Logbook',
    pageLink: 'fuel-logbook',
    Icon: LocalGasStationIcon,
  },
  { pageName: 'Submit', pageLink: 'submit', Icon: ReceiptLongIcon },
  { pageName: 'Account', pageLink: 'account', Icon: AccountBoxIcon },
];

export const GENERAL_PAGES = [
  { pageName: 'Home', pageLink: '', Icon: TableViewIcon },
  // Disabled temporarily till About Page is completed
  // { pageName: 'About', pageLink: 'about' },
  { pageName: 'Login', pageLink: 'signin', Icon: ReceiptLongIcon },
  { pageName: 'Register', pageLink: 'signup', Icon: AccountBoxIcon },
];
