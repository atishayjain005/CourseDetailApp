import React from "react";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import { useEffect } from "react";
const TestData = [];

const Container = styled.div`
background-color:#F6F6F6 ;`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3rem 3rem;
`;

const Card = styled.div`
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
`;
export default function Main({apiData }) {
  useEffect(() => {
    if (apiData !== false) {
      console.log("data found ", apiData);
      TestData.push(apiData);
    }
  }, [apiData]);

  return (
    <Container>
      {console.log(apiData)}
      <Wrapper id="wrapper" data={console.log(JSON.stringify(TestData))}>
        {TestData.map((element,index)=>(
          <Card className="rounded-3" key={index}>
            <Image
              className="rounded-3"
              alt="image"
              src="/js.png"
              width="1000"
              height="600"
            ></Image>
            <h4>{element.data.categoryName}</h4>
            <p>{element.data.categoryDescription}</p>

            <button className="btn btn-md btn-outline-primary" id="Button">
              {element.data.status==1? "Finished": "Drafted"}
            </button>
          </Card>
        ))}
      </Wrapper>
    </Container>
  );
}
{/* <Card className="rounded-3">
            <Image
              className="rounded-3"
              src="/js.png"
              width="1000"
              height="600"
            ></Image>
            <h4>{element.status}</h4>
            <p>{element.statusMsg}</p>
            <button className="btn btn-md btn-outline-primary" id="Button">
              Finished
            </button>
          </Card> */}