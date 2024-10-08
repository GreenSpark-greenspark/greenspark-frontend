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
  const [activeButton, setActiveButton] = useState<string>("home");

  const handleButtonClick = (button: string) => {
    setActiveButton(button);
  };

  return (
    <NavContainer>
      <NavBtn onClick={() => handleButtonClick("power")}>
        <NavIcon
          src={activeButton === "power" ? IconClickPower : IconPower}
          alt="Power Icon"
          priority
        />
        <MenuName $isactive={activeButton === "power" ? "true" : undefined}>파워</MenuName>
      </NavBtn>
      <NavBtn onClick={() => handleButtonClick("book")}>
        <NavIcon
          src={activeButton === "book" ? IconClickBook : IconBook}
          alt="Book Icon"
          priority
        />
        <MenuName $isactive={activeButton === "book" ? "true" : undefined}>백과</MenuName>
      </NavBtn>
      <MenuHomeContainer>
        <MenuHome
          onClick={() => handleButtonClick("home")}
          $ishomeactive={activeButton === "home" ? "true" : undefined}
        >
          <NavHomeIcon
            src={activeButton === "home" ? IconClickHome : IconHome}
            alt="Home Icon"
            priority
          />
        </MenuHome>
      </MenuHomeContainer>
      <NavBtn onClick={() => handleButtonClick("appliance")}>
        <NavIcon
          src={activeButton === "appliance" ? IconClickAppliance : IconAppliance}
          alt="Appliance Icon"
          priority
        />
        <MenuName $isactive={activeButton === "appliance" ? "true" : undefined}>가전</MenuName>
      </NavBtn>
      <NavBtn onClick={() => handleButtonClick("my")}>
        <NavIcon src={activeButton === "my" ? IconClickMy : IconMy} alt="My Icon" priority />
        <MenuName $isactive={activeButton === "my" ? "true" : undefined}>마이</MenuName>
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

const MenuName = styled.p<{ $isactive: string | undefined }>`
  position: relative;
  top: -1rem;
  width: 2rem;
  font-size: 10px;
  font-weight: 500;
  text-align: center;
  ${({ $isactive }) => ($isactive === "true" ? `color: black;` : `color: gray;`)};
`;

const MenuHomeContainer = styled.div`
  width: 7rem;
  display: flex;
  justify-content: center;
`;

const MenuHome = styled.div.attrs<{ $ishomeactive: string | undefined }>(props => ({}))`
  position: relative;
  top: -1.5rem;
  ${({ $ishomeactive }) => ($ishomeactive === "true" ? `background-color: #91e26b;` : `background-color: white;`)};
  ${({ $ishomeactive }) => ($ishomeactive === "true" ? `box-shadow: 0px 0px 15px 0px var(--Main-Color, #D7F3C6);` : `box-shadow:none;`)};
  border: #91e26b 1px solid;
  display: flex;
  width: 3.3rem;
  height: 3.3rem;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
`;
