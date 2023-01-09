import PersonPhoto from '@components/PersonPage/PersonPhoto'
import PersonInfo from '@components/PersonPage/PersonInfo'
import PersonLinkBack from '@components/PersonPage/PersonLinkBack';

import UILoading from '@ui/UILoading';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import React, { useEffect, useState, Suspense } from 'react';
import { getApiResource } from '@utils/network';
import { getPeopleImage } from '@services/getPeopleData'
import { API_PERSON } from '@constants/api';
import { withErrorApi } from '@hoc-helpers/withErrorApi';

import styles from './PersonPage.module.css';

const PersonFilms = React.lazy(() => import('@components/PersonPage/PersonFilms'));

const PersonPage = ({ setErrorApi }) => {
    const id = useParams().id;
    const [personInfo, setPersonInfo] = useState(null);
    const [personName, setPersonName] = useState(null);
    const [personPhoto, setPersonPhoto] = useState(null);
    const [personFilms, setPersonFilms] = useState(null);
    const [personFavorite, setPersonFavorite] = useState(false);

    const storeData = useSelector(state => state.favoriteReducer);

    useEffect(()=>{
        (async () => {
            const res = await getApiResource(`${API_PERSON}/${id}/`);
            
            storeData[id] ? setPersonFavorite(true) : setPersonFavorite(false);

            if(res){
                setPersonInfo([
                    { title: 'Height', data: res.height },
                    { title: 'Mass', data: res.mass },
                    { title: 'Hair Color', data: res.hair_color },
                    { title: 'Skin Color', data: res.skin_color },
                    { title: 'Eye Color', data: res.eye_color },
                    { title: 'Birth Year', data: res.birth_year },
                    { title: 'Gender', data: res.gender },
                ]);
                setPersonName(res.name);
                setPersonPhoto(getPeopleImage(id));

                if(res.films.length){
                    setPersonFilms(res.films);
                }
            }
            setErrorApi(!res);
        })();
    }, []);

  return(
    <>
        <PersonLinkBack />
        <div className={styles.wrapper}>
            <span className={styles.person__name}>{personName}</span>
            
            <div className={styles.container}>
                <PersonPhoto 
                    personId = {id}
                    personPhoto = {personPhoto}
                    personName = {personName}
                    personFavorite={personFavorite}
                    setPersonFavorite={setPersonFavorite}
                />

                {personInfo && <PersonInfo personInfo = { personInfo }/>}

                {personFilms && (
                    <Suspense fallback = {<UILoading theme="white" isShadow />}>
                         <PersonFilms personFilms = { personFilms }/>
                    </Suspense>
                )}
            </div>   
        </div>
    </>
  )
}

PersonPage.propTypes = {
    setErrorApi: PropTypes.func
}

export default withErrorApi(PersonPage);
