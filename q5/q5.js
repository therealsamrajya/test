
//Approach 1 : using merge sort algorithm which has lower time complexty than that of brute force

function countSmaller(nums) {
    const n = nums.length;
    const counts = new Array(n).fill(0);
    const indices = Array.from({ length: n }, (_, i) => i);

    function mergeSort(left, right) {
        if (left >= right) return;

        const mid = Math.floor((left + right) / 2);
        mergeSort(left, mid);
        mergeSort(mid + 1, right);
        merge(left, right, mid);
    }

    function merge(left, right, mid) {
        const temp = [];
        let i = left;
        let j = mid + 1;
        let rightCount = 0;

        while (i <= mid && j <= right) {
            if (nums[indices[i]] <= nums[indices[j]]) {
                counts[indices[i]] += rightCount;
                temp.push(indices[i]);
                i++;
            } else {
                rightCount++;
                temp.push(indices[j]);
                j++;
            }
        }

        while (i <= mid) {
            counts[indices[i]] += rightCount;
            temp.push(indices[i]);
            i++;
        }

        while (j <= right) {
            temp.push(indices[j]);
            j++;
        }

        for (let k = left; k <= right; k++) {
            indices[k] = temp[k - left];
        }
    }

    mergeSort(0, n - 1);
    return counts;
}

// Example usage:
const nums = [5, 2, 6, 1];
console.log(countSmaller(nums)); 


//Approach 2 :simple brute force approach time complexity is more for large numbers of array

const countRightSmallerNums = (nums) => {
    let length = nums.length;
    let ans = new Array(length).fill(0);
  
    for (let i = 0; i < length; i++)
      for (let j = i + 1; j < length; j++) if (nums[i] > nums[j]) ans[i]++;
    return ans;
  };
  
  let arr = [1,2,3,4,5];
  console.log(countRightSmallerNums(arr));
  
  Output: [1, 2, 3, 0, 2, 0, 0, 0]
