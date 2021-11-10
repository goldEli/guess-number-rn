import { useEffect, useState } from "react";
import { getDoubleColorRandomNumbers, getRandomNumbers } from "../utils";

const useRandomNumbers = (type: "lottery" | "doubleColor") => {
	const [randomNumbers, setRandomNumbers] = useState([]);

	useEffect(() => {
		if (type === "lottery") {
			setRandomNumbers(getRandomNumbers());
		} 
		if (type === "doubleColor") {
			setRandomNumbers(getDoubleColorRandomNumbers());
		}
	}, [type]);

	return {
		randomNumbers,
		setRandomNumbers
	};
};

export default useRandomNumbers;