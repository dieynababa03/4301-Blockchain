// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Voting {
    struct Candidate {
        uint id;
        string name;
        string party;
        uint voteCount; // Kept internally but not shown publicly
    }

    mapping(uint => Candidate) private candidates; // Changed to private
    mapping(address => bool) public voters;
    uint public countCandidates;
    uint256 public votingEnd;
    uint256 public votingStart;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    function addCandidate(string memory name, string memory party) public onlyOwner returns(uint) {
        countCandidates++;
        candidates[countCandidates] = Candidate(countCandidates, name, party, 0);
        return countCandidates;
    }

    function vote(uint candidateID) public {
        // Prevent the owner from voting
        require(msg.sender != owner, "Owner is not allowed to vote");

        // Only enforce time checks if dates are set (i.e., non-zero)
        if (votingStart != 0 && votingEnd != 0) {
            require(block.timestamp >= votingStart && block.timestamp <= votingEnd, "Voting is not active");
        }
        require(candidateID > 0 && candidateID <= countCandidates, "Invalid candidate ID");
        require(!voters[msg.sender], "You have already voted");

        voters[msg.sender] = true;
        candidates[candidateID].voteCount++;
    }

    function setDates(uint256 _startDate, uint256 _endDate) public onlyOwner {
        require(votingEnd == 0 && votingStart == 0, "Dates already set");
        require(_startDate >= block.timestamp && _endDate > _startDate, "Invalid date settings");

        votingStart = _startDate;
        votingEnd = _endDate;
    }

    function checkVote() public view returns(bool) {
        return voters[msg.sender];
    }

    function getCandidate(uint candidateID) public view returns (uint, string memory, string memory) {
        require(candidateID > 0 && candidateID <= countCandidates, "Invalid candidate ID");
        Candidate memory candidate = candidates[candidateID];
        return (candidate.id, candidate.name, candidate.party);
    }

    function getDates() public view returns (uint256, uint256) {
        return (votingStart, votingEnd);
    }

    function getLeadingCandidate() public view onlyOwner returns (uint, string memory, string memory, uint, uint) {
        uint maxVoteCount = 0;
        uint leadingCandidateId = 0;
        uint totalVotes = 0;

        for (uint i = 1; i <= countCandidates; i++) {
            totalVotes += candidates[i].voteCount;
            if (candidates[i].voteCount > maxVoteCount) {
                maxVoteCount = candidates[i].voteCount;
                leadingCandidateId = i;
            }
        }

        require(leadingCandidateId != 0, "No votes cast yet");
        uint votePercentage = 0;
        if (totalVotes > 0) {
            votePercentage = (maxVoteCount * 100) / totalVotes;  // Percentage of total votes
        }

        Candidate memory leadingCandidate = candidates[leadingCandidateId];
        return (leadingCandidate.id, leadingCandidate.name, leadingCandidate.party, leadingCandidate.voteCount, votePercentage);
    }
}