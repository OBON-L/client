import React, { useState } from 'react';
import Styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import redcheck from '../../assets/red-check.svg';
import transparent_check from '../../assets/transparent_check.svg';

const SignupContentsWrap = Styled.div`
  * {
      color: #859594;
  }
  img {
    width: 15px;;
    height: 15px;
    margin-right: 5px;
  }
  #circle1, #circle2 {
    margin: 22px 6px 0 22px;
    display: inline-block;
    width: 44px;
    height: 44px;
    background: none;
    border-radius: 50%;
    border: 2px solid #CABFC5;
    h2 {
      font-weight: bold;
      color: #859594;
      font-size: 23px;
      text-align: center;
      position: relative;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
  #circle2 {
      margin-left: 0px;
  }

  #circle1 {
    background-color: #CABFC5;
  }
  #box-title {
    margin: 26px 0 0 34px;
    h2 {
      font-size: 20px;
      font-weight: bold;
    }
  }
  #box-container {
      margin-bottom: 54px;
  }
  #box-container2 {
      margin-bottom: 27px;
  }
  #box-subtitle1 {
      margin: 24px 0 9px 0;
      font-size: 20px;
      text-align: center;
      #requirements {
          color: #F79C43;
      }
  }
  input[type='text'] {
    display: block;
    margin: 0 auto;
    width: 242px;
    height: 73px;
    border: 1px solid #000000;
    }
  #box-subtitle2 {
      margin-top: 13px;
      text-align: center;
      font-size: 20px;
      input[id='check'], input[id='check2'] {
          display: none;
          + label {
            font-weight: normal;
            vertical-align: -6px;
            margin-right: 8px;
            border: 1px solid #CABFC5;
            width: 15px;
            height: 15px;
        }
        :checked + label {
          background-image: url(${transparent_check});
          background-size: cover;
        }
      }
    }
    #description {
      vertical-align: bottom;
      h2 {
        color: #000000;
        text-align: center;
        font-size: 14px;
        margin-bottom: 18px;
      }
    }
`;

const ButtonWrap = Styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-around;
`;

const Button = Styled.button`
  display: flex;
  width: 156px;
  height: 54px;
  background-color: #859594;
  outline: none;
  border: none;
  box-shadow: 0px 0px 3px 0px #859594;
  h2 {
    text-align: center;
    color: white;
    font-weight: bold;
    font-size: 23px;
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;

const SignupContents = ({ history }) => {
  const [checkedInputs, setCheckedInputs] = useState([]);

  const changeHandler = (checked, id) => {
    if (checked) {
      setCheckedInputs([...checkedInputs, id]);
      console.log('체크 반영 완료');
    } else {
      setCheckedInputs(checkedInputs.filter(el => el !== id));
      console.log('체크 해제 반영 완료');
    }
  };

  const isAllChecked = checkedInputs.length === 2;
  const disabled = !isAllChecked;
  return (
    <>
      <SignupContentsWrap>
        <div id="circle-container">
          <div id="circle1">
            <h2>1</h2>
          </div>
          <div id="circle2">
            <h2>2</h2>
          </div>
        </div>
        <div id="box-title">
          <h2>1. 약관 확인</h2>
        </div>
        <div id="box-container">
          <div id="box-subtitle1">
            <span>사이트 이용약관동의</span>
            <span id="requirements">(필수)</span>
          </div>
          <input type="text" readOnly={true} />
          <div id="box-subtitle2">
            <input
              id="check"
              type="checkbox"
              onChange={e => {
                changeHandler(e.currentTarget.checked, 'check');
              }}
              checked={checkedInputs.includes('check') ? true : false}
            ></input>
            <label htmlFor="check"></label>
            <span>동의합니다</span>
          </div>
        </div>
        <div id="box-container2">
          <div id="box-subtitle1">
            <span>개인정보 이용 및 수집 동의</span>
            <span id="requirements">(필수)</span>
          </div>
          <input type="text" readOnly={true} />
          <div id="box-subtitle2">
            <input
              type="checkbox"
              id="check2"
              onChange={e => {
                changeHandler(e.currentTarget.checked, 'check2');
              }}
              checked={checkedInputs.includes('check2') ? true : false}
            ></input>
            <label htmlFor="check2"></label>
            <span>동의합니다</span>
          </div>
        </div>
        <div id="description">
          <h2 style={disabled ? { display: 'block' } : { color: 'white' }}>
            <img
              style={
                disabled ? { display: 'inline-block' } : { display: 'none' }
              }
              src={redcheck}
              id="redcheck"
              alt="redcheck"
            />
            앗! 필수 동의 항목에 동의하지 않으셨어요!
          </h2>
        </div>
        <ButtonWrap>
          <Button>
            <h2>취소</h2>
          </Button>
          <Button
            disabled={disabled}
            onClick={() => history.push('/signupcomplete')}
            style={
              disabled
                ? { backgroundColor: '#859594' }
                : { backgroundColor: '#F79C43' }
            }
          >
            <h2>확인</h2>
          </Button>
        </ButtonWrap>
      </SignupContentsWrap>
    </>
  );
};

SignupContents.propTypes = {
  history: PropTypes.object,
};

export default withRouter(SignupContents);
