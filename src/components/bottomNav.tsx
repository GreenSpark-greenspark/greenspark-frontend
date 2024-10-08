"use client";
import "@/styles/globals.css";
import Image from "next/image";
import { useState } from "react";

import IconPower from "../../public/icon/nav_power.svg";
import IconBook from "../../public/icon/nav_book.svg";
import IconAppliance from "../../public/icon/nav_appliance.svg";
import IconHome from "../../public/icon/nav_home.svg";
import IconMy from "../../public/icon/nav_my.svg";

import IconClickPower from "../../public/icon/nav_power_click.svg";
import IconClickBook from "../../public/icon/nav_book_click.svg";
import IconClickAppliance from "../../public/icon/nav_appliance_click.svg";
import IconClickHome from "../../public/icon/nav_home_click.svg";
import IconClickMy from "../../public/icon/nav_my_click.svg";

import styled from "styled-components";

export default function BottomNav() {
  const [isPowerActive, setPowerActive] = useState(false);
  const [isBookActive, setBookActive] = useState(false);
  const [isApplianceActive, setApplianceActive] = useState(false);
  const [isHomeActive, setHomeActive] = useState(false);
  const [isMyActive, setMyActive] = useState(false);

  // 각 버튼 클릭 시 상태를 토글하는 함수
  const togglePower = () => setPowerActive(!isPowerActive);
  const toggleBook = () => setBookActive(!isBookActive);
  const toggleAppliance = () => setApplianceActive(!isApplianceActive);
  const toggleHome = () => setHomeActive(!isHomeActive);
  const toggleMy = () => setMyActive(!isMyActive);

  return (
    <NavContainer>
      <NavBtn onClick={togglePower}>
        <NavIcon src={isPowerActive ? IconClickPower : IconPower} alt="Power Icon" />
        <MenuName isactive={isPowerActive ? "true" : undefined}>파워</MenuName>
      </NavBtn>
      <NavBtn onClick={toggleBook}>
        <NavIcon src={isBookActive ? IconClickBook : IconBook} alt="Book Icon" />
        <MenuName isactive={isBookActive ? "true" : undefined}>백과</MenuName>
      </NavBtn>
      <MenuHomeContainer>
        <MenuHome onClick={toggleHome} ishomeactive={isHomeActive ? "true" : undefined}>
          <NavHomeIcon src={isHomeActive ? IconClickHome : IconHome} alt="Home Icon" />
        </MenuHome>
      </MenuHomeContainer>
      <NavBtn onClick={toggleAppliance}>
        <NavIcon
          src={isApplianceActive ? IconClickAppliance : IconAppliance}
          alt="Appliance Icon"
        />
        <MenuName isactive={isApplianceActive ? "true" : undefined}>가전</MenuName>
      </NavBtn>
      <NavBtn onClick={toggleMy}>
        <NavIcon src={isMyActive ? IconClickMy : IconMy} alt="My Icon" />
        <MenuName isactive={isMyActive ? "true" : undefined}>마이</MenuName>
      </NavBtn>
    </NavContainer>
  );
}

const NavIcon = styled(Image)`
  width: 60px;
  height: 60px;
`;

const NavHomeIcon = styled(Image)`
  width: 27px;
  height: 27px;
`;

const NavContainer = styled.div`
  background-color: #fff;
  box-shadow: 0px 0px 15px 0px var(--Main-Color, #D7F3C6);
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  cursor: pointer;
`;

const MenuName = styled.p<{ isactive: string | undefined }>`
  position: relative;
  top: -1rem;
  width: 2rem;
  font-size: 10px;
  font-weight: 400;
  text-align: center;
  ${({ isactive }) => (isactive === "true" ? `color: black;` : `color: gray;`)};
`;

const MenuHomeContainer = styled.div`
  width: 7rem;
  display: flex;
  justify-content: center;
`;

const MenuHome = styled.div.attrs<{ ishomeactive: string | undefined }>(props => ({
  // ishomeactive는 DOM에 전달되지 않도록 처리
}))`
  position: relative;
  top: -1.5rem;
  ${({ ishomeactive }) => (ishomeactive === "true" ? `background-color: #91e26b;` : `background-color: white;`)};
  border: #91e26b 1px solid;
  box-shadow: 0px 0px 15px 0px var(--Main-Color, #D7F3C6);
  display: flex;
  width: 3.3rem;
  height: 3.3rem;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
`;
