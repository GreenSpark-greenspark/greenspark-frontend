"use client";
import "@/styles/globals.css";
import Image from "next/image";

import IconPower from "../../public/icon/nav_power.png";
import IconBook from "../../public/icon/nav_book.png";
import IconAppliance from "../../public/icon/nav_appliance.png";
import IconHome from "../../public/icon/nav_home.png";
import IconMy from "../../public/icon/nav_my.png";

import IconClickPower from "../../public/icon/nav_power_click.png";
import IconClickBook from "../../public/icon/nav_book_click.png";
import IconClickAppliance from "../../public/icon/nav_appliance_click.png";
import IconClickHome from "../../public/icon/nav_home_click.png";
import IconClickMy from "../../public/icon/nav_my_click.png";

import styled from "styled-components";
export default function bottomNav() {
  return (
    <>
      <NavContainer>
        <NavBtn>
          <Image src={IconPower} alt="로고 이미지" width={60} height={60} />
          <MenuName>파워</MenuName>
        </NavBtn>
        <NavBtn>
          <Image src={IconBook} alt="로고 이미지" width={60} height={60} />
          <MenuName>백과</MenuName>
        </NavBtn>
        <MenuHomeContainer>
          <MenuHome>
            <Image src={IconClickHome} alt="로고 이미지" width={27} height={27} />
          </MenuHome>
        </MenuHomeContainer>
        <NavBtn>
          <Image src={IconAppliance} alt="로고 이미지" width={60} height={60} />
          <MenuName>가전</MenuName>
        </NavBtn>
        <NavBtn>
          <Image src={IconMy} alt="로고 이미지" width={60} height={60} />
          <MenuName>마이</MenuName>
        </NavBtn>
      </NavContainer>
    </>
  );
}
const NavContainer = styled.div`
/* background-color: #e6d7fa; */
background-color: #fff;
box-shadow: 0px 0px 15px 0px var(--Main-Color, #D7F3C6);
/* height: 7.4rem; */
height: 74px;
border-radius: 30px 30px 0px 0px;
padding: 0 1.5rem;
display: flex;
justify-content: center;
align-items: center;
`;
const NavBtn = styled.div`
height: 100%;
width: 6rem;

/* border: 1px solid black; */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
background-color: #fff;
`;
const NavIconContainer = styled.div`
width: 60px;
/* width:3rem; */
height: 4rem;
/* border: 1px solid black; */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;
const Icon = styled.img`
width: 2.4rem;
height: 2.4rem;
background-color: #fff;
margin-bottom: 7px;
`;
const MenuName = styled.p`
position: relative;
top: -1rem;
width: 2rem;
font-size: 10px;
font-weight: 400;
text-align: center;
/* background-color: #fff; */
`;
const MenuHomeContainer = styled.div`
width: 7rem;
display: flex;
justify-content: center;
`;
const MenuHome = styled.div`
    position: relative;
    top: -2rem;
    background-color: #91E26B;
    /* background-color: #fff; */
    border: #91E26B 1px solid;
    box-shadow: 0px 0px 15px 0px var(--Main-Color, #D7F3C6);
    display: flex;
    width: 3.3rem;
    height: 3.3rem; 
    /* padding: 0.8rem; */
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    
`;
