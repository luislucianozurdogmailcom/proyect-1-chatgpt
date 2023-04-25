import React, { useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeModel } from '../Reducers/modelSelected';
import { changeCount } from '../Reducers/countAnswer';
import styled from 'styled-components';
import Dropdown from './Dropdown';

const Header = () => {
    const [bool_viewList, setViewList] = useState(false);
    const int_countAnswer = useSelector((state) => state.countAnswer.int_countAnswer);
    const str_model = useSelector((state) => state.modelSelected.str_model);
    const dispatch = useDispatch();

    const handleClick = (event) => {
        dispatch(changeModel(event.target.value));
        setViewList(!bool_viewList);
        dispatch(changeCount(0));
        console.log(int_countAnswer);
    };

    return (
        <Fragment>
            <HeaderWrapper>
                <HeaderLeft>
                    <Title>Messages</Title>
                    <Subtitle>1.520 messages</Subtitle>
                </HeaderLeft>
                <HeaderRight>
                    <Dropdown />
                </HeaderRight>
            </HeaderWrapper>
        </Fragment>
    );
};


export default Header;



const HeaderLeft = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
`;

const Title = styled.span`
    font-size: 2rem;
    font-weight: 300;
    @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const Subtitle = styled.span`
    font-size: 1.25rem;
    font-weight: 300;
    color: #718096;
    @media (max-width: 768px) {
    font-size: 0.8rem;
    }
`;

const HeaderRight = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
`;

const HeaderWrapper = styled.div`
    width: 100%;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid #e2e8f0;
    padding: 1rem 5rem;
    @media (max-width: 864px) {
    padding: 1rem;
    }
`;
