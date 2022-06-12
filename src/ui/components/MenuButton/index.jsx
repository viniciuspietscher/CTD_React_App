import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import PropTypes from 'prop-types';
import { useTheme } from '../../../contexts/ThemeContext';

const useStyles = createUseStyles({
  menu: {
    backgroundColor: ({ theme }) => theme.container.background,
    color: ({ theme }) => theme.translucent[70],
    position: 'absolute',
    right: ({ anchorElPosition }) =>
      window.innerWidth - anchorElPosition?.right,
    width: 200,
    marginTop: 5,
    borderRadius: 5,
    border: ({ theme }) => `1px solid ${theme.container.outline}`,
    cursor: 'pointer',
    overflow: 'hidden',
  },
});

function MenuButton({ children, element }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const anchorElPosition = anchorEl?.getBoundingClientRect();
  const open = Boolean(anchorEl);
  const { theme } = useTheme();
  const styles = useStyles({ theme, anchorElPosition });

  const handleClick = (event) => {
    open ? setAnchorEl(null) : setAnchorEl(event.currentTarget);
  };

  return (
    <div>
      <div onClick={handleClick}>{element}</div>
      {open && <div className={styles.menu}>{children}</div>}
    </div>
  );
}

MenuButton.propTypes = {
  element: PropTypes.element.isRequired,
  children: PropTypes.string.isRequired,
};

export { MenuButton };
