import React from "react";
import styled from "styled-components";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsArrowCounterclockwise , BsSearch } from "react-icons/bs";


const Container = styled.div`
  padding: 2rem 0rem;
background-color:#F6F6F6 ;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Info = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-space-between;
  align-items: center;
  gap: 1rem;
  flex-basis: 60%;
`;

const Search = styled.div`
  & > button {
    background: #00b7ff;
    border-radius: 5px;
    border: none;
    font-size: 1rem;
    color: white;
    margin: 0.5em 1em;
    padding: 0.5em 1em;
    font-weight: 700;
    cursor: pointer;
  }
`;


const SortBy = [
  { label: "Old", value: 1 },
  { label: "New", value: 2 },
];

const Type = [
  { label: "Tech", value: 1 },
  { label: "Non-Tech", value: 2 },
];

const Published = [
  { label: "Published", value: 1 },
  { label: "Drafted", value: 2 },
];

export default function Details() {
  return (
    <Container>
      <Wrapper>
        <Info>

          <Select className="w-100" placeholder=" Sort by " options={SortBy} />
          <div className="dropdown show">
            <div className="dropdown-menu" aria-labelledby="actions">
              <a className="dropdown-item" href="#">
                Old
              </a>
              <a className="dropdown-item" href="#">
                New
              </a>
            </div>
          </div>

          <Select className="w-100" placeholder=" Type " options={Type} />
          <div className="dropdown show">
            <div className="dropdown-menu" aria-labelledby="actions">
              <a className="dropdown-item" href="#">
                Tech
              </a>
              <a className="dropdown-item" href="#">
                Non-Tech
              </a>
            </div>
          </div>

          <Select className="w-100" placeholder=" Published " options={Published} />
          <div className="dropdown show">
            <div className="dropdown-menu" aria-labelledby="actions">
              <a className="dropdown-item" href="#">
                Published
              </a>
              <a className="dropdown-item" href="#">
                Drafted
              </a>
            </div>
          </div>

          <span>
          <BsArrowCounterclockwise size={25} color={"#555555"}  />
          </span>
        </Info>
        <Search>
          <span>
            <BsSearch size={25} color={"#555555"}  />
          </span>
        </Search>
      </Wrapper>
    </Container>
  );
}
