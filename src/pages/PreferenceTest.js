/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import toLeft from 'assets/preferenceTest/toLeft.svg';
import toRight from 'assets/preferenceTest/toRight.svg';
import Modal from 'react-awesome-modal';
import { useHistory } from 'react-router';
import Styled from 'styled-components';

const PreferenceTestWrap = Styled.div`
  #preferenceTestContainer{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  #statement{
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    width: 230px;
    height: 16px;
    margin-top: 51px;
    margin-bottom: 35px;
  }
  #imgContainer{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  #outerBox{
    width: 224px;
    height: 330px;
    border: 1px solid #C4C4C4;
    background: #C4C4C4;
    border-radius: 7%;
  }
  #innerBox{
    width: 184px;
    height: 292px;
    border: 1px solid white;
    background: white;
    border-radius: 5%;
    margin: 19px;
  }
  #cloth{
    width: 184px;
    height: 292px;
    border-radius: 5%;
  }
  #clothOrder{
    margin-bottom: 35px;
  }
  #btn{
    width: 130px;
    height: 50px;
    background-color: #CABFC5;
    font-size: 14px;
    color: white;
    border-radius: 7px;
    border: 1px solid #CABFC5;
    font-weight: bold;
    margin-top: 22px;
  }
  #btn: focus {
    outline: none;
    border: none;
  }
  input[type='range']{
    overflow: hidden;
    width: 250px;
    height: 14px;
    -webkit-appearance: none;
    background-color: #C4C4C4;
    outline: none;
    /* border-radius: 10px; */
    margin-left: 8px;
  }
  input[type='range']::-webkit-slider-thumb{
    width: 25px;
    -webkit-appearance: none;
    height: 25px;
    cursor: pointer;
    background: #F79C43;
    box-shadow: -250px 0 0 250px #F79C43;
  }
  .ratingBar {
    display: flex;
    justify-content: center;
    align-items: center; 
  }
  .score{
    font-size: 14px;
    width: 40px;
    height: 30px;
    text-align: center;
    font-weight: bold;
    margin-top: 10px;
  }
  #leftScore{
    margin-left: 15px;
    font-weight: bold;
  }
  #rightScore{
    margin-left: 7px;
    font-weight: bold;
  }
  #rating {
    width: 100px;
    height: 30px;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
  }
  #modalContainer{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  #completeState{
    margin-top: 70px;
    margin-bottom: -30px;
  }
  .completeState{
    width: 170px;
    height: 50px;
    font-weight: bold;
    text-align: center;
    font-size: 14px;
  }
  #okBtn{
    margin-top: 10px;
  }
  .btn{
    width: 130px;
    height: 50px;
    background-color: #CABFC5;
    font-size: 14px;
    color: white;
    border-radius: 7px;
    border: 1px solid #CABFC5;
    font-weight: bold;
  }
  .btn:focus {
    border: none;
    outline: none;
  }
`;

const PreferenceTest = props => {
  // SY: !서버! 혹은 !DB!에서 데이터 받아와서 남자인지 여자인지 파악하고 그에 따라 함수 실행
  let userState = [
    {gender: 'female'}
  ];
  // SY: 화면에 나타나는 이미지가 몇 번째 이미지인지 파악할 수 있도록 하는 변수 선언
  let [selectedCloth, setSelectedCloth] = useState(0);
  const manImgs = [];
  const womanImgs = [];

  // SY: preferenceTest/woman_cloth 이미지 가져오기
  function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }
  if (userState[0].gender === 'male'){
    const images = importAll(require.context('assets/preferenceTest/man_cloth', false, /\.png/));
    let i;
    for (i=0; i<10; i++){
      manImgs[i] = images['man_cloth' + (i+1) + '.png'];
    }
  }
  else{
    const images = importAll(require.context('assets/preferenceTest/woman_cloth', false, /\.png/));
    let i;
    for (i=0; i<10; i++){
      womanImgs[i] = images['woman_cloth' + (i+1) + '.png'];
    }
  }
  const images = importAll(require.context('assets/preferenceTest/woman_cloth', false, /\.png/));

  // SY: 회원이 여성일 경우 화면에 보여줄 옷의 src를 배열에 담기
  

