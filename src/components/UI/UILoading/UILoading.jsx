import PropTypes from 'prop-types';
import cn from 'classnames'

import loaderWhite from './img/loader-white.svg'
import loaderBlack from './img/loader-black.svg'
import loaderBlue from './img/loader-blue.svg'

import styles from './UILoading.module.css';
import { useState, useEffect } from 'react';


const UILoading = ({
        theme = 'white',
        isShadow=true,
        classes
}) => {

    const [loaderIcon, setLoaderIcon] = useState(null);

    useEffect(()=>{
        switch (theme) {
            case 'black':
                setLoaderIcon(loaderBlack);
                break;
            case 'blue':
                setLoaderIcon(loaderBlue);
                break;
            case 'white':
                setLoaderIcon(loaderWhite);
                break;    
            default: setLoaderIcon(loaderWhite); break;
        }
    },[]);
    
  return(
    <img 
        className={cn(styles.loader, isShadow && styles.shadow, classes)}
        src={loaderIcon}
        alt="Loader"
    />
  )
}



UILoading.propTypes = {
    theme: PropTypes.string,
    isShadow: PropTypes.bool,
    classes: PropTypes.string,
}
export default UILoading;