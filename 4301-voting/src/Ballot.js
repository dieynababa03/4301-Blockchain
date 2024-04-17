import React from "react";
import "./Ballot.css";

export const Ballot = () => {
    return (
        <div className="voting-page">
            <div className="div">
                <div className="overlap">
                    <div className="glass-effect" />
                    <div className="candidates">
                        <div className="candidate">
                            <img className="headshot" alt="Headshot" src="RobertFKennedy.jpeg" />
                            <div className="name">Robert Kennedy (I)</div>
                            <div className="ellipse" />
                        </div>
                        <div className="overlap-group-wrapper">
                            <div className="overlap-group">
                                <img className="img" alt="Headshot" src="Trump.jpeg" />
                                <div className="text-wrapper">Donald Trump (R)</div>
                                <div className="selector">
                                    <div className="selected" />
                                </div>
                            </div>
                        </div>
                        <div className="candidate-2">
                            <img className="headshot" alt="Headshot" src="Biden.jpeg" />
                            <div className="name-2">Joe Biden (D)</div>
                            <div className="selector-2" />
                        </div>
                    </div>
                </div>
                <div className="submit-vote-button">
                    <div className="div-wrapper">
                        <div className="text-wrapper-2">Submit Vote</div>
                    </div>
                </div>
                <div className="election-header">
                    <p className="p">Voting Dates MM/DD/YYYY - MM/DD/YYYY</p>
                    <div className="text-wrapper-3">Presidential Election</div>
                </div>
            </div>
        </div>
    );
};

export default Ballot;