// SY: 화면에 나타난 옷의 순서에서 +1을 하는 함수
  function plusNumber() {
    if (selectedCloth < 9) {
      setSelectedCloth(selectedCloth+1);
    }
  }

  // SY: 화면에 나타난 옷의 순서에서 -1을 하는 함수
  function minusNumber(){
    if (selectedCloth > 0) {
      setSelectedCloth(selectedCloth-1); 
    }
  }

  // SY: 모달 열고 닫는 함수
  const [isVisible, setVisible] = useState(props.visible);
  const openModal = () => {
    setVisible(true);
  }
  const closeModal = () => {
    setVisible(false);
  }
  const history = useHistory();
  function goToMain() {
    history.push('/');
    return <></>;
  }

  // SY: 평가해주세요 버튼을 누르면 실행됨
  function update() {
    // shallow copy
    const newArray = [..._value];
    // mutate copy
    newArray[selectedCloth] = Number(temp);
    // set state
    setValue(newArray);
    // SY: setTemp를 3으로 초기화해줌으로써 다음 이미지로 넘어갔을 때 3점으로 초기화된 ratingBar에서 아무것도 누르지 않고 버튼을 눌러도 3점이 배열에 담김
    setTemp(3);

    if (selectedCloth === 9){
      // 모달
      // !서버!에 정보 보내기
      console.log(_value);
      openModal();
    }
  }

  // SY: ratingBar에서 움직일 때마다 실행됨
  function changeValue(value) {
    const newArray = [..._value];
    // const newIsFirst = [...isFirst];
    // mutate copy
    newArray[selectedCloth] = Number(value);
    // set state
    setValue(newArray);
  }

  // SY: 기본 점수를 3으로 설정함으로써 ratingBar의 default 값이 3이 됨
  let [_value, setValue] = useState([3, 3, 3, 3, 3, 3, 3, 3, 3, 3]);
  // SY: 배열에 점수를 넣기 위한 변수 temp
  let [temp, setTemp] = useState(3);

  return (
    <PreferenceTestWrap>
      <div id='preferenceTestContainer'>
        <div id='statement'>화면의 코디에 대해 평가해 주세요!</div>
        <div id='imgContainer'>
          <img src={toLeft} onClick={minusNumber}></img>
          {/* SY: 바깥 박스(전체 박스) */}
          <div id='outerBox'>
            {/* SY: 옷을 감싸는 박스 */}
            <div id='innerBox'>
              <img id='cloth' src={userState[0].gender === 'male' ? manImgs[selectedCloth].default : womanImgs[selectedCloth].default}></img>
            </div>
          </div>
          <img src={toRight} onClick={plusNumber}></img>
        </div>
        <div id='clothOrder'>{selectedCloth+1}/10</div>
        {/* SY: ratingBar */}
        <div id='ratingBar'>
          <div className='ratingBar'>
            <span className='score' id='leftScore'>1점</span>
// SY: 왜인지 모르겠으나 changeValue 함수를 추가함으로써 ratingBar 에러 해결 (이 함수 없으면 이미지 넘어갈 때마다 3점으로 초기화 + 전 이미지들로 돌아갔을 때 ratingBar 제대로 안 움직이는 문제 발생)
            <input type="range" min="1" max="5" value={_value[selectedCloth]} id="range" onChange={e => {
              changeValue(e.target.value);
              setTemp(e.target.value);
              }}></input>
            <div className='score' id='rightScore'>5점</div>
          </div>
          <div className='ratingBar'>
            <div id='rating'>{_value[selectedCloth]}점</div>
          </div> 
        </div>
        <input type='button' id='btn' value='평가해 주세요' 
        // SY: 마지막 이미지 전까지 '평가해 주세요' 버튼 클릭 시 다음 이미지로 넘어감
        onClick={() => {update(); plusNumber();}}></input>
        {/* 버튼 눌렀을 때 10번째 모달창 혹은 아직 평가가 완료되지 않았습니다. 나오게 하기.(널 값 있으면 안 돼) */}
        <Modal visible={isVisible} width="300" height="244" effect="fadeInUp" onClick={closeModal}>
          <div id='modalContainer'>
            <div id='completeState' className='completeState'>선호도 테스트가</div>
            <div className='completeState'>완료되었습니다.</div>
            <input type='button' className='btn' id='okBtn' value='확인' onClick={() => {closeModal(); goToMain();}} ></input>
          </div>
        </Modal>
      </div>
    </PreferenceTestWrap>
  );
};

export default PreferenceTest;
