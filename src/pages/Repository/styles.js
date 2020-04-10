import styled from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    color: #7159c1;
    font-size: 16px;
    text-decoration: none;
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const IssueList = styled.ul`
  padding-top: 5px;
  margin-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;

  .filter {
    padding-bottom: 5px;
    display: flex;
    justify-content: flex-end;

    button {
      margin-left: 5px;
      border-radius: 40px;
      background: none;
      border: 3px solid #7159c1;
      padding: 3px 5px;
      color: #7159c1;
      transition: 0.2s;
    }

    button:hover:not(#selected) {
      background: #7159c1;
      color: #fff;
      opacity: 0.5;
    }

    #selected {
      color: #fff;
      background: #7159c1;
    }
  }

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #eee;
    }

    div {
      flex: 1;
      margin-left: 15px;

      strong {
        font-size: 16px;

        a {
          text-decoration: none;
          color: #333;

          &:hover {
            color: #7159c1;
          }
        }

        span {
          background: #eee;
          color: #333;
          border-radius: 2px;
          font-size: 12px;
          font-weight: 600;
          height: 20px;
          padding: 3px 4px;
          margin-left: 10px;
        }
      }

      p {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
      }
    }
  }
`;

export const Pagination = styled.div.attrs((props) => ({
  type: props.className,
  disabled: props.disabled,
}))`
  margin-top: 5px;

  button {
    background: none;
    border: 2px solid #7159c1;
    height: 18px;
    transition: 0.2s;

    &:disabled {
      opacity: 0.5;
      cursor: auto;
    }

    svg {
      padding: 0;
      margin: 0;
      color: #7159c1;
    }
  }

  button:hover:not(.type) {
    &:not(:disabled) {
      background: #7159c1;

      svg {
        color: #fff;
      }
    }
  }

  span {
    padding: 0 10px;
  }
`;
