let n;
let r;

function makelist(n) {
    let list = [];
    for(let k = 1; k <= n; k++) {
        list.push(k);
    }
    return list;
}

function combination(items, idx, k, list, result){
    if(items.length === k){
        result.push(items);
        return;
    }
    for (let i = idx; i < list.length; i++){
        combination([...items, list[i]], i+1, k, list, result)
    }
}

function calculateCombinationsCount(n, r) {
    function factorial(num) {
        if (num === 0 || num === 1) {
            return 1;
        }
        let result = 1;
        for (let i = 2; i <= num; i++) {
            result *= i;
        }
        return result;
    }
    const combinationsCount = factorial(n) / (factorial(r) * factorial(n - r));
    return combinationsCount;
}

function handleSubmit(event){
    event.preventDefault();
    
    const inputValue_n = document.getElementById('n').value
    const inputValue_r = document.getElementById('r').value

    n = Number(inputValue_n)
    r = Number(inputValue_r)

    const list = makelist(n)
    const result = [];

    // calculateCombinationsCount 함수 호출 및 결과 저장
    const combinationsCount = calculateCombinationsCount(n, r);

    combination([], 0, r, list, result)
    
    // displayResult 함수에 결과 및 경우의 수 전달
    displayResult(result, combinationsCount);
}


function displayResult(result, combinationsCount) {
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = ''; // 이전 결과를 지움
    if (result.length === 0) {
        alert('그게 되겠습니까?');
        return;
    }
    const countElement = document.createElement('p');
    countElement.textContent = `총 ${combinationsCount}개의 경우의 수가 있습니다.`;
    resultElement.appendChild(countElement);

    const ul = document.createElement('ul');
    result.forEach(comb => {
        const li = document.createElement('li');
        li.textContent = comb.join(', ');
        ul.appendChild(li);
    });
    resultElement.appendChild(ul);
}
