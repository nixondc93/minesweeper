/*eslint-disable*/
import React, {PropTypes} from 'react';
import {getGameAttributesByDifficulty} from 'utils/game';

export default function GameMenu(props) {
  const {handleApplySettings} = props;

  const beginnerAttributes = getGameAttributesByDifficulty('beginner');
  const intermediateAttributes = getGameAttributesByDifficulty('intermediate');
  const expertAttributes = getGameAttributesByDifficulty('expert');

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = document.getElementById('game-menu');
    const difficulty = form.elements['difficulty'].value;
    console.log(form.elements);
    if (difficulty === 'custom') {
      handleApplySettings(getGameAttributesByDifficulty({
        height: form.elements["custom-height"].value,
        width: form.elements["custom-width"].value,
        mines: form.elements["custom-mines"].value,
      }));
    } else {
      handleApplySettings(getGameAttributesByDifficulty(difficulty));
    }
  }

  return (
    <div className="game-menu container">
      <form id="game-menu" onSubmit={(e) => handleSubmit(e)}>
      <div className="row menu-header">
        <div className="col-xs-6"><span className="pull-left">Game</span></div>
        <div className="col-xs-6 pt2"><span className="fa fa-times pull-right pointer"></span></div>
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
            <input name="difficulty" className="col-xs-3" type="radio" value="beginner"/>
            <strong className="col-xs-9 padding0 fs-small ta-left">Beginner</strong>
          </div>
          <div className="row col-xs-7 padding0">
            <div className="col-xs-4">{beginnerAttributes.height}</div>
            <div className="col-xs-4">{beginnerAttributes.width}</div>
            <div className="col-xs-4">{beginnerAttributes.mines}</div>
          </div>
        </div>

        <div className="row pointer">
          <div className="col-xs-5">
            <input name="difficulty" className="col-xs-3" type="radio" value="intermediate" />
            <strong className="col-xs-9 padding0 fs-small ta-left">Intermediate</strong>
          </div>
          <div className="row col-xs-7 padding0">
            <div className="col-xs-4">{intermediateAttributes.height}</div>
            <div className="col-xs-4">{intermediateAttributes.width}</div>
            <div className="col-xs-4">{intermediateAttributes.mines}</div>
          </div>
        </div>

        <div className="row pointer">
          <div className="col-xs-5">
            <input name="difficulty" className="col-xs-3" type="radio" value="expert" />
            <strong className="col-xs-9 padding0 fs-small ta-left">Expert</strong>
          </div>
          <div className="row col-xs-7 padding0">
            <div className="col-xs-4">{expertAttributes.height}</div>
            <div className="col-xs-4">{expertAttributes.width}</div>
            <div className="col-xs-4">{expertAttributes.mines}</div>
          </div>
        </div>

        <div className="row pointer">
          <div className="col-xs-5">
            <input name="difficulty" className="col-xs-3" type="radio" value="custom"/>
            <strong className="col-xs-9 padding0 fs-small ta-left">Custom</strong>
          </div>
          <div className="row col-xs-7 padding0">
            <input name="custom-height" className="col-xs-4 padding0" type="text" />
            <input name="custom-width" className="col-xs-4 padding0" type="text" />
            <input name="custom-mines" className="col-xs-4 padding0" type="text" />
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
}
