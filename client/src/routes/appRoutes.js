import HomePage from "../pages/HomePage";
import TablesPage from "../pages/TablesPage";
import HomeIcon from '@mui/icons-material/Home';
import BackupTableIcon from '@mui/icons-material/BackupTable';

const appRoutes = [
  {
    path: "/",
    element: <HomePage />,
    state: "installation",
    sidebarProps: {
      displayText: "Описание",
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