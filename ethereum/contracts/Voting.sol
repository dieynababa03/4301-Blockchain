// SPDX-License-Identifier: MIT
pragma solidity ^0.5.16;
pragma experimental ABIEncoderV2;

contract Voting {
    struct Candidate {
        uint id;
        string name;
        string party;
        uint voteCount;
    }

    mapping(uint => Candidate) public candidates;
    mapping(bytes32 => bool) private hasVoted; // Store hashed DL IDs
    uint public countCandidates = 0;
    uint256 public constant votingStart = 1709520000; 
    uint256 public constant votingEnd = 1735689600; 
    address public owner;
    address private centralVotingAccount; // The centralized account for enacting blockchain methods

    event CandidateAdded(uint candidateID, string name, string party);
    event Voted(uint candidateID, uint voteCount);
    event CandidateDeleted(uint candidateID, string name);

    constructor(address _centralAccount) public {
        owner = msg.sender;
        centralVotingAccount = _centralAccount;
        // Preload some candidates
        addCandidate("Alice Johnson", "Libertarian");
        addCandidate("Bob Smith", "Republican");
        addCandidate("Charlie Brown", "Democratic");
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    function getAllCandidates() public view returns (uint[] memory, string[] memory, string[] memory, uint[] memory) {
        uint[] memory ids = new uint[](countCandidates);
        string[] memory names = new string[](countCandidates);
        string[] memory parties = new string[](countCandidates);
        uint[] memory voteCounts = new uint[](countCandidates);

        for (uint i = 1; i <= countCandidates; i++) {
            Candidate storage candidate = candidates[i];
            ids[i - 1] = candidate.id;
            names[i - 1] = candidate.name;
            parties[i - 1] = candidate.party;
            voteCounts[i - 1] = candidate.voteCount;
        }

        return (ids, names, parties, voteCounts);
    }

    function addCandidate(string memory name, string memory party) public returns(uint) {
        countCandidates++;
        candidates[countCandidates] = Candidate(countCandidates, name, party, 0);
        emit CandidateAdded(countCandidates, name, party);
        return countCandidates;
    }

    function vote(uint candidateID, bytes32 hashedDLID) public {
        require(msg.sender == centralVotingAccount, "Unauthorized account");
        require(now >= votingStart && now <= votingEnd, "Voting is not active");
        require(candidateID > 0 && candidateID <= countCandidates, "Invalid candidate ID");
        require(!hasVoted[hashedDLID], "You have already voted");

        hasVoted[hashedDLID] = true;
        candidates[candidateID].voteCount++;
        emit Voted(candidateID, candidates[candidateID].voteCount);
    }

    function getCandidate(uint candidateID) public view returns (uint, string memory, string memory, uint) {
        require(candidateID > 0 && candidateID <= countCandidates, "Invalid candidate ID");
        Candidate memory candidate = candidates[candidateID];
        return (candidate.id, candidate.name, candidate.party, candidate.voteCount);
    }

    function getVotingDates() public pure returns (uint256, uint256) {
        return (votingStart, votingEnd);
    }

    function checkVoterStatus(bytes32 hashedDLID) public view returns (bool) {
        return hasVoted[hashedDLID];
    }

    function deleteCandidate(uint candidateID) public onlyOwner {
        require(candidateID > 0 && candidateID <= countCandidates, "Invalid candidate ID");
        delete candidates[candidateID];
        emit CandidateDeleted(candidateID, candidates[candidateID].name);
    }
}
