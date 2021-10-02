import React, { useState } from "react";
import styled from "styled-components";
import { BiAddToQueue } from "react-icons/bi";
import { BsPlusSquare } from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import Main from "./Main";

//hooks
const Container = styled.div`

background-color:#F6F6F6 ;`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Heading = styled.div`
  & > h1 {
    font-weight: 700;
  }
`;

const AddCourse = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  & > button {
    border-radius: 5px;
    border: none;
    font-size: 1.1rem;
    color: white;
    margin: 0.5em 1em;
    padding: 0.5em 1em;
    font-weight: 500;
    cursor: pointer;
  }
`;

/* const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  background-color: white;
  border-radius: 50px;
  height: 25rem;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;

  & > h4 {
    padding: 0.5rem 1rem;
    font-weight: 700;
  }

  & > p {
    padding: 0rem 1rem;
    margin-bottom: 3rem;
    font-size: 15px;
  }

  & > button {
    font-size: 20px;
  }
`; */

export async function getSortedPostsData() {
  let url = new URL("http://65.1.150.227:5000/api/Tests/add");
  url.search = new URLSearchParams({
    categoryName: "Learn JavaScript",
    categoryDescription: "Best language",
    status: 1,
  });

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain",
    },
  });

  const data = await res.json();

  console.log(data);
  return data;
}

export default function Navbar(props) {
  return (
    <Container>
      <Wrapper>
        <Heading>
          <h1>My Courses</h1>
        </Heading>
        <AddCourse>
          <button
            className="btn btn-primary"
            id="Add"
            onClick={() => {
              getSortedPostsData().then((data) => {
                props.setApiData(data, console.log("onclick:", data));
              });
            }}
          >
            Add Course
          </button>
          <span>
            <BsPlusSquare size={25} color={"#555555"} />
          </span>
        </AddCourse>
      </Wrapper>
    </Container>
  );
}
