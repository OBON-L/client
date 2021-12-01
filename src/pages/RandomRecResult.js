/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import ClothBox from '../components/recResult/ClothBox';
import RandomRecText from '../components/recResult/RandomRecText';
import RatingBar from '../components/recResult/RatingBar';
import MakeModal from '../components/recResult/MakeModal';
import blackFilledHeart from '../assets/recResult/blackFilledHeart.svg';
import blouse from 'assets/blouse.png';
import skirt from 'assets/skirt.png';
import Styled from 'styled-components';

const RandomRecResultWrap = Styled.div`
  #stateContainer{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #statement{
    width: 230px;
    height: 16px;
    font-size: 14px;
    text-align: center;
    margin-top: 51px;
    font-weight: bold;
  }
  #boxContainer{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 35px;
  }
  #blackFilledHeart{
    margin-left: 12px;
    margin-right: 13px;
  }
  #leftBox{
    display: flex;
    justify-content: center;
  }
  #rightBox{
    margin-left: 30px;
    display: flex;
    justify-content: center;
  }
`;

const RandomRecResult = () => {
  // SY: mode를 original과 changed 두개로 나눠 original일 경우 rating 가능, changed일 경우 SNS 공유 가능
  const mode = 'original';
  // SY: MakeModal -> Sns -> MakeButton에 랜덤으로 추천받는 경우와 옷장에서 고른 옷 기반으로 추천받는 경우를 나눠 전달
  // SY: MakeModal -> Sns -> MakeButton의 다시 추천받기를 클릭하는 경우 recMethod 변수에 따라 다른 url로 이동하게 하기 위함 
  const recMethod = 'random';
  // SY: 서버를 통해 DB 정보를 가져올 수 없기에 일단은 upperState(상의), lowerState(하의), userState(사용자) 정보 생성
  const upperState = [
    {name: '쉬폰 블라우스'},
    {category: '셔츠'},
    {season: '봄/가을'},
    {color: 'white'},
    {src: {blouse}},
    {fileName: 'blouse'},
    {isWebCrawl: 'false'},
    {href: 'https://www.naver.com/'}
  ];
  
  const lowerState = [
    {name: '치마1'},
    {category: '치마'},
    {season: '봄/가을'},
    {color: 'black'},
    {src: {skirt}},
    {fileName: 'skirt'},
    {isWebCrawl: 'true'},
    {href: ''}
  ]
  
  const userState = [
    {name: '소희'},
    {style: '세미정장'}
  ]
  return (
        {/* SY: 상의정보를 넘겨주는데, 이름-카테고리-계절-색-src-파일명-웹크롤링 여부-웹크롤링 주소 순으로 전달해야 함, 이때 파일명을 같이 전달하지 않으면 이미지 에러 발생 */}
  {/* SY: 하의정보를 넘겨주는데, 이름-카테고리-계절-색-src-파일명-웹크롤링 여부-웹크롤링 주소 순으로 전달해야 함, 이때 파일명을 같이 전달하지 않으면 이미지 에러 발생 */}
    <RandomRecResultWrap>
      <div id='stateContainer'>
        <div id='statement'>오늘 {userState[0].name}님에게 추천하는 조합은?</div>
      </div>
      {/* SY: 상의, 하의 추천 결과 보여주는 두 개의 박스 */}
      <div id='boxContainer'>
        {/* SY: ClothBox에서 id를 넘겨줌으로써 어떤 박스의 하트가 클릭됐는지, 어떤 박스가 WebCrawling한 결과인지 판단할 수 있게 함 */}
        <ClothBox id='leftBox'
          name={upperState[0].name} category={upperState[1].category} season={upperState[2].season} 
          color={upperState[3].color} src={upperState[4].src} fileName={upperState[5].fileName} 
          isWebCrawl={upperState[6].isWebCrawl} href={upperState[7].href}>
        </ClothBox>
        <img id='blackFilledHeart' src={blackFilledHeart} alt='blackFilledHeart' />
        <ClothBox id='righttBox' 
          name={lowerState[0].name} category={lowerState[1].category} season={lowerState[2].season} 
          color={lowerState[3].color} src={lowerState[4].src} fileName={lowerState[5].fileName}
          isWebCrawl={lowerState[6].isWebCrawl} href={lowerState[7].href}>
        </ClothBox>
      </div>
      {/* SY: 추천 관련 설명 문구 */}
      <RandomRecText season={upperState[2].season} look={upperState[1].category} style={userState[1].style} name={userState[0].name}></RandomRecText>
      {/* SY: 추천 결과 점수 매기는 바 */}
      <RatingBar mode={mode}></RatingBar>
      {/* SY: 점수 확인 버튼 */}
      <MakeModal mode={mode} recMethod={recMethod}></MakeModal>
    </RandomRecResultWrap>
  );
};

export default RandomRecResult;
