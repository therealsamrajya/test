function longestConsecutiveChain(arr) {
 
    const numSet = new Set(arr);
    let longestChain = 0;

    for (let num of arr) {
       
        if (!numSet.has(num - 1)) {
            let currentNum = num;
            let currentChain = 1;
            while (numSet.has(currentNum + 1)) {
                currentNum++;
                currentChain++;
            }
            longestChain = Math.max(longestChain, currentChain);
           
            
        }
    }
   
    return longestChain;
}

console.log(longestConsecutiveChain([100,1,2,3,4]));
