import React, { useState } from 'react';
import { useClickHandlerContext } from '@providers/ClickHandler.provider';
import { useLanguageContext } from '@providers/Language.provider';
import { getAge, MY_BIRTH_DATE } from '@utils/getAge';
import homeBackground from '@images/homeBackground.jpg';
import NavBar from './NavBar';
import AboutMeModal from './AboutMeModal';
import './Home.css';

const Home = () => {
  const [showAboutMeModal, setShowAboutMeModal] = useState(false);
  const age = getAge(MY_BIRTH_DATE);
  const { addFunctionToExecute, removeFunctionToExecute } = useClickHandlerContext();
  const { getMessage } = useLanguageContext();

  const onClickOutsideModal = () => {
    setShowAboutMeModal(false);
    removeFunctionToExecute(onClickOutsideModal);
  };

  const handleAboutMeButtonClick = (e) => {
    e.stopPropagation();
    setShowAboutMeModal(true);
    addFunctionToExecute(onClickOutsideModal);
  };

  return (
    <section className="home" style={{ backgroundImage: `url(${homeBackground})` }}>
      <NavBar />
      <div className="homeTitleDiv">
        <h1>{getMessage('home.name.introduction')}</h1>
        <h1>Mateo Fay</h1>
        <h4>{getMessage('home.profession')}</h4>
      </div>
      <div className="homeIntroductionDiv">
        <p>{getMessage('home.introduction.description1', { age })}</p>
        <p>{getMessage('home.introduction.description2')}</p>
      </div>
      <button className="aboutMeButton" onClick={handleAboutMeButtonClick}>
        <p>{getMessage('home.aboutMe.button')}</p>
      </button>
      {showAboutMeModal && <AboutMeModal onCloseButtonClick={onClickOutsideModal} />}
    </section>
  );
};

export default Home;
