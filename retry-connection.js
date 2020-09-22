function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time * 1000));
}

function getJSON() {
    return new Promise((resolve, reject) => setTimeout(() => {reject("reject")}, 500));
}

async function tryNTimes(fn, times = 5, interval = 2) {
    if (times < 1) throw new Error(`Bad argument: 'times' must be greater than 0, but ${times} was received.`);
    let attemptCount = 0
    try{
        while (true) {
            try {
                const result = await fn();
                // console.log("there is no error")
                // console.log(result)
                return result;
                
            } catch(error) {
                if (++attemptCount >= times) throw new Error("attempted too many times");
                if(error){
                    console.log(error)
                }
            }
            await delay(interval)
        }
    }catch(error){
        // console.log("catch outer error")
        console.log(error)
    }
 
}


tryNTimes(getJSON, times = 5, interval = 2)



// TODO

// get timeout in the function 