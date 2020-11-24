import styled from "styled-components";

const Wrapper = styled.div`
  font-family: ${(props) => props.theme.fontFamily.sf};
  display: flex;
  align-items: center;
  width: 100%;
  flex-direction: column;
  margin-top: 40px;
  font-size: ${(props) => props.theme.fontSizes.content};
  color: ${(props) => props.theme.colors.textColor};
  line-height: 25px;
  p {
    color: ${(props) => props.theme.colors.white};
    font-size: ${(props) => props.theme.fontSizes.content};
    margin: 5px 0;
    &.description {
      margin-bottom: 30px;
    }
  }
  .title {
    font-size: ${(props) => props.theme.fontSizes.small};
    color: ${(props) => props.theme.colors.gray};
    &:after {
      content: ":";
    }
  }
  i {
    margin: 0 10px;
  }
  .displayInline {
    p {
      display: inline;
      margin-right: 5px;
      &:after {
        content: ",";
      }
    }
  }
  h2.buyTicket {
    margin: 100px 0 45px 0;
  }

  .cinema-name {
    font-size: 1.45rem;
    color: #9c9c9c;
  }

  .showings-list {
    list-style: none;
    display: flex;
    align-items: center;
    padding: 0;
    justify-content: space-between;
    li {
      border-bottom: 1px solid #929292;
      width: 100%;
      display: flex;
      padding: 10px 20px;
      &:hover {
        background-color: rgb(53 53 53 / 80%);
      }
      a {
        text-decoration: none;
        display: flex;
        width: 100%;
        justify-content: space-between;
        .time-slot {
          flex: 1;
        }
        .room-name {
        }
        .movie-subtitle {
          color: #888;
        }
      }
    }
  }
  .buy-ticket p {
    color: ${(props) => props.theme.colors.red};
  }
`;

export { Wrapper as default };
