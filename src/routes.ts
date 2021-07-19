import Home from './components/pages/Home';
import Services from './components/pages/Services';
import Revolution from './components/pages/Revolution';
import AboutUs from './components/pages/AboutUs';
import ContactUs from './components/pages/ContactUs';
import CustomSoftware from './components/pages/CustomSoftware';
import MobileApps from './components/pages/MobileApps';

interface Route {
  component: () => JSX.Element;
  tabIndex?: number;
  path: string;
  name: string;
}

export const routes: Route[] = [
  {
    name: 'Home',
    tabIndex: 0,
    path: '/',
    component: Home
  },
  {
    name: 'Services',
    tabIndex: 1,
    path: '/services',
    component: Services
  },
  {
    name: 'Custom software',
    tabIndex: 1,
    path: '/custom-software',
    component: CustomSoftware
  },
  {
    name: 'Mobile apps',
    tabIndex: 1,
    path: '/mobile-apps',
    component: MobileApps
  },
  {
    name: 'The revolution',
    tabIndex: 2,
    path: '/revolution',
    component: Revolution
  },
  {
    name: 'About Us',
    tabIndex: 3,
    path: '/about-us',
    component: AboutUs
  },
  {
    name: 'Contact us',
    tabIndex: 4,
    path: '/contact-us',
    component: ContactUs
  },
  {
    name: 'Free estimate',
    path: '/estimate',
    component: ContactUs
  },
]