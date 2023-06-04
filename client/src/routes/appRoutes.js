import HomePage from "../pages/HomePage";
import TablesPage from "../pages/TablesPage";
import HomeIcon from '@mui/icons-material/Home';
import BackupTableIcon from '@mui/icons-material/BackupTable';

const appRoutes = [
  {
    index: true,
    element: <HomePage />,
    state: "home"
  },
  {
    path: "/home",
    element: <HomePage />,
    state: "installation",
    sidebarProps: {
      displayText: "Что-то",
      icon: <HomeIcon />
    }
  },
  {
    path: "/tables",
    element: <TablesPage />,
    state: "tables",
    sidebarProps: {
      displayText: "Таблицы",
      icon: <BackupTableIcon />
    }
  }
];

export default appRoutes;