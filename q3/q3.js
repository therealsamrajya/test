//approach 1 :converting to set

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

// time complexity o(n)
// space complexity o(n)



//approach 2 :brute force

const longestConsecutiveChain = (nums) => {
    if (nums.length <= 1) return nums.length;
  
    let longestChain = 1;
    let currChain = 1;
  
    for (let i = 1; i < nums.length; i++) {
      if (nums[i] - nums[i - 1] === 1) {
        currChain++;
        longestChain = Math.max(longestChain, currChain);
      } else {
        currChain = 1;
      }
    }
  
    return longestChain;
  };
  
  console.log(longestConsecutiveChain([1, 2, 3, 3, 4, 5, 6, 9, 4, 2]));

  
  //time complexity : o(n) if array is sorted else o(nlogn)
  //space complexity o(1) if array is sorted else o(n)