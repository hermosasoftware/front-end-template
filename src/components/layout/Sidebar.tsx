import {
  Stack,
  Text,
  VStack,
  Image,
  HStack,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  Box,
} from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import SearchInput from '../common/SearchInput/SearchInput';
import MenuBar from './MenuBar';
import menuItems from '../../config/sidebarItems';
import { useAppSelector } from '../../redux/hooks';
import { List } from 'phosphor-react';
import { useBreakpointValue } from '@chakra-ui/react';
import { useState } from 'react';
import { ReactComponent as Logo } from '../../assets/img/mav-logo.svg';

import styles from './Sidebar.module.css';

const smVariant = { navigation: 'drawer', navigationButton: true };
const mdVariant = { navigation: 'sidebar', navigationButton: false };

const blacklist = ['/login', '/signup', '/forgot-password'];

const Sidebar = () => {
  const location = useLocation();
  const { appStrings } = useAppSelector(state => ({
    ...state.settings,
  }));

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const variants = useBreakpointValue({ base: smVariant, md: mdVariant });

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const SideBarContent = () => (
    <Box className={styles.sideBar}>
      <Stack className={styles.sideBar_container}>
        <Stack className="center-content-cross">
          <Logo className={styles.logo} />
          <SearchInput placeholder={appStrings?.Global?.search} />
          <MenuBar menuItems={menuItems(appStrings)} />
        </Stack>

        <HStack className={styles.account}>
          <Image
            className={styles.account_image}
            src="https://picsum.photos/24/24"
          />
          <VStack className={styles.account_info}>
            <Text>{appStrings?.Global?.testUserName}</Text>
            <Text className={styles.account_job__text}>
              {appStrings?.Global?.testUserJob}
            </Text>
          </VStack>
        </HStack>
      </Stack>
    </Box>
  );

  const shouldBeDisplayed = !blacklist.includes(location.pathname);

  return shouldBeDisplayed ? (
    variants?.navigation === 'sidebar' ? (
      <SideBarContent />
    ) : (
      <>
        <Drawer isOpen={isSidebarOpen} placement="top" onClose={toggleSidebar}>
          <DrawerOverlay />
          <DrawerContent>
            <SideBarContent />
          </DrawerContent>
        </Drawer>
        <List
          className={styles.sidebar_icon}
          size={40}
          weight="fill"
          onClick={toggleSidebar}
        />
      </>
    )
  ) : null;
};

export default Sidebar;
