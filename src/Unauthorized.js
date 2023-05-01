import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Button } from "./styles/Button";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {

  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <Wrapper>
      <div className="container">
        <div>
          <h2>403</h2>
          <h3>Access Denied</h3>
          <p>
            Sorry, you don't have access to this page!
          </p>

          <Button onClick={goBack}>Go Back</Button>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .container {
    padding: 9rem ;
    text-align: center;
    margin-bottom: 15rem;

    h2 {
      font-size: 10rem;
    }

    h3 {
      font-size: 4.2rem;
    }

    p {
      margin: 2rem 0;
    }
  }
`;

export default Unauthorized