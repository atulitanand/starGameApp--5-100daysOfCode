// STAR MATCH - Starting Template

const StarsDisplay = (props) => {
  return (
    <>
      {utils.range(1, props.count).map((starId) => (
        <div key={starId} className="star" />
      ))}
    </>
  );
};

const PlayNumber = (props) => {
  return (
    <button
      className="number"
      style={{ background: colors[props.status] }}
      onClick={() => console.log(props.number)}
    >
      {props.number}
    </button>
  );
};

const StarMatch = () => {
  /*
  The thing that we need to honor her is how we used state variables ,mocked their intial values and used it to change out UI discription
  */

  const [stars, setStars] = useState(utils.random(1, 9));
  // here i'm using mock values because were building UI logic first
  const [candidateNumber, setCandidateNum] = useState([2, 3]); //numbers that we select in order to find the sum like 2+3+1 = 6 so 2, 3, 1 are candidate
  const [availableNumber, setAvailableNum] = useState([1, 2, 3, 4, 5]); // numbers that are available
  /*
  now 6 = 3 + 3
          4 + 2
          3 + 2 + 1
          5 + 1
          out of them how many are still not selected 
  */
  const candidatesAreWrong = utils.sum(candidateNumber) > stars;

  const numberStatus = (number) => {
    if (!availableNumber.includes(number)) {
      return "used";
    }
    if (candidateNumber.includes(number)) {
      return candidatesAreWrong ? "wrong" : "candidate";
    }
    return "available";
  };

  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className="body">
        <div className="left">
          <StarsDisplay count={stars} />
        </div>
        <div className="right">
          {utils.range(1, 9).map((number) => (
            <PlayNumber
              key={number}
              number={number}
              status={numberStatus(number)}
            />
          ))}
        </div>
      </div>
      <div className="timer">Time Remaining: 10</div>
    </div>
  );
};

// Color Theme
const colors = {
  available: "lightgray",
  used: "lightgreen",
  wrong: "lightcoral",
  candidate: "deepskyblue",
};

// Math science
const utils = {
  // Sum an array
  sum: (arr) => arr.reduce((acc, curr) => acc + curr, 0),

  // create an array of numbers between min and max (edges included)
  range: (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i),

  // pick a random number between min and max (edges included)
  random: (min, max) => min + Math.floor(Math.random() * (max - min + 1)),

  // Given an array of numbers and a max...
  // Pick a random sum (< max) from the set of all available sums in arr
  randomSumIn: (arr, max) => {
    const sets = [[]];
    const sums = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0, len = sets.length; j < len; j++) {
        const candidateSet = sets[j].concat(arr[i]);
        const candidateSum = utils.sum(candidateSet);
        if (candidateSum <= max) {
          sets.push(candidateSet);
          sums.push(candidateSum);
        }
      }
    }
    return sums[utils.random(0, sums.length - 1)];
  },
};

ReactDOM.render(<StarMatch />, mountNode);
