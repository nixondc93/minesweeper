import React, {PropTypes} from 'react';
import {getGameAttributesByDifficulty} from 'utils/game';

export default function GameMenu(props) {
  const {handleApplySettings, handleExitMenu, gameAttributes} = props;

  const defaultBeginnerAttributes = getGameAttributesByDifficulty('beginner');
  const defaultIntermediateAttributes = getGameAttributesByDifficulty('intermediate');
  const defaultExpertAttributes = getGameAttributesByDifficulty('expert');
  const defaultCustomAttributes = getGameAttributesByDifficulty('custom');

  const isBeginnerSelected = gameAttributes.mines === defaultBeginnerAttributes.mines;
  const isIntermediateSelected = gameAttributes.mines === defaultIntermediateAttributes.mines;
  const isExpertSelected = gameAttributes.mines === defaultExpertAttributes.mines;
  const isCustomSelected = !isBeginnerSelected && !isIntermediateSelected && !isExpertSelected;

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = document.getElementById('game-menu');
    const difficulty = form.elements.difficulty.value;

    if (difficulty === 'custom') {
      if (parseInt(form.elements['custom-height'].value, 10) && parseInt(form.elements['custom-width'].value, 10) && parseInt(form.elements['custom-mines'].value, 10)) {
        if (parseInt(form.elements['custom-height'].value, 10) * parseInt(form.elements['custom-width'].value, 10) <= parseInt(form.elements['custom-mines'].value, 10)) {
          handleApplySettings({
            height: parseInt(form.elements['custom-height'].value, 10),
            width: parseInt(form.elements['custom-width'].value, 10),
            mines: (parseInt(form.elements['custom-height'].value, 10) * parseInt(form.elements['custom-width'].value, 10) - 1),
          });
        } else {
          handleApplySettings({
            height: parseInt(form.elements['custom-height'].value, 10),
            width: parseInt(form.elements['custom-width'].value, 10),
            mines: parseInt(form.elements['custom-mines'].value, 10),
          });
        }
      } else {
        handleApplySettings(defaultCustomAttributes);
      }
    } else {
      handleApplySettings(getGameAttributesByDifficulty(difficulty));
    }
  };

  return (
    <div className="game-menu container">
      <form id="game-menu" onSubmit={(event) => handleSubmit(event)}>
      <div className="row menu-header">
        <div className="col-xs-6"><span className="pull-left">Game</span></div>
        <div className="col-xs-6 pt2" onClick={() => handleExitMenu()}><span className="fa fa-times pull-right pointer"></span></div>
      </div>
      <div>
      </div>
      <div className="row attr-header">
        <div className="col-xs-5"></div>
        <div className="row col-xs-7 padding0">
          <div className="col-xs-4">Height</div>
          <div className="col-xs-4">Width</div>
          <div className="col-xs-4">Mines</div>
        </div>
      </div>

      <div className="row">

        <div className="row pointer">
          <div className="col-xs-5">
            <input name="difficulty" className="col-xs-3" type="radio" value="beginner" defaultChecked={isBeginnerSelected} />
            <strong className="col-xs-9 padding0 fs-small ta-left">Beginner</strong>
          </div>
          <div className="row col-xs-7 padding0">
            <div className="col-xs-4">{defaultBeginnerAttributes.height}</div>
            <div className="col-xs-4">{defaultBeginnerAttributes.width}</div>
            <div className="col-xs-4">{defaultBeginnerAttributes.mines}</div>
          </div>
        </div>

        <div className="row pointer">
          <div className="col-xs-5">
            <input name="difficulty" className="col-xs-3" type="radio" value="intermediate" defaultChecked={isIntermediateSelected} />
            <strong className="col-xs-9 padding0 fs-small ta-left">Intermediate</strong>
          </div>
          <div className="row col-xs-7 padding0">
            <div className="col-xs-4">{defaultIntermediateAttributes.height}</div>
            <div className="col-xs-4">{defaultIntermediateAttributes.width}</div>
            <div className="col-xs-4">{defaultIntermediateAttributes.mines}</div>
          </div>
        </div>

        <div className="row pointer">
          <div className="col-xs-5">
            <input name="difficulty" className="col-xs-3" type="radio" value="expert" defaultChecked={isExpertSelected} />
            <strong className="col-xs-9 padding0 fs-small ta-left">Expert</strong>
          </div>
          <div className="row col-xs-7 padding0">
            <div className="col-xs-4">{defaultExpertAttributes.height}</div>
            <div className="col-xs-4">{defaultExpertAttributes.width}</div>
            <div className="col-xs-4">{defaultExpertAttributes.mines}</div>
          </div>
        </div>

        <div className="row pointer">
          <div className="col-xs-5">
            <input name="difficulty" className="col-xs-3" type="radio" value="custom" defaultChecked={isCustomSelected} />
            <strong className="col-xs-9 padding0 fs-small ta-left">Custom</strong>
          </div>
          <div className="row col-xs-7 padding0">
            <input name="custom-height" className="col-xs-4 padding0" type="text" placeholder={isCustomSelected && gameAttributes.height || defaultCustomAttributes.height} />
            <input name="custom-width" className="col-xs-4 padding0" type="text" placeholder={isCustomSelected && gameAttributes.width || defaultCustomAttributes.width} />
            <input name="custom-mines" className="col-xs-4 padding0" type="text" placeholder={isCustomSelected && gameAttributes.mines || defaultCustomAttributes.mines} />
          </div>
        </div>

      </div>
      <div className="row attr-header ta-left padding2">
        <button type="submit" className="fs-small">Apply Settings</button>
      </div>
      </form>
    </div>
  );
}

GameMenu.propTypes = {
  handleApplySettings: PropTypes.func.isRequired,
  handleExitMenu: PropTypes.func.isRequired,
  gameAttributes: PropTypes.object.isRequired,
};
