import React, { useState, useEffect } from 'react';
import "./css/Ballot.css";
import joe from './img/joe.png';
import rk from './img/rk.jpeg';
import trump from './img/trump.jpeg';
export const Ballot = () => {
    const [selectedOption, setSelectedOption] = useState('');
    const handleClick = (e) => {
        setSelectedOption(e.target.id);
    }

    return (
        <div className="page-container">
            <div className="content-container">
                <div className="title">
                    <h1>
                        Presidential Election
                    </h1>
                    <h3>
                        Voting Dates MM/DD/YYYY - MM/DD/YYYY
                    </h3>
                </div>
                <div className="candidate-container">
                    <div id="box1" className="box">
                        <input id="c1" type="radio" name="candidate"/>
                        <img className="joe" src={joe}/>
                        <h3>Joe Biden (D)</h3>
                        <p>Count: 0</p>
                    </div>
                    <div id="box2" className="box">
                        <input id="c2" type="radio" name="candidate"/>
                        <img className="trump" src={trump}/>
                        <h3>Donald Trump (R)</h3>
                        <p>Count: 1</p>
                    </div>
                    <div id="box3" className="box">
                        <input id="c3" type="radio" name="candidate"/>
                        <img className="rk" src={rk}/>
                        <h3>Robert Kennedy (I)</h3>
                        <p>Count: 0</p>
                    </div>
                </div>
                <div className="submit">
                    <button>Submit Vote</button>
                </div>
            </div>
        </div>
    );
};

export default Ballot;

