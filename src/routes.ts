import Home from './components/pages/Home';
import Services from './components/pages/Services';
import Revolution from './components/pages/Revolution';
import AboutUs from './components/pages/AboutUs';
import ContactUs from './components/pages/ContactUs';
import CustomSoftware from './components/pages/CustomSoftware';
import MobileApps from './components/pages/MobileApps';
import WebsitesDevelopment from './components/pages/WebsitesDevelopment';
import Estimate from './components/pages/Estimate';

export interface AppRoute {
  component: () => JSX.Element;
  tabIndex: number;
  subTabIndex?: number;
  path: string;
  name: string;
}

export const routes: AppRoute[] = [
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
    name: 'Custom Software',
    tabIndex: 1,
    subTabIndex: 0,
    path: '/custom-software',
    component: CustomSoftware
  },
  {
    name: 'Mobile Apps Development',
    tabIndex: 1,
    subTabIndex: 1,
    path: '/mobile-apps-development',
    component: MobileApps
  },
  {
    name: 'Websites Development',
    tabIndex: 1,
    subTabIndex: 2,
    path: '/websites-development',
    component: WebsitesDevelopment
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
    tabIndex: 5,
    path: '/estimate',
    component: Estimate
  },
]