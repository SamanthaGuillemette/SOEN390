import * as React from 'react';
import PropTypes from 'prop-types';
import ButtonUnstyled, { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import { styled } from '@mui/system';
import Image from './COVID.jpg';
import Image2 from './Events.png';

const ButtonRoot = React.forwardRef(function ButtonRoot(props, ref) {
  const { children, ...other } = props;

  return (
    <svg width="300" height="100" {...other} ref={ref}>
      <polygon points="0,100 0,0 300,0 300,100" className="bg" />
      <polygon points="0,100 0,0 300,0 300,100" className="borderEffect" />
      <foreignObject x="0" y="0" width="300" height="100">
        <div className="content">{children}</div>
      </foreignObject>
    </svg>
  );
});

ButtonRoot.propTypes = {
  children: PropTypes.node,
};

const styles = {
  svgButton: {
      backgroundImage: `url(${Image})`,
      borderRadius: 5
  },

  svgButton2: {
    backgroundImage: `url(${Image2})`,
    borderRadius: 5
}
};

const blue = {
  50: '#F0F7FF',
  100: '#C2E0FF',
  200: '#99CCF3',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  800: '#004C99',
  900: '#003A75',
};

const CustomButtonRoot = styled(ButtonRoot)(
  ({ theme }) => `
  overflow: visible;
  cursor: pointer;
  --main-color: ${theme.palette.mode === 'light' ? blue[600] : blue[100]};
  --hover-color: ${theme.palette.mode === 'light' ? blue[50] : blue[900]};
  --active-color: ${theme.palette.mode === 'light' ? blue[100] : blue[800]};
  

  & polygon {
    fill: transparent;
    transition: all 800ms ease;
    pointer-events: none;

  }
  
  & .bg {
    stroke: var(--main-color);
    stroke-width: 1;
    
    filter: drop-shadow(0 4px 20px rgba(0, 0, 0, 0.1));
    fill: transparent;
    
  }

  & .border{
    color: var(--main-color);
  }

  & .borderEffect {
    stroke: var(--main-color);
    stroke-width: 1;
    stroke-dasharray: 150 600;
    stroke-dashoffset: 150;
    fill: transparent;
    
  }

  &:hover,
  &.${buttonUnstyledClasses.focusVisible} {
    .borderEffect {
      stroke-dashoffset: -600;
    }

    .bg {
    }
  }

  &:focus,
  &.${buttonUnstyledClasses.focusVisible} {
    outline: 1px solid;
    color: red;
    box-shadow: 0 0 5px 2px red;
  }

  &.${buttonUnstyledClasses.active} { 
    & .bg {
      transition: fill 300ms ease-out;
    }
  }

  & foreignObject {
    pointer-events: none;

    & .content {
      font-size: 2.0rem;
      font-family: IBM Plex Sans, sans-serif;
      font-weight: bold;
      line-height: 1.5;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }

    & svg {
      margin: 0 5px;
      
    }

  }`,
);

const SvgButton = React.forwardRef(function SvgButton(props, ref) {
  return <ButtonUnstyled {...props} component={CustomButtonRoot} ref={ref} />;
});

const SvgButton2 = React.forwardRef(function SvgButton(props, ref) {
  return <ButtonUnstyled {...props} component={CustomButtonRoot} ref={ref} />;
});

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard page</h1>
      <SvgButton style={styles.svgButton}>COVID-19 News</SvgButton>
      <SvgButton2 style={styles.svgButton2}>Upcoming Events</SvgButton2>
    </div>
  );
};

export default Dashboard;