const Voting = artifacts.require("Voting");

contract("Voting", accounts => {
    let voting;
    const owner = accounts[0];
    const centralVotingAccount = accounts[1];
    
    before(async () => {
        voting = await Voting.new(centralVotingAccount, { from: owner });
    });

    it("should add a candidate by the owner", async () => {
        const result = await voting.addCandidate("Alice", "Liberal", { from: owner });
        assert.equal(result.logs[0].args.candidateID.toNumber(), 1, "Candidate ID should be 1");
        assert.equal(result.logs[0].args.name, "Alice", "Candidate name should be Alice");
        assert.equal(result.logs[0].args.party, "Liberal", "Candidate party should be Liberal");
    });

    it("should allow voting by central account during voting period", async () => {
        const now = Math.floor(Date.now() / 1000);
        // No need to set dates since they are constants, ensure your tests run within the set date range
        const hashedDLID = web3.utils.sha3('DL12345');
        await voting.vote(1, hashedDLID, { from: centralVotingAccount });

        const candidate = await voting.getCandidate(1);
        assert.equal(candidate[3].toNumber(), 1, "Vote count should be 1");
    });

    it("should prevent double voting with the same DL ID", async () => {
        const hashedDLID = web3.utils.sha3('DL12345');
        try {
            await voting.vote(1, hashedDLID, { from: centralVotingAccount });
            assert.fail("Expected an exception but did not get one");
        } catch (error) {
            assert.include(error.message, "You have already voted", "Should throw 'You have already voted' error");
        }
    });

    it("should retrieve voting dates", async () => {
        const dates = await voting.getVotingDates();
        assert(dates.start.toNumber() === 1717622400, "Start date should match the constant");
        assert(dates.end.toNumber() === 1735689600, "End date should match the constant");
    });
});
