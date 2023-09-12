import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People';

const MenuItems = () => {
  return (
    <List component="nav">
      <ListItemButton selected={true}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Visitas" />
      </ListItemButton>
    </List>
  );
};

export default MenuItems;
