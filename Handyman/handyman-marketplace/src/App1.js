import React, { useState, useEffect } from 'react';
import web3 from './web3';
import contract from './contract';

function App() {
  const [account, setAccount] = useState('');
  const [description, setDescription] = useState('');
  const [reward, setReward] = useState('');
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function load() {
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
      fetchJobs();
    }
    load();
  }, []);

  const postJob = async () => {
    await contract.methods.postJob(description, web3.utils.toWei(reward, 'ether')).send({ from: account });
    fetchJobs();
  };

  const takeJob = async (id) => {
    await contract.methods.takeJob(id).send({ from: account });
    fetchJobs();
  };

  const completeJob = async (id) => {
    await contract.methods.completeJob(id).send({ from: account });
    fetchJobs();
  };

  const fetchJobs = async () => {
    const nextJobId = await contract.methods.nextJobId().call();
    const jobsArray = [];
    for (let i = 0; i < nextJobId; i++) {
      const job = await contract.methods.jobs(i).call();
      jobsArray.push(job);
    }
    setJobs(jobsArray);
  };

  return (
    <div>
      <h1>Handyman Marketplace</h1>
      <div>
        <h2>Post a Job</h2>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Job Description"
        />
        <input
          value={reward}
          onChange={(e) => setReward(e.target.value)}
          placeholder="Reward (ETH)"
        />
        <button onClick={postJob}>Post Job</button>
      </div>
      <div>
        <h2>Available Jobs</h2>
        {jobs.map((job, index) => (
          <div key={index}>
            <p>Job ID: {job.id}</p>
            <p>Description: {job.description}</p>
            <p>Reward: {web3.utils.fromWei(job.reward, 'ether')} ETH</p>
            <p>Customer: {job.customer}</p>
            <p>Contractor: {job.contractor || 'None'}</p>
            <p>Completed: {job.completed ? 'Yes' : 'No'}</p>
            {!job.contractor && <button onClick={() => takeJob(job.id)}>Take Job</button>}
            {job.contractor === account && !job.completed && <button onClick={() => completeJob(job.id)}>Complete Job</button>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App1;
