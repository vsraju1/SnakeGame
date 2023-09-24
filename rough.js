let numbers = [];

for(let i=3; i<100; i++){
    if (i % 3 == 0){
        numbers.push(i);
    }
}

console.log(numbers)

for (let index = 0; index < numbers.length; index++) {
    const element = numbers[index];
    console.log(element)
    
}

