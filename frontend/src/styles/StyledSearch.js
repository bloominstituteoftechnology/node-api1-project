import styled from "styled-components";

export const StyledSearch = styled.div`
margin-top : 3rem;
width : 20vw;
display : flex;
flex-direction : row-reverse;
justify-content : space-around;
input {
    border : none;
    background-color : transparent;
    border : 1px solid gray;
    padding : .2rem;
    padding-left : .3rem;
    color : black;
}
input:focus {
    outline : none;

}
button {
    border : 1px solid gray;
    background-color : white;
    transition : .1s ease-in-out;
}
button:active {
    transform : scale(105%);
}
#closed {
    position : absolute;
    right : 1rem;
    top : 1px;
    cursor: pointer;
}
#alert {
    position : absolute;
    right : 1rem;
    top : 0;
    padding: 2rem;
}
`