"use client";
import "@/styles/globals.css";

import styled from "styled-components";
export default function bottomNav() {
  return (
    <>
      <NavContainer>
        <NavBtn>
          <NavIconContainer>
            <Icon />
            <MenuName>파워</MenuName>
          </NavIconContainer>
        </NavBtn>
        <NavBtn>
          <NavIconContainer>
            <Icon />
            <MenuName>백과</MenuName>
          </NavIconContainer>
        </NavBtn>
        <MenuHomeContainer>
          <MenuHome></MenuHome>
        </MenuHomeContainer>
        <NavBtn>
          <NavIconContainer>
            <Icon />
            <MenuName>가전</MenuName>
          </NavIconContainer>
        </NavBtn>
        <NavBtn>
          <NavIconContainer>
            <Icon />
            <MenuName>마이</MenuName>
          </NavIconContainer>
        </NavBtn>
      </NavContainer>
    </>
  );
}
const NavContainer = styled.div`
background-color: #e6d7fa;
height: 7.4rem;
border-radius: 30px 30px 0px 0px;
padding: 0 2rem;
display: flex;
justify-content: center;
align-items: center;
`;
const NavBtn = styled.div`
height: 5rem;
width: 5rem;
border: 1px solid black;
display: flex;
justify-content: center;
align-items: center;

`;
const NavIconContainer = styled.div`
width: 3rem;
height: 4rem;
border: 1px solid black;
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
width: 2rem;
font-size: 10px;
font-weight: 400;
text-align: center;
background-color: #fff;
`;
const MenuHomeContainer = styled.div`
width: 7rem;
display: flex;
justify-content: center;
`;
const MenuHome = styled.div`
    position: relative;
    top: -3rem;
    /* background-color: #91E26B; */
    background-color: #fff;
    border: #91E26B 1px solid;
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
`;
